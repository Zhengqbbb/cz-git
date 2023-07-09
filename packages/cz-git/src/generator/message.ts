/**
 * @description: generate commit message(generateMessage)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */
import { spawnSync } from 'node:child_process'
import { style } from '@cz-git/inquirer'
import {
  getCurrentScopes,
  getMaxSubjectLength,
  isSingleItem,
  parseStandardScopes,
  useThemeCode,
  wrap,
} from '../shared'
import type { Answers, CommitizenGitOptions, GenerateAIPromptType } from '../shared'
import { fetchOpenAIMessage } from './api'

export function getAliasMessage(config: CommitizenGitOptions, alias?: string) {
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

function getSingleParams(answers: Answers, options: CommitizenGitOptions) {
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

  if (isSingleItem(options.allowCustomIssuePrefix, options.allowEmptyIssuePrefix, options.issuePrefixes))
    mapping.singeIssuePrefix = options.issuePrefixes?.[singleIndex].value || ''

  return mapping
}

function getCustomValue(originVal?: string | string [], customVal?: string) {
  if (Array.isArray(originVal))
    return originVal
  return originVal !== '___CUSTOM___' ? (originVal || '') : (customVal || '')
}

function addType(type: string, colorize?: boolean) {
  return colorize ? style.green(type) : type
}

function addScope(scope?: string, colorize?: boolean) {
  if (!scope)
    return ''
  scope = colorize ? style.yellow(scope) : scope
  return scope?.trim()
}

function addBreakchangeMark(markBreaking?: string | boolean, colorize?: boolean) {
  const mark = colorize ? style.red('!') : '!'
  return (Boolean(markBreaking) || Boolean(process.env.break === '1')) ? mark : ''
}

function getEmojiCode(type: string, options: CommitizenGitOptions): string {
  if (!options.useEmoji || type === '')
    return ''
  const itemSource = options.types?.concat(options.typesAppend || []) || []
  const item = itemSource.find(i => i.value === type)
  return item?.emoji ? item.emoji : ''
}

function addEmoji(emojiCode: string, align: string, emojiAlign?: string) {
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

function addSubject(subject?: string, colorize?: boolean, themeColorCode?: string) {
  if (!subject)
    return ''
  if (!colorize)
    return subject.trim()
  else
    return useThemeCode(subject, themeColorCode).trim()
}

function addFooter(footerSuffix: string, footerPrefix = '', colorize?: boolean) {
  if (footerSuffix === '')
    return ''
  if (footerPrefix === '')
    return colorize ? `\n\n${style.green(footerSuffix)}` : `\n\n${footerSuffix}`

  return colorize
    ? `\n\n${style.green(`${footerPrefix} ${footerSuffix}`)}`
    : `\n\n${footerPrefix} ${footerSuffix}`
}

function formatDefaultMessage(defaultHeader: string, body: string, breaking: string, footer: string) {
  let result = defaultHeader
  if (body)
    result += `\n\n${body}`

  if (breaking)
    result += `\n\nBREAKING CHANGE: ${breaking}`

  if (footer)
    result += footer
  return result
}

export function generateMessage(answers: Answers,
  options: CommitizenGitOptions,
  colorize = false) {
  const wrapOptions = {
    breaklineChar: options.breaklineChar || '|',
    trim: true,
    newLine: '\n',
    indent: '',
    width: options.breaklineNumber,
  }
  // resolve custom value
  const { customScope, customFooterPrefix } = answers
  answers.scope = getCustomValue(answers.scope, customScope)
    || (options.defaultScope?.startsWith('___CUSTOM___:') && customScope)
    || ''
  answers.footerPrefix = getCustomValue(answers.footerPrefix, customFooterPrefix) as string
  // resolve single | multiple item
  const { singleScope, singeIssuePrefix } = getSingleParams(answers, options)
  const scopeSource = Array.isArray(answers.scope)
    ? answers.scope.join(options.scopeEnumSeparator)
    : answers.scope

  const type = addType(answers.type ?? '', colorize)
  const emoji = getEmojiCode(answers.type || '', options)
  const scope = addScope(singleScope || scopeSource, colorize)
  const markBreaking = addBreakchangeMark(answers.markBreaking, colorize)
  const subject = addSubject(answers.subject, colorize, options.themeColorCode)

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

/** Section: OpenAI */
// Power By and Modified part of the code: https://github.com/Nutlope/aicommits
export async function generateAISubjects(
  answers: Answers,
  options: CommitizenGitOptions,
) {
  // TODO: Accounting for GPT-3's input req of 4k tokens (approx 8k chars)
  const diffIgnore = options.aiDiffIgnore?.map(i => `:(exclude)${i}`) || []
  const diffOpts = process.env.CZ_ALL_CHANGE_MODE === '1'
    ? ['HEAD']
    : ['--cached', '.']
  const diff = spawnSync('git', ['diff', ...diffOpts, ...diffIgnore],
    { encoding: 'utf8' },
  ).stdout.trim().slice(0, 7800)

  const maxSubjectLength = getMaxSubjectLength(answers.type, options.defaultScope, options)
  let prompt
  if (typeof options.aiQuestionCB === 'function') {
    prompt = options.aiQuestionCB({
      type: answers.type,
      defaultScope: options.defaultScope,
      upperCaseSubject: options.upperCaseSubject,
      maxSubjectLength,
      diff,
    })
  }
  else {
    prompt = generateSubjectDefaultPrompt({
      type: answers.type,
      defaultScope: options.defaultScope,
      upperCaseSubject: options.upperCaseSubject,
      maxSubjectLength,
      diff,
    })
  }
  return await fetchOpenAIMessage(options, prompt)
}

function generateSubjectDefaultPrompt(
  { maxSubjectLength, diff }: GenerateAIPromptType,
) {
  if (!maxSubjectLength || maxSubjectLength === Infinity || maxSubjectLength > 90)
    maxSubjectLength = 65

  return `Write an insightful and concise Git commit message in the present tense for the following Git diff code, without any prefixes. Note that this sentence must never exceed ${maxSubjectLength} characters in length!! : \n\`\`\`diff\n${diff}\n\`\`\``
}
/** EndSection: */
