/**
 * @description Parse OpenAI-compatible `chat/completions` streaming (SSE) bodies
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

import { Buffer } from 'node:buffer'
import { Readable } from 'node:stream'
import type { ReadableStream as WebReadableStream } from 'node:stream/web'

/**
 * HTTP OK but no user-visible completion text (e.g. thinking-only stream).
 */
export class EmptyAICompletionError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'EmptyAICompletionError'
    }
}

interface CompletionParseMeta {
    sawReasoning: boolean
    finishReasons: string[]
}

/**
 * Normalize `fetch` response body to a Node.js readable stream.
 */
export function bodyToNodeReadable(body: unknown): NodeJS.ReadableStream {
    if (body == null)
        throw new Error('Response has no body')
    if (typeof (body as WebReadableStream).getReader === 'function')
        return Readable.fromWeb(body as WebReadableStream)
    return body as NodeJS.ReadableStream
}

/**
 * Append only user-visible completion tokens from `delta.content`.
 * Skips reasoning / `reasoning_content` (not present on `content` in typical deltas).
 */
export function appendVisibleDelta(acc: string, delta: { content?: unknown } | undefined): string {
    if (!delta)
        return acc
    const c = delta.content
    if (c == null)
        return acc
    if (typeof c === 'string')
        return acc + c
    if (Array.isArray(c)) {
        let s = acc
        for (const p of c) {
            if (p && typeof p === 'object' && (p as { type?: string, text?: string }).type === 'text') {
                const t = (p as { text?: string }).text
                if (typeof t === 'string')
                    s += t
            }
        }
        return s
    }
    return acc
}

function hasReasoningText(value: unknown): boolean {
    if (typeof value === 'string')
        return value.length > 0
    return false
}

function deltaHasReasoning(delta: { reasoning_content?: unknown, reasoning?: unknown } | undefined): boolean {
    if (!delta)
        return false
    return hasReasoningText(delta.reasoning_content) || hasReasoningText(delta.reasoning)
}

interface StreamChoiceChunk {
    index?: number
    finish_reason?: string | null
    delta?: { content?: unknown, reasoning_content?: unknown, reasoning?: unknown }
}

interface NonStreamChoice {
    index?: number
    finish_reason?: string | null
    message?: { content?: unknown, reasoning_content?: unknown, reasoning?: unknown }
}

async function readableToUtf8String(stream: NodeJS.ReadableStream): Promise<string> {
    const chunks: Buffer[] = []
    for await (const chunk of stream as AsyncIterable<string | Buffer>) {
        if (Buffer.isBuffer(chunk))
            chunks.push(chunk)
        else if (typeof chunk === 'string')
            chunks.push(Buffer.from(chunk))
        else
            chunks.push(Buffer.from(String(chunk)))
    }
    return Buffer.concat(chunks as readonly Uint8Array[]).toString('utf8')
}

function buildEmptyCompletionMessage(meta: CompletionParseMeta): string {
    const finish = meta.finishReasons.find(Boolean)
    const tips = ['AI returned an empty completion.']

    if (meta.sawReasoning) {
        tips.push(
            'Only reasoning was received; no final content.',
            'Retry or try a non-thinking model.',
        )
    }
    else {
        tips.push(
            'Retry or try another model.',
        )
    }

    if (finish) {
        tips.push(`finish_reason=${finish}.`)
    }

    return tips.join(' ')
}

/**
 * Drop blank subjects; throw when none remain so CLI never confirms an empty message.
 */
export function ensureVisibleSubjects(subjects: string[], meta: CompletionParseMeta = { sawReasoning: false, finishReasons: [] }): string[] {
    const visible = subjects.filter(s => s.trim().length > 0)
    if (visible.length > 0)
        return visible
    throw new EmptyAICompletionError(buildEmptyCompletionMessage(meta))
}

/**
 * Parse a non-streaming `chat/completions` JSON body when `stream: true` was ignored.
 * @returns subjects + meta, or `undefined` if the body is not a usable completion object.
 */
function trySubjectsFromNonStreamCompletionJson(
    body: string,
    choiceCount: number,
): { buffers: string[], meta: CompletionParseMeta } | undefined {
    const t = body.trim()
    if (!t.startsWith('{'))
        return undefined
    let json: unknown
    try {
        json = JSON.parse(t)
    }
    catch {
        return undefined
    }
    if (!json || typeof json !== 'object')
        return undefined
    const o = json as { choices?: NonStreamChoice[], error?: { message?: string } }
    if (o.error)
        throw new Error(o.error.message || 'OpenAI API error')
    if (!Array.isArray(o.choices))
        return undefined

    const buffers = Array.from({ length: choiceCount }, () => '')
    const meta: CompletionParseMeta = { sawReasoning: false, finishReasons: [] }
    let maxIndexSeen = -1
    for (const ch of o.choices) {
        const idx = typeof ch.index === 'number' ? ch.index : 0
        if (idx >= 0 && idx < choiceCount) {
            buffers[idx] = appendVisibleDelta('', { content: ch.message?.content })
            if (deltaHasReasoning(ch.message))
                meta.sawReasoning = true
            if (typeof ch.finish_reason === 'string' && ch.finish_reason)
                meta.finishReasons.push(ch.finish_reason)
            maxIndexSeen = Math.max(maxIndexSeen, idx)
        }
    }
    if (maxIndexSeen < 0)
        return undefined
    return { buffers: buffers.slice(0, maxIndexSeen + 1), meta }
}

function collectSubjectsFromSseLines(
    body: string,
    choiceCount: number,
): { buffers: string[], maxIndexSeen: number, meta: CompletionParseMeta } {
    const buffers = Array.from({ length: choiceCount }, () => '')
    const meta: CompletionParseMeta = { sawReasoning: false, finishReasons: [] }
    let maxIndexSeen = -1
    for (const line of body.split(/\r?\n/)) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:'))
            continue
        const payload = trimmed.slice(5).trim()
        if (payload === '[DONE]')
            continue
        try {
            const json = JSON.parse(payload) as {
                error?: { message?: string }
                choices?: StreamChoiceChunk[]
            }
            if (json.error)
                throw new Error(json.error.message || 'OpenAI stream error')

            for (const ch of json.choices ?? []) {
                const idx = typeof ch.index === 'number' ? ch.index : 0
                if (idx >= 0 && idx < choiceCount) {
                    if (deltaHasReasoning(ch.delta))
                        meta.sawReasoning = true
                    buffers[idx] = appendVisibleDelta(buffers[idx], ch.delta)
                    if (typeof ch.finish_reason === 'string' && ch.finish_reason)
                        meta.finishReasons.push(ch.finish_reason)
                    maxIndexSeen = Math.max(maxIndexSeen, idx)
                }
            }
        }
        catch (e) {
            if (e instanceof SyntaxError)
                continue
            throw e
        }
    }
    return { buffers, maxIndexSeen, meta }
}

/**
 * Read an OpenAI-style `chat/completions` response body and return one finished string per choice.
 * Primary path: SSE lines (`data: {...}`) with `choices[].delta`, bucketed by `choices[].index`
 * up to `choiceCount` (requested `n`). Returned length is `maxSeenIndex + 1` (capped by `choiceCount`),
 * mirroring non-stream `choices.length` when fewer parallel completions appear.
 * Fallback: if no choice index ever appears (e.g. provider ignores `stream: true` and returns one JSON object),
 * the full body is parsed as a non-streaming completion using `choices[].message.content`.
 *
 * Throws {@link EmptyAICompletionError} when the response is parseable but every choice has blank
 * visible content (common with thinking models that only emit `reasoning_content`).
 */
export async function readChatCompletionStreamToSubjects(
    input: NodeJS.ReadableStream,
    choiceCount: number,
): Promise<string[]> {
    if (choiceCount < 1)
        throw new Error('choiceCount must be at least 1')

    const body = await readableToUtf8String(input)
    const { buffers, maxIndexSeen, meta } = collectSubjectsFromSseLines(body, choiceCount)

    if (maxIndexSeen >= 0)
        return ensureVisibleSubjects(buffers.slice(0, maxIndexSeen + 1), meta)

    const fromJson = trySubjectsFromNonStreamCompletionJson(body, choiceCount)
    if (fromJson !== undefined)
        return ensureVisibleSubjects(fromJson.buffers, fromJson.meta)

    throw new Error(
        'Chat completions response had no streamed choice deltas and is not a parseable non-streaming JSON body with choices (or choices were empty).',
    )
}
