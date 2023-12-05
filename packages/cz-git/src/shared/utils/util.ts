/**
 * @description: provide until function
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { style } from '@cz-git/inquirer'
import type { Answers, CommitizenGitOptions, Option, ScopesType } from '..'

export function useThemeCode(input: string, themeColorCode?: string) {
  return themeColorCode ? style.rgb(themeColorCode)(input) : style.cyan(input)
}

export function log(type: 'info' | 'warm' | 'err', msg: string) {
  const colorMapping = {
    info: '\u001B[32m',
    warm: '\u001B[33m',
    err: '\u001B[31m',
    reset: '\u001B[0m',
  }
  console.info(`${colorMapping[type]}[${type}]>>>: ${msg}${colorMapping.reset}`)
}

export function isString(str: any) {
  return typeof str === 'string'
}

/**
 * @description: count header length
 *
 * {2}: mean ': '
 */
function countLength(target: number, typeLength: number, scope: number, emojiLength: number) {
  return target - typeLength - 2 - scope - emojiLength
}

/**
 * @description: resolve list item pin top
 */
export function resolveListItemPinTop(
  arr: { name: string; value: any }[],
  defaultValue?: string | string[],
) {
  if (!defaultValue || defaultValue === '')
    return arr
  const targets = Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  targets.forEach((target) => {
    const index = arr.findIndex(i => i.value === target)
    if (~index)
      arr = [arr[index], ...arr.slice(0, index), ...arr.slice(index + 1)]
  })
  return arr
}

/**
 * @description: check scope list and issuePrefix is only single item (scope, issuePrefix)
 */
export function isSingleItem(allowCustom = true, allowEmpty = true, list: Array<any> = []) {
  return !allowCustom && !allowEmpty && Array.isArray(list) && list.length === 1
}

/**
 * @description: resolve AI modify mode and normal answer type and default type
 */
export function resolveDefaultType(options: CommitizenGitOptions, answer: Answers) {
  if (!answer.type && options.useAI)
    return options.defaultType

  return answer.type || options.defaultType
}

/**
 * @description: parse scope configuration option to standard options
 */
export function parseStandardScopes(scopes: ScopesType): Option[] {
  return scopes.map((scope) => {
    return typeof scope === 'string'
      ? { name: scope, value: scope }
      : !scope.value
          ? { value: scope.name, ...scope }
          : { value: scope.value, name: scope.name }
  })
}

export function getCurrentScopes(scopes?: any[],
  scopeOverrides?: { [x: string]: any[] },
  answerType?: string) {
  let result = []
  if (scopeOverrides && answerType && scopeOverrides[answerType])
    result = scopeOverrides[answerType]

  else if (Array.isArray(scopes))
    result = scopes

  return result
}

function filterCustomEmptyByOption(target: {
  name: string
  value: any
}[],
allowCustom = true,
allowEmpty = true) {
  target = allowCustom ? target : target.filter(i => i.value !== '___CUSTOM___')
  return allowEmpty ? target : target.filter(i => i.value !== false)
}
/**
 * @description
 * Handle custom list template (types, scopes)
 *
 * Add separator custom empty
 */
export function resovleCustomListTemplate(
  target: Array<{ name: string; value: string }>,
  cz: any,
  align = 'top',
  emptyAlias = 'empty',
  customAlias = 'custom',
  allowCustom = true,
  allowEmpty = true,
  defaultValue: string | string[] = '',
  scopeFilters = ['.DS_Store'],
) {
  let result: Array<{ name: string; value: any }> = [
    { name: emptyAlias, value: false },
    { name: customAlias, value: '___CUSTOM___' },
    new cz.Separator(),
  ]
  if (!Array.isArray(target) || target.length === 0) {
    return !allowEmpty ? result.slice(1) : result
  }
  else if (defaultValue !== '') {
    // pin the defaultValue to the top
    target = resolveListItemPinTop(target, defaultValue)
  }
  // prettier-ignore
  switch (align) {
    case 'top':
      result = result
        .concat(target)
      break
    case 'bottom':
      result = target
        .concat(result.reverse())
      break
    case 'top-bottom':
      result = [{ name: emptyAlias, value: false }, new cz.Separator()]
        .concat(target)
        .concat([new cz.Separator(), { name: customAlias, value: '___CUSTOM___' }])
      break
    case 'bottom-top':
      result = result = [{ name: customAlias, value: '___CUSTOM___' }, new cz.Separator()]
        .concat(target)
        .concat([new cz.Separator(), { name: emptyAlias, value: false }])
      break
    default:
      result = result
        .concat(target)
      break
  }
  return filterCustomEmptyByOption(result, allowCustom, allowEmpty).filter(
    i => !scopeFilters.includes(i.value),
  )
}

/**
 * @description: get subject word
 */
export function getProcessSubject(text: string) {
  return text.replace(/(^[\s]+|[\s\.]+$)/g, '') ?? ''
}

function getEmojiStrLength(options: CommitizenGitOptions, type?: string): number {
  const item = options.types?.find((i: { value?: string }) => i.value === type)
  // 1: space
  return item?.emoji ? item.emoji.length + 1 : 0
}

/**
 * @description: get max subject length
 */
export function getMaxSubjectLength(type: Answers['type'],
  scope: Answers['scope'],
  options: CommitizenGitOptions) {
  let optionMaxLength = Infinity
  if (Array.isArray(scope))
    scope = scope.join(options.scopeEnumSeparator)
  const typeLength = type?.length ? type.length : 0
  const scopeLength = scope ? scope.length + 2 : 0
  const emojiLength = options.useEmoji ? getEmojiStrLength(options, type) : 0
  const maxHeaderLength = options?.maxHeaderLength ? options?.maxHeaderLength : Infinity
  const maxSubjectLength = options?.maxSubjectLength ? options?.maxSubjectLength : Infinity
  if (options?.maxHeaderLength === 0 || options?.maxSubjectLength === 0) {
    return 0
  }
  else if (maxHeaderLength === Infinity) {
    return maxSubjectLength !== Infinity ? maxSubjectLength : Infinity
  }
  else {
    optionMaxLength
      = countLength(maxHeaderLength, typeLength, scopeLength, emojiLength) < maxSubjectLength
        ? maxHeaderLength
        : maxSubjectLength
  }
  return countLength(optionMaxLength, typeLength, scopeLength, emojiLength)
}

export function previewMessage(msg: string, confirmColorize = false) {
  const SEP = confirmColorize
    ? '\u001B[90m###--------------------------------------------------------###\u001B[0m'
    : '###--------------------------------------------------------###'
  console.info(`\n${SEP}\n${msg}\n${SEP}\n`)
}
