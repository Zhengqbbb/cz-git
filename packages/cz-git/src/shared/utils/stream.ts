/**
 * @description Parse OpenAI-compatible `chat/completions` streaming (SSE) bodies
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

import readline from 'node:readline'
import { Readable } from 'node:stream'
import type { ReadableStream as WebReadableStream } from 'node:stream/web'

/**
 * Normalize `fetch` response body to a Node.js readable stream for `readline`.
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

interface StreamChoiceChunk { index?: number, delta?: { content?: unknown } }

/**
 * Read an SSE stream and return one finished string per completion choice (`n` in the request).
 * Buckets by `choices[].index`. Ignores malformed lines; rethrows stream `error` payloads.
 */
export async function readChatCompletionStreamToSubjects(
    input: NodeJS.ReadableStream,
    choiceCount: number,
): Promise<string[]> {
    if (choiceCount < 1)
        throw new Error('choiceCount must be at least 1')

    const buffers = Array.from({ length: choiceCount }, () => '')
    const rl = readline.createInterface({ input, crlfDelay: Infinity })

    for await (const line of rl) {
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
                if (idx >= 0 && idx < choiceCount)
                    buffers[idx] = appendVisibleDelta(buffers[idx], ch.delta)
            }
        }
        catch (e) {
            if (e instanceof SyntaxError)
                continue
            throw e
        }
    }

    return buffers
}
