import { afterEach, describe, expect, it } from 'vitest'
import type tmp from 'tmp'
import type { UserOptions } from '../src'
import { configLoader } from '../src'
import { useBootstrap } from './utils'

async function loaderSpyFn(opt: UserOptions) {
    const res = await configLoader(opt)
    res.prompt.openAIToken = ''
    delete res.prompt.openAIToken
    delete res.prompt.apiModel
    delete res.prompt.apiEndpoint
    delete res.prompt.apiProxy
    return res
}

describe('config loader', () => {
    let mockDir: tmp.DirResult | null = null
    afterEach(() => {
        if (mockDir !== null)
            mockDir.removeCallback()
    })

    it('basic packages.json config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/1-basic')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({ prompt: { path: 'node_modules/cz-git', useEmoji: true } })
    }, 1000)

    it('basic commitlint js config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/1-basic-commitlint-js')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({
            rules: { 'scope-enum': [2, 'always', ['cz-git']] },
            prompt: { path: 'node_modules/cz-git', useEmoji: true },
        })
    }, 1000)

    it('basic commitlint json config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/1-basic-commitlint-json')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({
            rules: { 'scope-enum': [2, 'always', ['cz-git']] },
            prompt: { path: 'node_modules/cz-git', useEmoji: true },
        })
    }, 1000)

    it('basic commitizen js config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/1-basic-cz-js')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({ prompt: { useEmoji: true } })
    }, 1000)

    it('basic commitizen json config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/1-basic-cz-json')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({ prompt: { path: 'node_modules/cz-git', useEmoji: true } })
    }, 1000)

    it('commitizen extends config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/2-extend-commitlint')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({
            rules: {
                'scope-enum': [2, 'always', ['cz-git']],
                'subject-empty': [2, 'never'],
                'subject-min-length': [2, 'always', 2],
            },
            prompt: {
                path: 'node_modules/cz-git',
                useEmoji: true,
                customIssuePrefixAlign: 'top',
            },
        })
    }, 1000)

    it('config function should be call', async () => {
        mockDir = await useBootstrap('./fixtures/3-config-function')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({
            rules: {
                'scope-enum': [2, 'always', ['cz-git']],
                'subject-empty': [2, 'never'],
                'subject-min-length': [2, 'always', 2],
            },
            prompt: {
                useEmoji: true,
                customIssuePrefixAlign: 'top',
                themeColorCode: '38;5;043',
            },
        })
    }, 1000)

    it('custom config should be loaded', async () => {
        mockDir = await useBootstrap('./fixtures/4-custom-config')
        const config = await loaderSpyFn({ cwd: mockDir.name })
        expect(config).toEqual({
            prompt: {
                useEmoji: true,
            },
        })
    }, 1000)

    it('specify the configuration path', async () => {
        mockDir = await useBootstrap('./fixtures/5-specify-custom-config')
        const config = await loaderSpyFn({ cwd: mockDir.name, configPath: './config/cz.custom.js' })
        expect(config).toEqual({
            prompt: {
                useEmoji: true,
            },
        })
    }, 1000)
})
