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
    'config'?: string
    /** option: --alias="xxx" */
    'alias'?: string
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
    /** option: --unset-proxy */
    'unset-proxy'?: boolean
    /** option: --reback|-b */
    'reback'?: boolean
    /** option: --retry|-r */
    'retry'?: boolean
    /** option: --hook, provide husky */
    'hook'?: boolean
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
 * @description provide czgit parsed Args
 */
export interface CzgitParseArgs {
    czgitArgs: {
        flag: (CzgitCommonFlag & CzgitFlag & InitFlag) | null
        subCommand: CzgitSubCommand | null
    }
    gitArgs: string[]
}
