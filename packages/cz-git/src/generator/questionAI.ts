/**
 * @description: generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { fuzzyFilter, style } from '@cz-git/inquirer'
import type { CommitizenGitOptions, CommitizenType } from '../shared'
import {
  isString,
  log,
  parseStandardScopes,
  resolveListItemPinTop,
} from '../shared'
import { generateAISubjects } from './message'

export async function generateAIPrompt(options: CommitizenGitOptions, cz: CommitizenType) {
  const answers = await cz.prompt(generateAITypesQuestions(options))
  console.log(style.green('ℹ'), style.bold(options.messages!.generatingByAI))
  const subjects = await generateAISubjects(answers, options)
  if (!Array.isArray(subjects))
    throw new Error('subjects fetch value failed')

  if (subjects.length === 1) {
    answers.subject = subjects[0]
  }
  else {
    const { subject } = await cz.prompt(generateAISubjectsQuestions(options, subjects))
    answers.subject = subject
  }

  if (isString(options.defaultScope) && options.defaultScope)
    answers.scope = options.defaultScope
  return answers
}

function generateAITypesQuestions(options: CommitizenGitOptions) {
  if (!Array.isArray(options.types) || options.types.length === 0) {
    if (!process.env.VITEST)
      log('err', 'Error [types] Option')
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
  ]
}

function generateAISubjectsQuestions(options: CommitizenGitOptions, subjects: string[]) {
  return [
    {
      type: 'search-list',
      name: 'subject',
      message: options.messages?.generatedSelectByAI,
      themeColorCode: options?.themeColorCode,
      source: (_: unknown, input: string) => {
        return fuzzyFilter(input, parseStandardScopes(subjects))
      },
    },
  ]
}
