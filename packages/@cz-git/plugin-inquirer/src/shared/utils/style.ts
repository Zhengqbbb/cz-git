/**
 * @description: term style output colorizen
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import tty from "tty";

/**
 * @description: check current is support color command text
 * @param colorSupoort can force color not output. [default] true
 */
export const isColorizenSupport = (colorSupoort = true) => {
  return (
    colorSupoort &&
    !("NO_COLOR" in process.env) &&
    (process.platform === "win32" ||
      (tty.isatty(1) && process.env.TERM !== "dumb") ||
      "CI" in process.env)
  );
};

const formatter =
  (open: string, close: string, replace = open) =>
  (input: string) => {
    const string = "" + input;
    const index = string.indexOf(close, open.length);
    return ~index
      ? open + replaceClose(string, close, replace, index) + close
      : open + string + close;
  };

export const replaceClose = (
  string: string,
  close: string,
  replace: any,
  index: number
): string => {
  const start = string.substring(0, index) + replace;
  const end = string.substring(index + close.length);
  const nextIndex = end.indexOf(close);
  return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
};

const styleFn = (enabled = isColorizenSupport()) => ({
  isColorSupported: enabled,
  reset: enabled ? (s: string) => `\u001b[0m${s}\u001b[0m` : String,
  bold: enabled ? formatter("\u001b[1m", "\u001b[0m", "\u001b[0m") : String,
  dim: enabled ? formatter("\u001b[2m", "\u001b[0m", "\u001b[0m") : String,
  italic: enabled ? formatter("\u001b[3m", "\u001b[0m", "\u001b[0m") : String,
  underline: enabled ? formatter("\u001b[4m", "\u001b[0m") : String,
  inverse: enabled ? formatter("\u001b[7m", "\u001b[0m") : String,
  black: enabled ? formatter("\u001b[30m", "\u001b[0m") : String,
  red: enabled ? formatter("\u001b[31m", "\u001b[0m") : String,
  green: enabled ? formatter("\u001b[32m", "\u001b[0m") : String,
  yellow: enabled ? formatter("\u001b[33m", "\u001b[0m") : String,
  blue: enabled ? formatter("\u001b[34m", "\u001b[0m") : String,
  magenta: enabled ? formatter("\u001b[35m", "\u001b[0m") : String,
  cyan: enabled ? formatter("\u001b[36m", "\u001b[0m") : String,
  white: enabled ? formatter("\u001b[37m", "\u001b[0m") : String,
  gray: enabled ? formatter("\u001b[90m", "\u001b[0m") : String,
  rgb: (rgbColor = "38;5;036") =>
    enabled ? formatter(`\u001b[${rgbColor}m`, "\u001b[0m") : String,
  bgBlack: enabled ? formatter("\u001b[40m", "\u001b[0m") : String,
  bgRed: enabled ? formatter("\u001b[41m", "\u001b[0m") : String,
  bgGreen: enabled ? formatter("\u001b[42m", "\u001b[0m") : String,
  bgYellow: enabled ? formatter("\u001b[43m", "\u001b[0m") : String,
  bgBlue: enabled ? formatter("\u001b[44m", "\u001b[0m") : String,
  bgMagenta: enabled ? formatter("\u001b[45m", "\u001b[0m") : String,
  bgCyan: enabled ? formatter("\u001b[46m", "\u001b[0m") : String,
  bgWhite: enabled ? formatter("\u001b[47m", "\u001b[0m") : String
});

/**
 * @description: support control isColorizen as param's
 * style generator
 * @param {boolen} enabled
 * @return {Function} style
 */
export const createStyle = styleFn;

/**
 * @description: commandline style output colorizen
 *
 * Automatically determine whether output coloring is required
 */
export const style = styleFn();
