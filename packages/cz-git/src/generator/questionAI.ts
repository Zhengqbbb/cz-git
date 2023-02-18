/**
 * @description: generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { fuzzyFilter } from '@cz-git/inquirer'
import type { Answers, CommitizenGitOptions } from '../shared'
import {
  log,
  parseStandardScopes,
  previewMessage,
  resolveListItemPinTop,
} from '../shared'
import { generateMessage } from './message'

export const generateAITypesQuestions = (options: CommitizenGitOptions) => {
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

export const generateAISubjectsQuestions = (options: CommitizenGitOptions, subjects: string[]) => {
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

export const generateAIConfirmQuestions = (options: CommitizenGitOptions, answers: Answers) => {
  return [
    {
      type: 'expand',
      name: 'confirmCommit',
      choices: [
        { key: 'y', name: 'Yes', value: 'yes' },
        { key: 'n', name: 'Abort commit', value: 'no' },
        { key: 'e', name: 'Edit message(wq: save, cq: exit)', value: 'edit' },
      ],
      default: 0,
      message() {
        previewMessage(
          generateMessage(answers, options, options.confirmColorize),
          options.confirmColorize,
        )
        return options.messages?.confirmCommit
      },
    },
  ]
}
