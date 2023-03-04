/**
 * @description: generate commit message(generateMessage)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */
import { spawnSync } from 'child_process'
import url from 'url'
import { style } from '@cz-git/inquirer'
// @ts-expect-error
import fetch from 'node-fetch'
import HttpsProxyAgent from 'https-proxy-agent'
import { getCurrentScopes, getMaxSubjectLength, isSingleItem, log, parseAISubject, parseStandardScopes, wrap } from '../shared'
import type { Answers, CommitizenGitOptions, GenerateAIPromptType } from '../shared'
import { APIError } from './error'

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

async function fetchOpenAIMessage(options: CommitizenGitOptions, prompt: string) {
  const payload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
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
  // https://platform.openai.com/docs/api-reference/chat/create
  const httpProxy = options.apiProxy || process.env.https_proxy || process.env.all_proxy || process.env.ALL_PROXY || process.env.http_proxy
  let agent: any
  if (httpProxy) {
    // eslint-disable-next-line n/no-deprecated-api
    const proxyUrl = url.parse(httpProxy)
    // @ts-expect-error
    agent = new HttpsProxyAgent(proxyUrl)
    agent.path = agent?.pathname
  }
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      agent,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.openAIToken}`,
      },
      method: 'POST',
      body: JSON.stringify(payload),
      timeout: 10 * 1000,
    })
    if (
      !response.status
      || response.status < 200
      || response.status > 299
    ) {
      const errorJson: any = await response.json()
      throw new APIError(errorJson?.error?.message, response.status)
    }
    const json: any = await response.json()
    return json.choices.map((r: any) => parseAISubject(options, r?.message?.content))
  }
  catch (err: any) {
    let errorMsg = 'Fetch OpenAI API message failure'
    if (err instanceof APIError) {
      errorMsg += `The response HTTP Code: ${err.code}`
      if (err.code === 500)
        errorMsg += '; Check the API status: https://status.openai.com'
    }

    if (err.type === 'request-timeout')
      errorMsg += `. ${style.bold(style.underline('Request Timeout'))} \n${style.yellow('[tip]>>>: If your country is unable to request the OpenAI API.\nCLI support for using http proxy like \`http_proxy\`, \`all_proxy\`.\nOr setup proxy e.g')} ${style.cyan('\`npx czg --api-proxy="http://127.0.0.1:1088"\`')}`

    log('err', errorMsg)
    throw new Error(err.message)
  }
}

function generateSubjectDefaultPrompt(
  { maxSubjectLength, diff }: GenerateAIPromptType,
) {
  if (!maxSubjectLength || maxSubjectLength === Infinity || maxSubjectLength > 90)
    maxSubjectLength = 65

  return `Write an insightful and concise Git commit message in the present tense for the following Git diff code, without any prefixes. Note that this sentence should never exceed ${maxSubjectLength} characters in length.: \n\`\`\`diff\n${diff}\n\`\`\``
}
/** EndSection: */
