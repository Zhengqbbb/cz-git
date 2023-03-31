/**
 * @description: term style output colorizen
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import tty from 'node:tty'

/**
 * @description: check current is support color command text
 * @param colorSupoort can force color not output. [default] true
 */
export function isColorizenSupport(colorSupoort = true) {
  return (
    colorSupoort
    && !('NO_COLOR' in process.env)
    && (
      process.platform === 'win32'
      || (tty.isatty(1) && process.env.TERM !== 'dumb')
      || 'CI' in process.env
    )
  )
  || (!process.env.VITEST && 'FORCE_COLOR' in process.env)
}

export function replaceClose(string: string,
  close: string,
  replace: any,
  index: number): string {
  const start = string.substring(0, index) + replace
  const end = string.substring(index + close.length)
  const nextIndex = end.indexOf(close)
  return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end
}

function formatter(open: string, close: string, replace = open) {
  return (input: string) => {
    const string = `${input}`
    const index = string.indexOf(close, open.length)
    return ~index
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close
  }
}

function styleFn(enabled = isColorizenSupport()) {
  return {
    isColorSupported: enabled,
    reset: enabled ? (s: string) => `\u001B[0m${s}\u001B[0m` : String,
    bold: enabled ? formatter('\u001B[1m', '\u001B[0m', '\u001B[0m') : String,
    dim: enabled ? formatter('\u001B[2m', '\u001B[0m', '\u001B[0m') : String,
    italic: enabled ? formatter('\u001B[3m', '\u001B[0m', '\u001B[0m') : String,
    underline: enabled ? formatter('\u001B[4m', '\u001B[0m') : String,
    inverse: enabled ? formatter('\u001B[7m', '\u001B[0m') : String,
    black: enabled ? formatter('\u001B[30m', '\u001B[0m') : String,
    red: enabled ? formatter('\u001B[31m', '\u001B[0m') : String,
    green: enabled ? formatter('\u001B[32m', '\u001B[0m') : String,
    yellow: enabled ? formatter('\u001B[33m', '\u001B[0m') : String,
    blue: enabled ? formatter('\u001B[34m', '\u001B[0m') : String,
    magenta: enabled ? formatter('\u001B[35m', '\u001B[0m') : String,
    cyan: enabled ? formatter('\u001B[36m', '\u001B[0m') : String,
    white: enabled ? formatter('\u001B[37m', '\u001B[0m') : String,
    gray: enabled ? formatter('\u001B[90m', '\u001B[0m') : String,
    rgb: (rgbColor = '38;5;036') =>
      enabled ? formatter(`\u001B[${rgbColor}m`, '\u001B[0m') : String,
    bgBlack: enabled ? formatter('\u001B[40m', '\u001B[0m') : String,
    bgRed: enabled ? formatter('\u001B[41m', '\u001B[0m') : String,
    bgGreen: enabled ? formatter('\u001B[42m', '\u001B[0m') : String,
    bgYellow: enabled ? formatter('\u001B[43m', '\u001B[0m') : String,
    bgBlue: enabled ? formatter('\u001B[44m', '\u001B[0m') : String,
    bgMagenta: enabled ? formatter('\u001B[45m', '\u001B[0m') : String,
    bgCyan: enabled ? formatter('\u001B[46m', '\u001B[0m') : String,
    bgWhite: enabled ? formatter('\u001B[47m', '\u001B[0m') : String,
  }
}

/**
 * @description: support control isColorizen as param's
 * style generator
 * @param {boolen} enabled
 * @return {Function} style
 */
export const createStyle = styleFn

/**
 * @description: commandline style output colorizen
 *
 * Automatically determine whether output coloring is required
 * @tip the rgb color see to check your number: https://github.com/sindresorhus/xterm-colors
 */
export const style = styleFn()
