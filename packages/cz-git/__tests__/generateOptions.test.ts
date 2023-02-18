import process from 'node:process'
import { afterAll, beforeEach, describe, expect, test, vitest } from 'vitest'
import { generateOptions } from '../src/generator'
import type { UserConfig } from '../src/shared'
import { defaultConfig } from '../src/shared'

/**
 * @description: generateOptions Test
 */
describe('generateOptions()', () => {
  const env = process.env
  beforeEach(() => {
    vitest.resetModules()
    process.env = { ...env }
    delete process.env.NO_COLOR
    delete process.env.___X_CMD_THEME_COLOR_CODE
    delete process.env.emoji
    delete process.env.checkbox
  })
  afterAll(() => {
    process.env = env
  })

  const generateSpyFn = (opt: UserConfig) => {
    const res = generateOptions(opt)
    res.openAIToken = ''
    return res
  }

  test('generate default options should be equal default config', () => {
    expect(generateSpyFn({})).toEqual(defaultConfig)
  })

  test('v1.4.0 fix typo option. old field should be normal compatibility', () => {
    expect(generateSpyFn({
      prompt: {
        issuePrefixs: [{ value: 'link', name: 'link' }],
        customIssuePrefixsAlign: 'top-bottom',
        emptyIssuePrefixsAlias: 'sk',
        customIssuePrefixsAlias: 'cs',
        allowCustomIssuePrefixs: false,
        allowEmptyIssuePrefixs: false,
      },
    })).toEqual({
      ...defaultConfig,
      issuePrefixes: [{ value: 'link', name: 'link' }],
      customIssuePrefixAlign: 'top-bottom',
      emptyIssuePrefixAlias: 'sk',
      customIssuePrefixAlias: 'cs',
      allowCustomIssuePrefix: false,
      allowEmptyIssuePrefix: false,
    })
  })
})
