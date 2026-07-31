import { Readable } from 'node:stream'
import { describe, expect, it } from 'vitest'
import {
    EmptyAICompletionError,
    ensureVisibleSubjects,
    readChatCompletionStreamToSubjects,
} from '../src/shared/utils/stream'

function asStream(body: string): NodeJS.ReadableStream {
    return Readable.from([body])
}

describe('readChatCompletionStreamToSubjects', () => {
    it('parses non-stream JSON when no SSE choice deltas appear', async () => {
        const json = JSON.stringify({
            choices: [{ index: 0, message: { role: 'assistant', content: 'fix login redirect' } }],
        })
        const subjects = await readChatCompletionStreamToSubjects(asStream(json), 1)
        expect(subjects).toEqual(['fix login redirect'])
    })

    it('parses SSE data lines as before', async () => {
        const sse = [
            'data: {"choices":[{"index":0,"delta":{"content":"hello"}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{"content":" world"}}]}',
            '',
            'data: [DONE]',
            '',
        ].join('\n')
        const subjects = await readChatCompletionStreamToSubjects(asStream(sse), 1)
        expect(subjects).toEqual(['hello world'])
    })

    it('throws when body has neither SSE choices nor non-stream completion', async () => {
        await expect(readChatCompletionStreamToSubjects(asStream('not json'), 1)).rejects.toThrow(
            /no streamed choice deltas/,
        )
    })

    it('does not return a single empty subject when stream is empty', async () => {
        await expect(readChatCompletionStreamToSubjects(asStream(''), 1)).rejects.toThrow()
    })

    it('throws EmptyAICompletionError for DeepSeek-style reasoning-only SSE (conjecture #259)', async () => {
        // Simulates deepseek-v4-flash thinking stream: choices present, only reasoning_content, then finish.
        const sse = [
            'data: {"choices":[{"index":0,"delta":{"role":"assistant","reasoning_content":"Let me think about the diff..."}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{"reasoning_content":" The change adds a feature."}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{},"finish_reason":"length"}]}',
            '',
            'data: [DONE]',
            '',
        ].join('\n')

        await expect(readChatCompletionStreamToSubjects(asStream(sse), 1)).rejects.toSatisfy((err: unknown) => {
            expect(err).toBeInstanceOf(EmptyAICompletionError)
            expect((err as Error).message).toMatch(/empty completion/i)
            expect((err as Error).message).toMatch(/reasoning/i)
            expect((err as Error).message).toMatch(/finish_reason=length/)
            return true
        })
    })

    it('throws EmptyAICompletionError when SSE has blank content without reasoning', async () => {
        const sse = [
            'data: {"choices":[{"index":0,"delta":{"content":""}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}',
            '',
            'data: [DONE]',
            '',
        ].join('\n')

        await expect(readChatCompletionStreamToSubjects(asStream(sse), 1)).rejects.toSatisfy((err: unknown) => {
            expect(err).toBeInstanceOf(EmptyAICompletionError)
            expect((err as Error).message).toMatch(/empty completion/i)
            expect((err as Error).message).toMatch(/try another model/i)
            expect((err as Error).message).not.toMatch(/Only reasoning was received/)
            return true
        })
    })

    it('keeps content when reasoning and visible answer both appear', async () => {
        const sse = [
            'data: {"choices":[{"index":0,"delta":{"reasoning_content":"thinking..."}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{"content":"add login guard"}}]}',
            '',
            'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}',
            '',
            'data: [DONE]',
            '',
        ].join('\n')
        const subjects = await readChatCompletionStreamToSubjects(asStream(sse), 1)
        expect(subjects).toEqual(['add login guard'])
    })

    it('throws for non-stream JSON with reasoning_content but empty content', async () => {
        const json = JSON.stringify({
            choices: [{
                index: 0,
                finish_reason: 'length',
                message: {
                    role: 'assistant',
                    content: '',
                    reasoning_content: 'long chain of thought only',
                },
            }],
        })
        await expect(readChatCompletionStreamToSubjects(asStream(json), 1)).rejects.toBeInstanceOf(
            EmptyAICompletionError,
        )
    })

    it('filters blank choices when at least one subject is visible', async () => {
        const sse = [
            'data: {"choices":[{"index":0,"delta":{"content":""}}]}',
            'data: {"choices":[{"index":1,"delta":{"content":"keep this"}}]}',
            'data: {"choices":[{"index":0,"finish_reason":"stop"},{"index":1,"finish_reason":"stop"}]}',
            'data: [DONE]',
        ].join('\n')
        const subjects = await readChatCompletionStreamToSubjects(asStream(sse), 2)
        expect(subjects).toEqual(['keep this'])
    })
})

describe('ensureVisibleSubjects', () => {
    it('throws when all subjects are whitespace', () => {
        expect(() => ensureVisibleSubjects(['', '  '])).toThrow(EmptyAICompletionError)
    })
})
