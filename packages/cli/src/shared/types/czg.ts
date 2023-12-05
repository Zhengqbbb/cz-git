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
  | 'api-key'
  | 'api-endpoint'
  | 'api-proxy'
  | 'unset-proxy'
  | 'ai'
  | 'break'
  | 'emoji'
  | 'checkbox'

export interface CzgitCommonFlag {
  /** option: --version|-v */
  version?: boolean
  /** option: --help|-h */
  help?: boolean
  /** option: --ai|-ai --no-ai */
  ai?: boolean
  /** option: -b|--break */
  break?: boolean
  /** option: -cb|--checkbox */
  checkbox?: boolean
  /** option: -E|--emoji */
  emoji?: boolean
  /** option: --retry|-r */
  retry?: boolean
  /** TODO: option: --reback */
  reback?: boolean
  /** option: --hook, provide husky */
  hook?: boolean
  /** option: --unset-proxy */
  'unset-proxy'?: boolean
}

export interface CzgitFlag {
  /** option: --config="xxx" */
  config?: string
  /** option: --alias="xxx" */
  alias?: string
  /** @deprecated use `api-key` */
  'openai-token'?: string
  /** option: --ai-num="xxx" */
  'ai-num'?: string
  /** option: --api-key="xxx" */
  'api-key'?: string
  /** option: --api-proxy="xxx" */
  'api-proxy'?: string
  /** option: --api-endpoint="xxx" */
  'api-endpoint'?: string
}

export interface InitFlag { // TODO:
  /** option: --yes|-y */
  yes?: boolean
  /** option: --init */
  init?: boolean
}

/**
 * @description: provide czgit parsed Args
 */
export interface CzgitParseArgs {
  czgitArgs: {
    flag: (CzgitCommonFlag & CzgitFlag & InitFlag) | null
    keyword: string
  }
  gitArgs: string[]
}
