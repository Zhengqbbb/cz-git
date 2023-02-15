/**
 * @description: generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { execSync } from 'child_process'
// @ts-expect-error
import fetch from 'node-fetch'
import { fuzzyFilter } from '@cz-git/inquirer'
import type { Answers, CommitizenGitOptions } from '../shared'
import {
  getMaxSubjectLength,
  log,
  previewMessage,
  resolveListItemPinTop,
} from '../shared'
import { generateMessage } from './message'

async function generateCommitMessage(prompt: string) {
  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: false,
    n: 1,
  }
  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.CZ_OPENAI_TOKEN ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  if (response.status !== 200) {
    const errorJson: any = await response.json()
    throw new Error(
      `OpenAI API failed while processing the request '${errorJson?.error?.message}'`,
    )
  }

  const json: any = await response.json()
  const aiCommit = json.choices[0].text
  return aiCommit.replace(/(\r\n|\n|\r)/gm, '')
}

export const generateAIQuestions = (options: CommitizenGitOptions, cz: any) => {
  if (!Array.isArray(options.types) || options.types.length === 0) {
    if (!process.env.VITEST)
      log('err', 'Error [types] Option')
    console.log(typeof cz)
    return false
  }

  return [
    {
      type: 'search-list',
      name: 'type',
      message: options.messages?.type,
      themeColorCode: options?.themeColorCode,
      source: (_: unknown, input: string) => {
        const typeSource = resolveListItemPinTop(
          options.types?.concat(options.typesAppend || []) || [],
          options.defaultType,
        )
        const searchTarget = options.typesSearchValue
          ? 'value'
          : 'name'
        return fuzzyFilter(input, typeSource, searchTarget)
      },
    },
    {
      type: 'expand',
      name: 'confirmCommit',
      choices: [
        { key: 'y', name: 'Yes', value: 'yes' },
        // { key: 'e', name: 'Edit commit', value: 'edit' },
        // { key: 'r', name: 'Retry generate', value: 'retry' },
        { key: 'n', name: 'Abort commit', value: 'no' },
      ],
      default: 0,
      async message(answers: Answers) {
        // Power By: https://github.com/Nutlope/aicommits
        const aiAnswers = answers
        // TODO: Accounting for GPT-3's input req of 4k tokens (approx 8k chars)
        const diff = execSync(
          'git diff --cached . ":(exclude)package-lock.json" ":(exclude)yarn.lock" ":(exclude)pnpm-lock.yaml"',
          {
            encoding: 'utf8',
          },
        ).slice(0, 3900)
        let maxSubjectLen = getMaxSubjectLength(answers.type, options.defaultScope, options)
        if (maxSubjectLen === Infinity)
          maxSubjectLen = 75
        const scopeText = options.defaultScope ? `The commit message scope is "${options.defaultScope}."` : ''
        const startCaseText = options.upperCaseSubject ? 'start with a capital letter' : 'start with a lowercase letter'
        const prompt = `I want you to write a git commit message and follow Conventional Commits, It is currently known that the type of The commit message is "${answers.type}",${scopeText} And I will input you a git diff output, your job is to give me conventional commit subject that is short description mean do not preface the commit with type and scope. Without adding any preface the commit with anything! Using present tense, return a complete sentence, don't repeat yourself. Some procedural abbreviations are allowed. Allow program abbreviations. The result must be control in ${maxSubjectLen} words! And ${startCaseText} ! Now enter part of the git diff code for you: \`\`\`diff\n${diff}\n\`\`\``
        const upperCaseSubject = options.upperCaseSubject || false
        const subject = await generateCommitMessage(prompt)
        aiAnswers.subject = (upperCaseSubject ? subject.charAt(0).toUpperCase() : subject.charAt(0).toLowerCase()) + subject.slice(1)

        previewMessage(
          generateMessage(aiAnswers, options, options.confirmColorize),
          options.confirmColorize,
        )
        return options.messages?.confirmCommit
      },
    },
  ].filter(
    i =>
      !options.skipQuestions?.includes(
        i.name as 'scope' | 'body' | 'breaking' | 'footer' | 'footerPrefix' | 'confirmCommit',
      ),
  )
}

type GenerateAIQuestionsType = typeof generateAIQuestions
export type AIQuestionsType = ReturnType<GenerateAIQuestionsType>
