import { describe, expect, it } from 'vitest'
import { useModelStrategy } from '../src/generator/api'
import type { CommitizenGitOptions } from '../src/shared'

function useOptions(apiExtraBody?: Record<string, unknown>): CommitizenGitOptions {
    return {
        aiModel: 'gpt-4o-mini',
        aiNumber: 1,
        apiEndpoint: 'https://api.openai.com/v1',
        apiExtraBody,
    }
}

/**
 * @description useModelStrategy Test
 */
describe('useModelStrategy()', () => {
    it('should build the default payload when apiExtraBody is not set', () => {
        const { payload, url } = useModelStrategy(useOptions(), 'diff')

        expect(url).toBe('https://api.openai.com/v1/chat/completions')
        expect(payload).toEqual({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: 'diff' }],
            stream: true,
            top_p: 1,
            temperature: 0.7,
            max_tokens: 4096,
            n: 1,
        })
    })

    it('should add a field which is not in the default payload', () => {
        const { payload } = useModelStrategy(
            useOptions({ reasoning_effort: 'low' }),
            'diff',
        )

        expect(payload.reasoning_effort).toBe('low')
        expect(payload.max_tokens).toBe(4096)
    })

    it('should override a field of the default payload', () => {
        const { payload } = useModelStrategy(
            useOptions({ temperature: 1, max_tokens: 200 }),
            'diff',
        )

        expect(payload.temperature).toBe(1)
        expect(payload.max_tokens).toBe(200)
    })

    it('should remove a field when the value is null', () => {
        const { payload } = useModelStrategy(
            useOptions({ temperature: null }),
            'diff',
        )

        expect('temperature' in payload).toBe(false)
    })

    it('should support models which require `max_completion_tokens`', () => {
        const { payload } = useModelStrategy(
            useOptions({
                max_tokens: null,
                temperature: null,
                max_completion_tokens: 4096,
            }),
            'diff',
        )

        // These models reject `max_tokens` and `temperature: 0.7` at any value,
        // so both have to be gone from the request body, not just overridden.
        expect('max_tokens' in payload).toBe(false)
        expect('temperature' in payload).toBe(false)
        expect(payload.max_completion_tokens).toBe(4096)
        expect(payload.stream).toBe(true)
        expect(payload.top_p).toBe(1)
    })

    it('should not mutate the apiExtraBody option', () => {
        const apiExtraBody = { max_tokens: null }
        useModelStrategy(useOptions(apiExtraBody), 'diff')

        expect(apiExtraBody).toEqual({ max_tokens: null })
    })
})
