#!/usr/bin/env node
import { czg, generateHelp, setupOpenAIToken } from './generator'
import { resovleArgs } from './shared'

process.on('uncaughtException', (err) => {
  console.error(err.message || err)
  process.exit(1)
})

// catch SIGINT signal like control+c
process.stdin.on('data', (key: any) => {
  // eslint-disable-next-line eqeqeq
  if (key == '\u0003')
    process.exit(130) // 128 + SIGINT
})

/**
 * Main CLI Enter Point
 * @param environment use debug mode
 * @param {string[]} argv  Node.js process
 */
export const bootsrap = (environment: any = {}, argv = process.argv) => {
  const commandArgs = argv.slice(2, argv.length)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const czgitVersion = require('../package.json').version
  const parsedArgs = resovleArgs(commandArgs)

  if (!parsedArgs.czgitArgs.subCommand && !parsedArgs.czgitArgs.flag) {
    czg(czgitVersion, parsedArgs, environment)
    return
  }

  if (!parsedArgs.czgitArgs.subCommand) {
    if (parsedArgs.czgitArgs.flag?.help) {
      generateHelp(czgitVersion)
    }
    else if (parsedArgs.czgitArgs.flag?.['openai-token']) {
      setupOpenAIToken(parsedArgs.czgitArgs.flag?.['openai-token'])
      process.exit(0)
    }
    else if (parsedArgs.czgitArgs.flag?.version) {
      console.log(czgitVersion)
      process.exit(0)
    }
  }
  else if (parsedArgs.czgitArgs.subCommand.init) {
    // TODO: init
    console.log('init')
    process.exit(0)
  }

  if (parsedArgs.gitArgs.includes('-a') || parsedArgs.gitArgs.includes('--all'))
    process.env.CZ_ALL_CHANGE_MODE = '1'

  czg(czgitVersion, parsedArgs, environment)
}

bootsrap()
