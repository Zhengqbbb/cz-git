/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

import { CompleteInput, SearchCheckbox, SearchList } from '@cz-git/inquirer'
import { configLoader } from '@cz-git/loader'
import { editCommit, log } from './shared'
import { generateMessage, generateOptions, generateQuestions, getAliasMessage } from './generator'
import type { CommitizenType } from './shared'

export * from './shared/types'
export * from '@cz-git/inquirer'
export * from '@cz-git/loader'

export const prompter = (
  cz: CommitizenType,
  commit: (message: string) => void,
  configPath?: string,
) => {
  configLoader({ configPath }).then((config) => {
    const options = generateOptions(config)

    if ('cz_alias' in process.env) {
      commit(getAliasMessage(options, process.env.cz_alias))
      return
    }

    const questions = generateQuestions(options, cz)
    cz.registerPrompt('search-list', SearchList)
    cz.registerPrompt('search-checkbox', SearchCheckbox)
    cz.registerPrompt('complete-input', CompleteInput)
    cz.prompt(questions).then((answers) => {
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
  })
}
