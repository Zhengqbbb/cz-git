import { describe, expect, it } from 'vitest'
import { generateMessage } from '../src/generator'
import type { CommitizenGitOptions } from '../src/shared'

/**
 * @description generateMessage Test
 */
describe('generateMessage()', () => {
    const answers = {
        type: 'feat',
        scope: 'app',
        subject: 'add a new feature',
    }

    it('message with default option should be standard separator', () => {
        const options = {}
        expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature')
    })

    describe('scope', () => {
        it('hit single scope should be output scope', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                scopes: ['app'],
                allowCustomScopes: false,
                allowEmptyScopes: false,
            }
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature')
        })

        it('custom value scope should be output custom value', () => {
            const options = {}
            const answers = {
                type: 'feat',
                scope: '___CUSTOM___',
                customScope: 'app',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature')
        })

        it('empty custom scope value scope should be output empty value', () => {
            const options = {}
            const answers = {
                type: 'feat',
                scope: '___CUSTOM___',
                customScope: '',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual('feat: add a new feature')
        })
    })

    describe('subject', () => {
        it('subject with emoji options should be standard separator', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' }],
                useEmoji: true,
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): :sparkles: add a new feature')
        })

        it('subject with emoji options and types item not have emoji should be standard separator', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                useEmoji: true,
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature')
        })

        it('emojiAlign use center should be before subject header', () => {
            const options: CommitizenGitOptions = {
                types: [{ value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' }],
                useEmoji: true,
                emojiAlign: 'center',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): :sparkles: add a new feature')
        })

        it('emojiAlign use center should be before type header', () => {
            const options: CommitizenGitOptions = {
                types: [{ value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' }],
                useEmoji: true,
                emojiAlign: 'left',
            }
            expect(generateMessage(answers, options)).toEqual(':sparkles: feat(app): add a new feature')
        })

        it('emojiAlign use right should be after subject header', () => {
            const options: CommitizenGitOptions = {
                types: [{ value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' }],
                useEmoji: true,
                emojiAlign: 'right',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature :sparkles:')
        })
    })

    describe('body', () => {
        it('body breaking line should be with breaklineNumber', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                breaklineNumber: 20,
            }
            const answers = {
                type: 'feat',
                scope: 'app',
                subject: 'add a new feature',
                body: 'test breaklineNumber test breaklineNumber',
            }
            expect(generateMessage(answers, options)).toEqual(
                'feat(app): add a new feature\n\ntest breaklineNumber\ntest breaklineNumber',
            )
        })

        it('turn on markBreaking shoule be output ! mark after type', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
            }
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
                markBreaking: 'true',
            }
            expect(generateMessage(answers, options)).toEqual('feat!: add a new feature')
        })

        it('turn on markBreaking shoule be output ! mark follow scope', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                scopes: ['app'],
            }
            const answers = {
                type: 'feat',
                scope: 'app',
                subject: 'add a new feature',
                markBreaking: 'true',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app)!: add a new feature')
        })
    })

    describe('footer', () => {
        it('custom footerPrefix should be output custom value', () => {
            const options = {}
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
                footerPrefix: '___CUSTOM___',
                customFooterPrefix: 'CLOSED',
                footer: '#1',
            }
            expect(generateMessage(answers, options)).toEqual('feat: add a new feature\n\nCLOSED #1')
        })

        it('empty custom footerPrefix value scope should be output empty value', () => {
            const options = {}
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
                footerPrefix: '___CUSTOM___',
                customFooterPrefix: '',
                footer: '#1',
            }
            expect(generateMessage(answers, options)).toEqual('feat: add a new feature\n\n#1')
        })

        it('both hit single footerPrefix should be output right', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
                allowCustomIssuePrefix: false,
                allowEmptyIssuePrefix: false,
            }
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
                footer: '#12',
            }
            expect(generateMessage(answers, options)).toEqual('feat: add a new feature\n\nclosed #12')
        })

        it('both hit single footerPrefix but not footer should be not output', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
                allowCustomIssuePrefix: false,
                allowEmptyIssuePrefix: false,
            }
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual('feat: add a new feature')
        })

        it('both hit single scope and footerPrefix should be output right', () => {
            const options = {
                types: [{ value: 'feat', name: 'feat:     A new feature' }],
                scopes: ['app'],
                allowCustomScopes: false,
                allowEmptyScopes: false,
                issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
                allowCustomIssuePrefix: false,
                allowEmptyIssuePrefix: false,
            }
            const answers = {
                type: 'feat',
                subject: 'add a new feature',
                footer: '#12',
            }
            expect(generateMessage(answers, options)).toEqual('feat(app): add a new feature\n\nclosed #12')
        })
    })

    describe('message', () => {
        it('custom emoji message format callback should be output right', () => {
            const options: any = {
                types: [{ value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' }],
                useEmoji: true,
                formatMessageCB: ({ emoji, scope, subject }: any) => {
                    return scope
                        ? `${emoji}(${scope}): ${subject}`
                        : `${emoji} ${subject}`
                },
            }

            let answers: any = {
                type: 'feat',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual(':sparkles: add a new feature')

            answers = {
                type: 'feat',
                scope: 'app',
                subject: 'add a new feature',
            }
            expect(generateMessage(answers, options)).toEqual(':sparkles:(app): add a new feature')
        })
    })
})
