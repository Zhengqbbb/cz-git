/**
 * @description: generate commit message(generateMessage)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */
import { spawnSync } from 'child_process'
import { style } from '@cz-git/inquirer'
// @ts-expect-error
import fetch from 'node-fetch'
import { getCurrentScopes, getMaxSubjectLength, isSingleItem, log, parseAISubject, parseStandardScopes, wrap } from '../shared'
import type { Answers, CommitizenGitOptions, GenerateAIPromptType } from '../shared'

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

  if (isSingleItem(options.allowCustomIssuePrefix, options.allowEmptyIssuePrefix, options.issuePrefixes))
    mapping.singeIssuePrefix = options.issuePrefixes?.[singleIndex].value || ''

  return mapping
}

const getCustomValue = (originVal?: string | string [], customVal?: string) => {
  if (Array.isArray(originVal))
    return originVal
  return originVal !== '___CUSTOM___' ? (originVal || '') : (customVal || '')
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
  return (Boolean(markBreaking) || Boolean(process.env.break === '1')) ? mark : ''
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
  const { customScope, customFooterPrefix } = answers
  answers.scope = getCustomValue(answers.scope, customScope)
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

/** Section: OpenAI */
// Power By and Modified part of the code: https://github.com/Nutlope/aicommits
export async function generateAISubjects(
  answers: Answers,
  options: CommitizenGitOptions,
) {
  // TODO: Accounting for GPT-3's input req of 4k tokens (approx 8k chars)
  const diffIgnore = options.aiDiffIgnore?.map(i => `:(exclude)${i}`) || []
  const diff = spawnSync('git',
    ['diff', '--cached', '.', ...diffIgnore],
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

async function fetchOpenAIMessage(options: CommitizenGitOptions, prompt: string) {
  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: false,
    n: options.aiNumber || 1,
  }
  if (!options.openAIToken) {
    log('err', `NO Found OpenAI Token, Please use setup command ${style.cyan('`npx -y czg --openai-token="sk-XXXX"`')}`)
    throw new Error('See guide page: https://cz-git.qbb.sh/recipes/openai#setup-openai-token')
  }
  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${options.openAIToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (response.status !== 200) {
    const errorJson: any = await response.json()
    log('err', 'Fetch OpenAI API message failed')
    throw new Error(errorJson?.error?.message)
  }

  const json: any = await response.json()
  return json.choices.map((r: any) => parseAISubject(options, r.text))
}

function generateSubjectDefaultPrompt(
  { type, defaultScope, maxSubjectLength, upperCaseSubject, diff }: GenerateAIPromptType,
) {
  const scopeText = defaultScope ? `The commit message scope is "${defaultScope}."` : ''
  const startCaseText = upperCaseSubject ? 'start with a capital letter' : 'start with a lowercase letter'
  if (maxSubjectLength === Infinity)
    maxSubjectLength = 75

  return `I want you to write a git commit message and follow Conventional Commits, It is currently known that the type of The commit message is "${type}",${scopeText} And I will input you a git diff output, your job is to give me conventional commit subject that is short description mean do not preface the commit with type and scope. Without adding any preface the commit with anything! Using present tense, return a complete sentence, don't repeat yourself. Allow program abbreviations. The result must be control in ${maxSubjectLength} words! And ${startCaseText} ! Now enter part of the git diff code for you: \`\`\`diff\n${diff}\n\`\`\``
}
/** EndSection: */
