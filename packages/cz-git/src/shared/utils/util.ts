/**
 * @description Provide until function
 * @author Zhengqbbb <zhengqbbb@gmail.com>
 * @license MIT
 */

import process from 'node:process'
import { style } from '@cz-git/inquirer'
import type { Answers, CommitizenGitOptions, Option, ScopesType } from '../types'

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
 * count header length
 *
 * {2}: mean ': '
 */
function countLength(target: number, typeLength: number, scopeLength: number, emojiLength: number) {
    return target - typeLength - 2 - scopeLength - emojiLength
}

/**
 * resolve list item pin top
 */
export function resolveListItemPinTop(
    arr: { name: string, value: any }[],
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
 * check scope list and issuePrefix is only single item (scope, issuePrefix)
 */
export function isSingleItem(allowCustom = true, allowEmpty = true, list: Array<any> = []) {
    return !allowCustom && !allowEmpty && Array.isArray(list) && list.length === 1
}

/**
 * make sure can get answers type
 *
 * 1. normal answer type
 * 2. resolve AI direct output mode
 * 3. output default type
 */
export function getAnswersType(options: CommitizenGitOptions, answer: Answers) {
    if (!answer.type && options.useAI)
        return options.defaultType

    return answer.type || options.defaultType
}

/**
 * parse scope configuration option to standard options
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
/**
 * To get a list of scopes
 *
 * 1. If have overrides by answerType, return the override list
 * 2. If have scopes is empty, return empty array
 */
export function getScopesList(
    scopes?: any[],
    scopeOverrides?: { [x: string]: any[] },
    answerType?: string,
) {
    let result = []
    if (scopeOverrides && answerType && scopeOverrides[answerType])
        result = scopeOverrides[answerType]

    else if (Array.isArray(scopes))
        result = scopes

    return result
}

function filterCustomEmptyByOption(
    target: {
        name: string
        value: any
    }[],
    allowCustom = true,
    allowEmpty = true,
) {
    target = allowCustom ? target : target.filter(i => i.value !== '___CUSTOM___')
    return allowEmpty ? target : target.filter(i => i.value !== false)
}
/**
 * Handle custom list template (types, scopes)
 *
 * 1. Add separator, custom, empty
 * 2. Sort target, empty and custom position
 */
export function resovleCustomListTemplate(
    target: Array<{ name: string, value: string }>,
    cz: any,
    align = 'top',
    emptyAlias = 'empty',
    customAlias = 'custom',
    allowCustom = true,
    allowEmpty = true,
    defaultValue: string | string[] = '',
    scopeFilters = ['.DS_Store'],
) {
    let result: Array<{ name: string, value: any }> = [
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
            result = [{ name: customAlias, value: '___CUSTOM___' }, new cz.Separator()]
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
 * To get the scope of the answer
 *
 * 1. If scope is custom mode, return the input custom scope
 * 2. If scope is input mode flag, return the input scope
 */
export function getAnswersScope(options: CommitizenGitOptions, answers: Answers) {
    const isCustomScope = answers.scope === '___CUSTOM___'
    const isInputMode = isString(options.defaultScope) && (options.defaultScope as string).startsWith('___CUSTOM___:')
    const answerScope = (isCustomScope || isInputMode) ? answers.customScope : answers.scope
    return { isCustomScope, isInputMode, answerScope }
}

/**
 * get subject word
 */
export function getProcessSubject(text: string) {
    return text.replace(/(^\s+|[\s.]+$)/g, '') ?? ''
}

function getEmojiStrLength(options: CommitizenGitOptions, type?: string): number {
    const item = options.types?.find((i: { value?: string }) => i.value === type)
    // 1: space
    return item?.emoji ? item.emoji.length + 1 : 0
}

/**
 * get max subject length
 */
export function getMaxSubjectLength(type: Answers['type'], scope: Answers['scope'] | Answers['customScope'], options: CommitizenGitOptions) {
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
        return maxSubjectLength !== Infinity
            ? maxSubjectLength
            : Infinity
    }
    else {
        const isSubjectLengthMax = countLength(maxHeaderLength, typeLength, scopeLength, emojiLength) < maxSubjectLength
        return isSubjectLengthMax
            ? countLength(maxHeaderLength, typeLength, scopeLength, emojiLength)
            : maxSubjectLength
    }
}

export function previewMessage(msg: string, confirmColorize = false) {
    const SEP = confirmColorize
        ? '\u001B[90m###--------------------------------------------------------###\u001B[0m'
        : '###--------------------------------------------------------###'
    console.info(`\n${SEP}\n${msg}\n${SEP}\n`)
}

export function isNodeVersionInRange(pMajor = 12, pMinor?: number) {
    if (!process.version.startsWith('v'))
        return false
    const major = process.version.split('.')[0].slice(1)
    const minor = process.version.split('.')[1]
    return !pMinor
        ? Number(major) >= pMajor
        : Number(major) >= pMajor && Number(minor) >= pMinor
}
