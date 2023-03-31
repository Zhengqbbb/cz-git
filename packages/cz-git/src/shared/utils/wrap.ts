/**
 * @description: fork by "word-wrap" v1.2.3"
 */

function identity(str: string) {
  return str
}

interface Options {
  breaklineChar: string
  width?: number
  indent?: string
  newline?: string
  escape?: (str: string) => string
  trim?: boolean
  cut?: boolean
}

export function wrap(str: string, options?: Options) {
  options = options || { breaklineChar: '|' }
  if (str == null)
    return str

  str = str.split(options.breaklineChar).join('\n').valueOf()

  const width = options.width || 100
  const indent = typeof options.indent === 'string' ? options.indent : ''

  const newline = options.newline || `\n${indent}`
  const escape = typeof options.escape === 'function' ? options.escape : identity

  let regexString = `.{1,${width}}`
  if (options.cut !== true)
    regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)'

  const re = new RegExp(regexString, 'g')
  const lines = str.match(re) || []
  let result
    = indent
    + lines
      .map((line) => {
        if (line.slice(-1) === '\n')
          line = line.slice(0, line.length - 1)

        return escape(line)
      })
      .join(newline)

  if (options.trim === true)
    result = result.replace(/[ \t]*$/gm, '')

  return result
}
