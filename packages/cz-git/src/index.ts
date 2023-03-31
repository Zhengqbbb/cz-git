/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

import { CompleteInput, SearchCheckbox, SearchList } from '@cz-git/inquirer'
import { configLoader } from '@cz-git/loader'
import { editCommit, log, previewMessage } from './shared'
import { generateAIPrompt, generateMessage, generateOptions, generateQuestions, getAliasMessage } from './generator'
import type { Answers, CommitizenGitOptions, CommitizenType } from './shared'

export * from './shared/types'
export * from '@cz-git/inquirer'
export * from '@cz-git/loader'

export function prompter(
  cz: CommitizenType,
  commit: (message: string) => void,
  configPath?: string,
) {
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
    if (options.useAI)
      answers = await generateAIPrompt(options, cz)
    else
      answers = await cz.prompt(generateQuestions(options, cz))

    answers = await generateConfirmPrompt(options, cz, answers)

    await confirmMessage(options, cz, answers, commit)
  })
}

async function generateConfirmPrompt(options: CommitizenGitOptions, cz: CommitizenType, answers: Answers) {
  const result = answers
  if (options.skipQuestions?.includes('confirmCommit')) {
    previewMessage(
      generateMessage(answers, options, options.confirmColorize),
      options.confirmColorize,
    )
    result.confirmCommit = 'yes'
  }
  else {
    const question: any = [
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
    if (options.useAI)
      question[0].choices.push({ key: 'm', name: 'Modify and additional message with prompt', value: 'ai-modify' })

    const { confirmCommit } = await cz.prompt(question)
    result.confirmCommit = confirmCommit
  }

  return result
}

async function confirmMessage(options: CommitizenGitOptions, cz: CommitizenType, answers: Answers, commit: (message: string) => void) {
  switch (answers.confirmCommit) {
    case 'edit':
      editCommit(answers, options, commit)
      break

    case 'ai-modify': {
      options.defaultType = answers.type
      options.defaultSubject = answers.subject
      let question = generateQuestions(options, cz)
      if (question) {
        question.shift()
        const scopeIdx = 2
        question = [question[scopeIdx], ...question.slice(0, scopeIdx), ...question.slice(scopeIdx + 1)]
      }
      answers = await cz.prompt(question)

      options.useAI = false
      answers.type = options.defaultType
      answers = await generateConfirmPrompt(options, cz, answers)
      confirmMessage(options, cz, answers, commit)
      break
    }

    case 'yes':
      commit(generateMessage(answers, options))
      break

    default:
      log('info', 'Commit has been canceled.')
      break
  }
}
