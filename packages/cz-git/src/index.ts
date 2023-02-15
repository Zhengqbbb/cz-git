/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

import { CompleteInput, SearchCheckbox, SearchList, style } from '@cz-git/inquirer'
import { configLoader } from '@cz-git/loader'
import { editCommit, log, previewMessage } from './shared'
import { generateAIConfirmQuestions, generateAISubjects, generateAISubjectsQuestions, generateAITypesQuestions, generateMessage, generateOptions, generateQuestions, getAliasMessage } from './generator'
import type { CommitizenType } from './shared'

export * from './shared/types'
export * from '@cz-git/inquirer'
export * from '@cz-git/loader'

export const prompter = (
  cz: CommitizenType,
  commit: (message: string) => void,
  configPath?: string,
) => {
  configLoader({ configPath }).then(async (config) => {
    const options = generateOptions(config)

    if (options.useCommitSignGPG)
      process.env.CzCommitSignGPG = '1'
    if ('cz_alias' in process.env) {
      commit(getAliasMessage(options, process.env.cz_alias))
      return
    }

    cz.registerPrompt('search-list', SearchList)
    cz.registerPrompt('search-checkbox', SearchCheckbox)
    cz.registerPrompt('complete-input', CompleteInput)

    let answers
    if (options.useAI) {
      answers = await cz.prompt(generateAITypesQuestions(options))
      console.log(style.green('ℹ'), style.bold('Generating your AI commit subject...'))
      // Power By and Modified part of the code: https://github.com/Nutlope/aicommits
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

      if (options.defaultScope)
        answers.scope = options.defaultScope
    }
    else {
      const questions = generateQuestions(options, cz)
      answers = await cz.prompt(questions)
    }

    if (options.skipQuestions?.includes('confirmCommit')) {
      commit(generateMessage(answers, options))
      previewMessage(
        generateMessage(answers, options, options.confirmColorize),
        options.confirmColorize,
      )
      return 0
    }
    else {
      // @ts-expect-error
      const { confirmCommit } = await cz.prompt(generateAIConfirmQuestions(options, answers))
      answers.confirmCommit = confirmCommit
    }
    switch (answers.confirmCommit) {
      case 'edit':
        editCommit(answers, options, commit)
        break

      case 'yes':
        commit(generateMessage(answers, options))
        break

      default:
        log('info', 'Commit has been canceled.')
        break
    }
  })
}
