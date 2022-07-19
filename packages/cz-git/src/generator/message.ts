/**
 * @description: generate commit message(generateMessage)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { style } from '@cz-git/inquirer'
import { getCurrentScopes, handleStandardScopes, isSingleItem, wrap } from '../shared'
import type { Answers, CommitizenGitOptions } from '../shared'

export const getAliasMessage = (config: CommitizenGitOptions, alias?: string) => {
  if (!alias || typeof config?.alias?.[alias] !== 'string') {
    throw new Error(`${style.red(`>>> The alias "${alias}" is undefined`)}

${style.yellow('>>> The currently obtained alias configuration:')}
${style.cyan(JSON.stringify(config.alias, null, 2))}
`)
  }
  console.log(`${style.green(`>>> Using "${alias}" commit message alias:`)}`)
  console.log(`${style.gray(config.alias[alias])}`)
  return config.alias[alias]
}

const getSingleParams = (answers: Answers, options: CommitizenGitOptions) => {
  const singleIndex = 0
  const mapping = {
    singleScope: '',
    singeIssuePrefix: '',
  }
  const scopeList = handleStandardScopes(
    getCurrentScopes(options.scopes, options.scopeOverrides, answers.type),
  )
  if (isSingleItem(options.allowCustomScopes, options.allowEmptyScopes, scopeList))
    mapping.singleScope = scopeList[singleIndex].value

  if (
    isSingleItem(
      options.allowCustomIssuePrefixs,
      options.allowEmptyIssuePrefixs,
      options.issuePrefixs,
    )
  )
    mapping.singeIssuePrefix = options.issuePrefixs?.[singleIndex].value || ''

  return mapping
}

const addType = (type: string, colorize?: boolean) => (colorize ? style.green(type) : type)

const addScope = (scope?: string, colorize?: boolean) => {
  if (!scope)
    return ''
  scope = colorize ? style.yellow(scope) : scope
  return `(${scope?.trim()})`
}

const addBreakchangeMark = (markBreaking?: string | boolean, colorize?: boolean) => {
  const mark = colorize ? style.red('!') : '!'
  return Boolean(markBreaking) || Boolean(process.env.break === '1') ? mark : ''
}

const getEmojiCode = (type: string, options: CommitizenGitOptions): string => {
  if (!options.useEmoji || type === '')
    return ''
  const itemSource = options.types?.concat(options.typesAppend || []) || []
  const item = itemSource.find(i => i.value === type)
  return item?.emoji ? item.emoji : ''
}

const addEmoji = (emojiCode: string, align: string, emojiAlign?: string) => {
  if (!emojiCode)
    return ''
  switch (emojiAlign) {
    case 'left' || 'center':
      return align === emojiAlign ? `${emojiCode} ` : ''
    case 'right':
      return align === emojiAlign ? ` ${emojiCode}` : ''
  }
  return align === 'center' ? `${emojiCode} ` : ''
}

const addSubject = (subject?: string, colorize?: boolean) => {
  if (!subject)
    return ''
  subject = colorize ? style.cyan(subject) : subject
  return subject.trim()
}

const addFooter = (footer: string, footerPrefix = '', colorize?: boolean) => {
  if (footerPrefix === '')
    return colorize ? `\n\n${style.green(footer)}` : `\n\n${footer}`

  return colorize
    ? `\n\n${style.green(`${footerPrefix} ${footer}`)}`
    : `\n\n${footerPrefix} ${footer}`
}

export const generateMessage = (
  answers: Answers,
  options: CommitizenGitOptions,
  colorize = false,
) => {
  const wrapOptions = {
    breaklineChar: options.breaklineChar || '|',
    trim: true,
    newLine: '\n',
    indent: '',
    width: options.breaklineNumber,
  }

  const { customScope, customFooterPrefixs } = answers
  answers.scope = (answers.scope === '___CUSTOM___' && customScope) || answers.scope
  answers.footerPrefix
    = (answers.footerPrefix === '___CUSTOM___' && customFooterPrefixs) || answers.footerPrefix

  const { singleScope, singeIssuePrefix } = getSingleParams(answers, options)
  const scope = Array.isArray(answers.scope)
    ? answers.scope.join(options.scopeEnumSeparator)
    : answers.scope
  const emoji = getEmojiCode(answers.type || '', options)
  const head
    = `${addEmoji(emoji, 'left', options.emojiAlign)
    + addType(answers.type ?? '', colorize)
    + addScope(singleScope || scope, colorize)
    + addBreakchangeMark(answers.markBreaking, colorize)
    }: ${
    addEmoji(emoji, 'center', options.emojiAlign)
    }${addSubject(answers.subject, colorize)
    }${addEmoji(emoji, 'right', options.emojiAlign)}`
  const body = wrap(answers.body ?? '', wrapOptions)
  const breaking = wrap(answers.breaking ?? '', wrapOptions)
  const footer = wrap(answers.footer ?? '', wrapOptions)

  let result = head
  if (body)
    result += `\n\n${body}`

  if (breaking)
    result += `\n\nBREAKING CHANGE :\n${breaking}`

  if (footer)
    result += addFooter(footer, answers.footerPrefix || singeIssuePrefix, colorize)

  return result
}
