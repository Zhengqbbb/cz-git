/**
 * @description: generate commit message(generateMessage)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { style } from '@cz-git/inquirer'
import { getCurrentScopes, isSingleItem, parseStandardScopes, wrap } from '../shared'
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
  const scopeList = parseStandardScopes(
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

const getCustomValue = (originVal?: string | string [], customVal?: string) => {
  if (Array.isArray(originVal))
    return originVal
  return originVal !== '___CUSTOM___' ? originVal || '' : customVal || ''
}

const addType = (type: string, colorize?: boolean) => (colorize ? style.green(type) : type)

const addScope = (scope?: string, colorize?: boolean) => {
  if (!scope)
    return ''
  scope = colorize ? style.yellow(scope) : scope
  return scope?.trim()
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

const addFooter = (footerSuffix: string, footerPrefix = '', colorize?: boolean) => {
  if (footerSuffix === '')
    return ''
  if (footerPrefix === '')
    return colorize ? `\n\n${style.green(footerSuffix)}` : `\n\n${footerSuffix}`

  return colorize
    ? `\n\n${style.green(`${footerPrefix} ${footerSuffix}`)}`
    : `\n\n${footerPrefix} ${footerSuffix}`
}

const formatDefaultMessage = (defaultHeader: string, body: string, breaking: string, footer: string) => {
  let result = defaultHeader
  if (body)
    result += `\n\n${body}`

  if (breaking)
    result += `\n\nBREAKING CHANGE: ${breaking}`

  if (footer)
    result += footer
  return result
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
  // resolve custom value
  const { customScope, customFooterPrefixs } = answers
  answers.scope = getCustomValue(answers.scope, customScope)
  answers.footerPrefix = getCustomValue(answers.footerPrefix, customFooterPrefixs) as string
  // resolve single | multiple item
  const { singleScope, singeIssuePrefix } = getSingleParams(answers, options)
  const scopeSource = Array.isArray(answers.scope)
    ? answers.scope.join(options.scopeEnumSeparator)
    : answers.scope

  const type = addType(answers.type ?? '', colorize)
  const emoji = getEmojiCode(answers.type || '', options)
  const scope = addScope(singleScope || scopeSource, colorize)
  const markBreaking = addBreakchangeMark(answers.markBreaking, colorize)
  const subject = addSubject(answers.subject, colorize)

  const defaultHeader
    = `${`${addEmoji(emoji, 'left', options.emojiAlign)}${type}${scope ? `(${scope})` : ''}${markBreaking}`
      }: ${addEmoji(emoji, 'center', options.emojiAlign)}${subject}${addEmoji(emoji, 'right', options.emojiAlign)}`

  const body = wrap(answers.body ?? '', wrapOptions)
  const breaking = wrap(answers.breaking ?? '', wrapOptions)
  const footerSuffix = wrap(answers.footer ?? '', wrapOptions)
  const footer = addFooter(footerSuffix, answers.footerPrefix || singeIssuePrefix, colorize)
  const defaultMessage = formatDefaultMessage(defaultHeader, body, breaking, footer)

  if (typeof options.formatMessageCB === 'function') {
    return options.formatMessageCB({
      type,
      emoji,
      scope,
      markBreaking,
      subject,
      defaultHeader,
      body,
      breaking,
      footer,
      defaultMessage,
    })
  }
  else {
    return defaultMessage
  }
}
