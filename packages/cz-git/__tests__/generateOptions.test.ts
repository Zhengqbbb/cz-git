import process from 'node:process'
import { afterAll, beforeEach, describe, expect, test, vitest } from 'vitest'
import { generateOptions } from '../src/generator'
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

  test('generate default options should be equal default config', () => {
    expect(generateOptions({})).toEqual(defaultConfig)
  })
})
