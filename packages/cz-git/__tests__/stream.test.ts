import { Readable } from 'node:stream'
import { describe, expect, it } from 'vitest'
import { readChatCompletionStreamToSubjects } from '../src/shared/utils/stream'

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
})
