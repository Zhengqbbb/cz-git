import process from 'node:process'
import { afterAll, beforeEach, describe, expect, test, vitest } from 'vitest'
import { createStyle, isColorizenSupport } from '../src'

/**
 * @description: utils - isColorizenSupport Test
 */
describe('isColorizenSupport()', () => {
  const env = process.env
  beforeEach(() => {
    vitest.resetModules()
    process.env = { ...env }
    delete process.env.NO_COLOR
    process.env.TERM = 'xterm-256color'
  })
  afterAll(() => {
    process.env = env
  })

  test('param force false should be false', () => {
    expect(isColorizenSupport(false)).toBe(false)
  })
  test('NO_COLOR should be false', () => {
    process.env.NO_COLOR = 'true'
    expect(isColorizenSupport()).toBe(false)
  })
  test('TERM is dumb should be false | platform is win32 should be true', () => {
    delete process.env.CI
    process.env.TERM = 'dumb'
    if (process.platform === 'win32')
      expect(isColorizenSupport()).toBe(true)

    else
      expect(isColorizenSupport()).toBe(false)
  })
})

/**
 * @description: utils - style Test
 */
describe('style()', () => {
  test('force unenable color shoule be normal', () => {
    const style = createStyle(false)
    expect(style.cyan('hello world')).toBe('hello world')
    expect(style.bold(style.white('hello'))).toBe('hello')
    expect(style.bold(` Add plugin ${style.yellow('hello')}`)).toBe(' Add plugin hello')
  })
  test('default use ouput should be right', () => {
    const style = createStyle(true)
    expect(style.bold('hello')).toBe('\u001B[1mhello\u001B[0m')
    expect(style.cyan('hello')).toBe('\u001B[36mhello\u001B[0m')
    expect(style.gray('hello')).toBe('\u001B[90mhello\u001B[0m')
    expect(style.rgb('38;5;036')('hello')).toBe('\u001B[38;5;036mhello\u001B[0m')
    expect(style.bold(` Add plugin ${style.yellow('hello')}`)).toBe(
      '\u001B[1m Add plugin \u001B[33mhello\u001B[0m\u001B[0m',
    )
  })
  test('if param error should be not output', () => {
    const style = createStyle(true)
    // @ts-expect-error
    expect(style.bold('hello', [])).toBe('\u001B[1mhello\u001B[0m')
  })
})
