import { afterEach, describe, expect, test } from 'vitest'
import type tmp from 'tmp'
import type { UserOptions } from '../src'
import { configLoader } from '../src'
import { useBootstrap } from './utils'

describe('config loader', () => {
  let mockDir: tmp.DirResult | null = null
  afterEach(() => {
    if (mockDir !== null)
      mockDir.removeCallback()
  })

  const loaderSpyFn = async (opt: UserOptions) => {
    const res = await configLoader(opt)
    res.prompt.openAIToken = ''
    delete res.prompt.openAIToken
    delete res.prompt.apiProxy
    return res
  }

  test('basic packages.json config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/1-basic')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({ prompt: { path: 'node_modules/cz-git', useEmoji: true } })
  }, 1000)

  test('basic commitlint js config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/1-basic-commitlint-js')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({
      rules: { 'scope-enum': [2, 'always', ['cz-git']] },
      prompt: { path: 'node_modules/cz-git', useEmoji: true },
    })
  }, 1000)

  test('basic commitlint json config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/1-basic-commitlint-json')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({
      rules: { 'scope-enum': [2, 'always', ['cz-git']] },
      prompt: { path: 'node_modules/cz-git', useEmoji: true },
    })
  }, 1000)

  test('basic commitizen js config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/1-basic-cz-js')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({ prompt: { useEmoji: true } })
  }, 1000)

  test('basic commitizen json config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/1-basic-cz-json')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({ prompt: { path: 'node_modules/cz-git', useEmoji: true } })
  }, 1000)

  test('commitizen extends config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/2-extend-commitlint')
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
      },
    })
  }, 1000)

  test('config function should be call', async () => {
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

  test('custom config should be loaded', async () => {
    mockDir = await useBootstrap('./fixtures/4-custom-config')
    const config = await loaderSpyFn({ cwd: mockDir.name })
    expect(config).toEqual({
      prompt: {
        useEmoji: true,
      },
    })
  }, 1000)

  test('specify the configuration path', async () => {
    mockDir = await useBootstrap('./fixtures/5-specify-custom-config')
    const config = await loaderSpyFn({ cwd: mockDir.name, configPath: './config/cz.custom.js' })
    expect(config).toEqual({
      prompt: {
        useEmoji: true,
      },
    })
  }, 1000)
})
