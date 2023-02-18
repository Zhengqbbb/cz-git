export type CzgitFlagList =
  | 'config'
  | 'version'
  | 'help'
  | 'reback'
  | 'retry'
  | 'yes'
  | 'hook'
  | 'alias'
  | 'ai-num'
  | 'openai-token'
  | 'ai'

export interface CzgitCommonFlag {
  /** option: --version|-v */
  version?: boolean
  /** option: --help|-h */
  help?: boolean
  /** option: --no-ai */
  ai?: boolean
}

export interface CzgitFlag {
  /** option: --config="xxx" */
  config?: string
  /** option: --openai-token="xxx" */
  'openai-token'?: string
  /** option: --alias="xxx" */
  alias?: string
  /** option: --ai-num="xxx" */
  'ai-num'?: string
  /** option: --reback|-b */
  reback?: boolean
  /** option: --retry|-r */
  retry?: boolean
  /** option: --hook, provide husky */
  hook?: boolean
}

export interface InitFlag {
  /** option: --yes|-y */
  yes?: boolean
}

export type CzgitSubCommandList = 'init' | 'emoji' | 'ai' | 'checkbox' | 'break' | 'gpg'
export interface CzgitSubCommand {
  /** option: init */
  init?: boolean
  /** subcmd: emoji */
  ai?: boolean
  /** subcmd: emoji */
  emoji?: boolean
  /** subcmd: checkbox */
  checkbox?: boolean
  /** subcmd: break */
  break?: boolean
  /** subcmd: gpg */
  gpg?: boolean
}

/**
 * @description: provide czgit parsed Args
 */
export interface CzgitParseArgs {
  czgitArgs: {
    flag: (CzgitCommonFlag & CzgitFlag & InitFlag) | null
    subCommand: CzgitSubCommand | null
  }
  gitArgs: string[]
}
