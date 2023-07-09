import url from 'node:url'
import { style } from '@cz-git/inquirer'
import HttpsProxyAgent from 'https-proxy-agent'

// @ts-expect-error
import fetch from 'node-fetch'
import { log } from '../shared'
import type { CommitizenGitOptions } from '../shared'

export async function fetchOpenAIMessage(options: CommitizenGitOptions, prompt: string) {
  if (!options.openAIToken) {
    log('err', `Not Found OpenAI API Key, Please use setup command ${style.cyan('`npx -y czg --api-key="sk-XXXX"`')}`)
    throw new Error('See guide page: https://cz-git.qbb.sh/recipes/openai#setup-openai-token')
  }

  const aiContext = useModelStrategy(options, prompt)

  const httpProxy = options.apiProxy || process.env.https_proxy || process.env.all_proxy || process.env.ALL_PROXY || process.env.http_proxy
  let agent: any
  if (httpProxy) {
    const proxyUrl = url.parse(httpProxy)
    // @ts-expect-error
    agent = new HttpsProxyAgent(proxyUrl)
    agent.path = agent?.pathname
  }
  try {
    const response = await fetch(aiContext.url, {
      agent,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${options.openAIToken}`,
      },
      method: 'POST',
      body: JSON.stringify(aiContext.payload),
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
    return json.choices.map((r: any) => parseAISubject(options, aiContext.parseFn(r)))
  }
  catch (err: any) {
    let errorMsg = 'Fetch OpenAI API message failure'
    if (err instanceof APIError) {
      errorMsg += `The response HTTP Code: ${err.code}`
      if (err.code === 500)
        errorMsg += '; Check the API status: https://status.openai.com'
    }

    if (err.type === 'request-timeout')
      errorMsg += `. ${style.bold(style.underline('Request Timeout'))} \n${style.yellow('[tip]>>>: If your country is unable to request the OpenAI API.\nCLI support for using http proxy like \`http_proxy\`, \`all_proxy\`.\nOr setup proxy e.g')} ${style.cyan('\`npx czg --api-proxy="http://127.0.0.1:1080"\`')}`

    log('err', errorMsg)
    throw new Error(err.message)
  }
}

// https://platform.openai.com/docs/api-reference/chat/create
function useModelStrategy(options: CommitizenGitOptions, prompt: string) {
  switch (options.aiType) {
    case 'openAI-Davinci':
      return {
        payload: {
          model: 'text-davinci-003',
          prompt,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 200,
          stream: false,
          n: options.aiNumber || 1,
        },
        url: `${options.apiEndpoint}/completions`,
        parseFn: (res: any) => res?.text,
      }

    default:
      return {
        payload: {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          max_tokens: 200,
          stream: false,
          n: options.aiNumber || 1,
        },
        url: `${options.apiEndpoint}/chat/completions`,
        parseFn: (res: any) => res?.message?.content,
      }
  }
}

function parseAISubject(options: CommitizenGitOptions, subject?: string) {
  if (!subject)
    return ''

  subject = subject.replace(/(\r\n|\n|\r)/gm, '').replace(/[\.。]$/, '')
  let res = subject
  if (options.upperCaseSubject)
    res = res.charAt(0).toUpperCase()
  else
    res = res.charAt(0).toLowerCase()
  res = res + subject.slice(1)

  return res
}

class APIError extends Error {
  public code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'APIError'
    this.code = code
  }
}
