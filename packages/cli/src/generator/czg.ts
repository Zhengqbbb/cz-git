import type { CommitizenType } from 'cz-git'
import { prompter, style } from 'cz-git'
import inquirer from 'inquirer'
import { getGitRootPath, injectEnvFlag, injectEnvValue, isGitClean } from '../shared'
import type { CzgitParseArgs } from '../shared'
import { commit } from './commit'

/**
 * start inquirer prompts to commit message
 */
export const czg = (version: string, argvs: CzgitParseArgs, environment: any = {}) => {
  const shouldStageAllFiles = argvs.gitArgs.includes('-a') || argvs.gitArgs.includes('--all')

  isGitClean(
    process.cwd(),
    (error, isClean) => {
      if (error)
        throw error

      if (isClean && !argvs.gitArgs.includes('--allow-empty')) {
        const newLocal = '`git add`'
        throw new Error(
          `${style.yellow('>>> No files added to staging! Did you forget to run')} ${style.cyan(
            newLocal,
          )} ?`,
        )
      }
      injectEnvFlag('break', argvs.czgitArgs.subCommand?.break)
      injectEnvFlag('czai', argvs.czgitArgs.subCommand?.ai)
      injectEnvFlag('emoji', argvs.czgitArgs.subCommand?.emoji)
      injectEnvFlag('checkbox', argvs.czgitArgs.subCommand?.checkbox)
      injectEnvFlag('CzCommitSignGPG', argvs.czgitArgs.subCommand?.gpg)
      injectEnvValue('cz_alias', argvs.czgitArgs.flag?.alias)

      console.log(`czg@${version}\n`)
      // commit
      commit(
        inquirer as CommitizenType,
        getGitRootPath(),
        prompter,
        {
          args: argvs.gitArgs,
          disableAppendPaths: true,
          emitData: true,
          quiet: false,
          retryLastCommit: argvs.czgitArgs.flag?.retry || false,
          rebackLastCommit: argvs.czgitArgs.flag?.reback || false,
          hookMode: argvs.czgitArgs.flag?.hook || false,
          environment,
          configPath: argvs.czgitArgs.flag?.config || undefined,
        },
        (error) => {
          if (error)
            throw error
        },
      )
    },
    shouldStageAllFiles,
  )
}
