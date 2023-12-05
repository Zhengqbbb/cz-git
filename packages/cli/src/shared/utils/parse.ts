import type { ParsedArgs } from 'minimist'
import minimist from 'minimist'
import type { CzgitFlagList, CzgitParseArgs } from '../types'

const ___GIT_COMMIT_OPTIONS = [
  '-F', '--file',
  '--author',
  '--date',
  '-m', '--message',
  '-c', '--reedit-message',
  '-C', '--reuse-message',
  '--fixup',
  '--squash',
  '--trailer',
  '-t', '--template',
  '--cleanup',
  '--pathspec-from-file',
]

function deleteItem(target: string, list: string[]) {
  return list.splice(list.indexOf(target), ~list.indexOf(target) ? 1 : 0)
}

function resovleFlag(
  argv: ParsedArgs,
  flag: string,
  aliasFlag: CzgitFlagList,
  target: CzgitParseArgs,
) {
  if (!argv[flag] && !argv[aliasFlag])
    return target
  if (!target.czgitArgs.flag)
    target.czgitArgs.flag = {}

  target.czgitArgs.flag[aliasFlag] = argv[aliasFlag]
  if (typeof argv[aliasFlag] === 'boolean') {
    deleteItem(`-${flag}`, target.gitArgs)
    deleteItem(`--${aliasFlag}`, target.gitArgs)
  }
  else {
    const filterRexFlag = new RegExp(`^-${flag}=(.*)$`, 'gi')
    const filterRexAlias = new RegExp(`^--${aliasFlag}=(.*)$`, 'gi')
    target.gitArgs = target.gitArgs
      .filter(value => !filterRexFlag.test(value) && !filterRexAlias.test(value))
  }
  return target
}

function resovleReverseFlag(
  argv: ParsedArgs,
  targetFlag: string,
  flag: CzgitFlagList,
  target: CzgitParseArgs,
) {
  if (argv[flag] === undefined || !target.gitArgs.includes(targetFlag))
    return target
  if (!target.czgitArgs.flag)
    target.czgitArgs.flag = {}

  if (typeof argv[flag] === 'boolean' && argv[flag] === false)
    target.czgitArgs.flag[flag] = argv[flag]

  deleteItem(targetFlag, target.gitArgs)
  return target
}

function resovleAlias(arg: string, target: CzgitParseArgs) {
  if (arg.startsWith(':')) {
    if (!target.czgitArgs.flag)
      target.czgitArgs.flag = { alias: '' }

    target.czgitArgs.flag.alias = arg.slice(1)
    deleteItem(arg, target.gitArgs)
  }
  return target
}

function resovleSearchKeyword(arg: string, target: CzgitParseArgs) {
  if (!arg.startsWith('-')) {
    target.czgitArgs.keyword = arg
    deleteItem(arg, target.gitArgs)
  }

  return target
}

/**
 * resovle process.argv by minimist
 * @param {ParsedArgs} argv
 * @return {CzgitParseArgs} czgit parsed args
 */
export function resovleArgs(argv: string[]): CzgitParseArgs {
  argv = argv.map(v => v.replace(/^-ai$/, '--ai').replace(/^-cb$/, '--checkbox'))
  const parseArgv = minimist(argv, {
    boolean: [
      'ai',
      'break',
      'checkbox',
      'emoji',
      'retry',
    ],
    alias: {
      b: 'break',
      E: 'emoji',
      v: 'version',
      h: 'help',
      r: 'retry',
      N: 'ai-num',
    },
  })

  let result: CzgitParseArgs = {
    czgitArgs: {
      flag: null,
      keyword: '',
    },
    gitArgs: argv,
  }

  if (argv.length !== 0) {
    for (let i = 0; i < argv.length; i++) {
      // resolve git options
      if (___GIT_COMMIT_OPTIONS.includes(argv[i])) {
        i++
        continue
      }

      // resolve alias and keyword
      if (!argv[i].startsWith(':'))
        result = resovleSearchKeyword(argv[i], result)
      else
        result = resovleAlias(argv[i], result)
    }
  }

  // resolve flag
  result = resovleFlag(parseArgv, 'h', 'help', result)
  result = resovleFlag(parseArgv, 'r', 'retry', result)
  result = resovleFlag(parseArgv, 'b', 'break', result)
  result = resovleFlag(parseArgv, 'cb', 'checkbox', result)
  result = resovleFlag(parseArgv, 'E', 'emoji', result)
  result = resovleFlag(parseArgv, 'N', 'ai-num', result)
  result = resovleFlag(parseArgv, 'ai', 'ai', result)
  result = resovleFlag(parseArgv, 'openai-token', 'openai-token', result) // @deprecated => api-key
  result = resovleFlag(parseArgv, 'api-key', 'api-key', result)
  result = resovleFlag(parseArgv, 'api-endpoint', 'api-endpoint', result)
  result = resovleFlag(parseArgv, 'api-proxy', 'api-proxy', result)
  result = resovleFlag(parseArgv, 'unset-proxy', 'unset-proxy', result)
  result = resovleFlag(parseArgv, 'version', 'version', result)
  result = resovleFlag(parseArgv, 'hook', 'hook', result)
  result = resovleFlag(parseArgv, 'config', 'config', result)
  result = resovleFlag(parseArgv, 'alias', 'alias', result)
  result = resovleReverseFlag(parseArgv, '--no-ai', 'ai', result)

  return result
}

// export function resovleSubCmd(arg: string, cmd: CzgitSubCommandList, target: CzgitParseArgs) {
export function resovleSubCmd(arg: string, cmd: any, target: any) {
  if (arg !== cmd)
    return target
  if (!target.czgitArgs.subCommand)
    target.czgitArgs.subCommand = {}

  target.czgitArgs.subCommand[cmd] = true
  deleteItem(cmd, target.gitArgs)
  return target
}
