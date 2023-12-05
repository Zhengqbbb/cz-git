/**
 * @description: cz-git types
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */
import type { QuestionsType } from '../../generator'
import type { CommitlintUserConfig } from './commitlint'

export interface UserConfig extends CommitlintUserConfig {
  prompt?: CommitizenGitOptions
}

export type Config = Omit<Partial<typeof defaultConfig>, 'scopes'> & {
  scopes: ScopesType
  disableScopeLowerCase?: boolean
  disableSubjectLowerCase?: boolean
  maxHeaderLength?: number
  maxSubjectLength?: number
  minSubjectLength?: number
  defaultScope?: string | string[]
  defaultSubject?: string
  defaultBody?: string
  defaultFooterPrefix?: string
  defaultIssues?: string
}

export interface Answers {
  /**
   * @default "Select the type of change that you're committing:"
   */
  type?: string
  /**
   * @default 'Denote the SCOPE of this change (optional):'
   */
  scope?: string | string[]
  /**
   * @default 'Denote the SCOPE of this change:'
   */
  customScope?: string
  /**
   * @default 'Write a SHORT, IMPERATIVE tense description of the change:\n'
   */
  subject?: string
  /**
   * @default 'a LONGER description of the change (optional). Use "|" to break new line:\n'
   */
  body?: string
  /**
   * @default 'Is any BREAKING CHANGE (add "!" in header) (optional) ?'
   * @use need turn on options "markBreakingChangeMode"
   */
  markBreaking?: string | boolean
  /**
   * @default 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n'
   */
  breaking?: string

  /** @deprecated Please use `footerPrefixesSelect` field instead. @note fix typo option field v1.4.0: Already processed for normal compatibility */
  footerPrefixsSelect?: string
  /**
   * @default 'Select the ISSUES type of change (optional):'
   */
  footerPrefixesSelect?: string

  /** @deprecated Please use `customFooterPrefix` field instead. @note fix typo option field v1.4.0: Already processed for normal compatibility */
  customFooterPrefixs?: string
  /**
   * @default 'Input ISSUES prefix:'
   */
  customFooterPrefix?: string

  /**
   * @default 'List any ISSUES AFFECTED by this change. E.g.: #31, #34:'
   */
  footer?: string
  /**
   * @default 'Are you sure you want to proceed with the commit above?'
   */
  confirmCommit?: string

  /**
   * @default 'Generating your AI commit subject...'
   */
  generatingByAI: string
  /**
   * @default 'Select suitable subject by AI generated:'
   */
  generatedSelectByAI: string
  footerPrefix?: string
}

export type ScopesType = string[] | Array<{ name: string; value?: string }>

export interface CommitizenType {
  registerPrompt: (type: string, plugin: unknown) => void
  prompt: (qs: QuestionsType) => Promise<Answers>
}

export interface Option {
  /**
   * @description: show prompt name
   */
  name: string
  /**
   * @description: output real value
   */
  value: string
}

export interface TypesOption extends Option {
  /**
   * @description: Submit emoji commit string
   * @see: https://gitmoji.dev/
   * @example: ":bug:" => 🐛
   */
  emoji?: string
}

/**
 * provide subdivides each message part
 */
export interface CommitMessageOptions {
  /**
   * @description: choose type list value
   * @example: 'feat'
   */
  type: string
  /**
   * @description: choose or custom scope value
   * @example: 'app'
   */
  scope: string
  /**
   * @description: choose type list emoji code. need turn on `useEmoji` options
   * @example: ':sparkles:'
   */
  emoji: string
  /**
   * @description: express is a breaking change message
   * @example `!`
   */
  markBreaking: string
  /**
   * @description: input subject
   */
  subject: string
  /**
   * @description: base Angular format default header
   * @example `feat(app): add a feature`
   */
  defaultHeader: string
  body: string
  breaking: string
  footer: string
  /**
   * @description: base Angular format default all message
   */
  defaultMessage: string
}

export interface GenerateAIPromptType {
  type?: string
  defaultScope?: string | string[]
  maxSubjectLength?: number
  upperCaseSubject?: boolean
  diff?: string
}

export interface CommitizenGitOptions {
  /**
   * @description: define commonly used commit message alias
   * @default { fd: "docs: fix typos" }
   * @use commitizen CLI: "cz_alias=fd cz"
   * @use czg CLI: "czg --alias=fd" | "czg :fd"
   * @note use commitizen CLI will meet process not exit. cz-git can't resolve it.
   */
  alias?: Record<string, string>

  /**
   * @description: Customize prompt questions
   */
  messages?: Answers

  /**
   * @description: the prompt inquirer primary color
   * @rule `38;5;${color_code}`
   * @tip the color_code can get by https://github.com/sindresorhus/xterm-colors
   * @example "38;5;043"
   * @default '' //cyan color
   */
  themeColorCode?: string

  /**
   * @description: Customize prompt type
   */
  types?: TypesOption[]

  /**
   * @description: Add extra types to default types
   * @use Use when you don't want to add bloated defaults and don't want to adjust the default order in configuration
   * @example `typesAppend: [ { value: "workflow", name: "workflow:  Workflow changes"} ],`
   * @default []
   */
  typesAppend?: TypesOption[]

  /**
   * @description: default types list fuzzy search types `value` key of list.
   * if choose `false` will search `name` key of list
   * @use Using emoji unicode as `value` and that can't be searched
   * @default true
   */
  typesSearchValue?: boolean
  /** @deprecated Please use `typesSearchValue` field instead. */
  typesSearchValueKey?: boolean

  /**
   * @description: Use OpenAI to auto generate short description for commit message
   * @default false
   */
  useAI?: boolean

  /**
   * @description: If >1 will turn on select mode, select generate options like returned by OpenAI
   * @default 1
   */
  aiNumber?: number

  /**
   * @description: To ignore selection codes when sending AI API requests
   * @default [ "package-lock.json", "yarn.lock", "pnpm-lock.yaml" ]
   * @example: [ "pnpm-lock.yaml", "docs/public" ]
   */
  aiDiffIgnore?: string[]

  /**
   * Choose the AI model you want to use: gpt-3.5-turbo | text-davinci-003
   * gpt-3.5-turbo: Lower price consumption (10x) and faster
   * text-davinci-003: Get more reliable information
   *
   * @default openAI-Turbo
   */
  aiType?: 'openAI-Turbo' | 'openAI-Davinci'

  /**
   * @description: Alert!!! Save on "$HOME/.czrc" or "$HOME/.config/.czrc". Do not save on project
   */
  openAIToken?: string

  /**
   * It is recommended to use the command to configure the local
   * `npx czg --api-proxy=<http_proxy>`
   * e.g: `npx czg --api-proxy="http://127.0.0.1:1080"` or `npx czg --api-proxy="socks5://127.0.0.1:1080"`
   */
  apiProxy?: string

  /**
   * `npx czg --api-endpoint=<url>`
   * @default "https://api.openai.com/v1"
   */
  apiEndpoint?: string

  /**
   * @description: Use the callback fn can customize edit information AI question information
   * @param GenerateAIPromptType: provide some known parameters
   * @default generateSubjectDefaultPrompt
   */
  aiQuestionCB?: (aiParam: GenerateAIPromptType) => string

  /**
   * @description: Use emoji ？| it will be use typesOption.emoji code
   * @default false
   */
  useEmoji?: boolean

  /**
   * @description: Set the location of emoji in header
   * @default "center"
   */
  emojiAlign?: 'left' | 'center' | 'right'

  /**
   * @description: Provides a select of prompt to select module scopes
   * @note it auto import value from rule "scope-enum" with `@commitlint`
   * @use want to add scopes description or when you not use commitlint
   */
  scopes?: ScopesType

  /**
   * @description: default scope list fuzzy search types `name` key of list.
   * if choose `true` will search `value` key of list.
   * @use If have long description of scope. can use it to enhanced search.
   * @default false
   */
  scopesSearchValue?: boolean

  /**
   * @description: Provides an overriding select of prompt to select module scopes under specific type
   * @note use this option should set `scopes` option to realize distinguish
   * @example: [test] => provide select e2eTest unitTest
   */
  scopeOverrides?: { [type: string]: ScopesType }

  /**
   * @description: Filter select of prompt to select module scopes by the scope.value
   * @default ['.DS_Store']
   */
  scopeFilters?: string[]

  /**
   * @description: Whether to enable scope multiple mode
   * @default false
   */
  enableMultipleScopes?: boolean

  /**
   * @description: Multiple choice scope separator
   * @default ","
   */
  scopeEnumSeparator?: string

  /**
   * @description: Whether to show "custom" when selecting scopes
   * @note it auto check rule "scope-enum" set the option with `@commitlint`
   * @use when you not use commitlint
   * @default true
   */
  allowCustomScopes?: boolean

  /**
   * @description: Whether to show "empty" when selecting scopes
   * @default true
   */
  allowEmptyScopes?: boolean

  /**
   * @description: Set the location of empty option (empty) and custom option (custom) in selection range
   * @default "bottom"
   */
  customScopesAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top'

  /**
   * @default "custom"
   */
  customScopesAlias?: string

  /**
   * @default "empty"
   */
  emptyScopesAlias?: string

  /**
   * @description: Subject is need upper case first.
   * @default false
   */
  upperCaseSubject?: boolean

  /**
   * @description: Whether to add extra prompt BREAKCHANGE ask. to add an extra "!" to the header
   * @see: https://cz-git.qbb.sh/recipes/breakingchange
   * @default false
   */
  markBreakingChangeMode?: boolean

  /**
   * @description: Allow breaking changes in the included types output box
   * @default ['feat', 'fix']
   */
  allowBreakingChanges?: string[]

  /**
   * @description: set body and BREAKING CHANGE max length to break-line
   * @default 100
   * @note it auto check rule "body-max-line-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  breaklineNumber?: number

  /**
   * @description: body and BREAKINGCHANGES new line char
   * @default "|"
   */
  breaklineChar?: string

  /**
   * @deprecated Please use `issuePrefixes` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  issuePrefixs?: Option[]
  /**
   * @description: Provides a select issue prefix box in footer
   * @default issuePrefixes: [{ value: "closed", name: "ISSUES has been processed" }]
   */
  issuePrefixes?: Option[]

  /**
   * @deprecated Please use `customIssuePrefixAlign` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  customIssuePrefixsAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top'
  /**
   * @default "top"
   */
  customIssuePrefixAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top'

  /**
   * @deprecated Please use `emptyIssuePrefixAlias` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  emptyIssuePrefixsAlias?: string
  /**
   * @default "skip"
   */
  emptyIssuePrefixAlias?: string

  /**
   * @deprecated Please use `customIssuePrefixAlias` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  customIssuePrefixsAlias?: string
  /**
   * @default "custom"
   */
  customIssuePrefixAlias?: string

  /**
   * @deprecated Please use `allowCustomIssuePrefix` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  allowCustomIssuePrefixs?: boolean
  /**
   * @description: Whether to show "custom" selecting issue prefixes
   * @default true
   */
  allowCustomIssuePrefix?: boolean

  /**
   * @deprecated Please use `allowEmptyIssuePrefix` field instead.
   * @note fix typo option field v1.3.4: Already processed for normal compatibility
   */
  allowEmptyIssuePrefixs?: boolean
  /**
   * @description: Whether to show "skip(empty)" when selecting issue prefixes
   * @default true
   */
  allowEmptyIssuePrefix?: boolean

  /**
   * @description: Prompt final determination whether to display the color
   * @default true
   */
  confirmColorize?: boolean

  /**
   * @description: List of questions you want to skip
   * @default []
   * @example: ['body']
   */
  skipQuestions?: Array<'scope' | 'body' | 'breaking' | 'footerPrefix' | 'footer' | 'confirmCommit'>

  /**
   * @description: Force set max header length | Equivalent setting maxSubjectLength.
   * @note it auto check rule "header-max-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  maxHeaderLength?: number

  /**
   * @description: Force set max subject length.
   * @note it auto check rule "subject-max-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  maxSubjectLength?: number

  /**
   * @description: Is not strict subject rule. Just provide prompt word length warning.
   * Effected maxHeader and maxSubject commitlint
   * @example [1, 'always', 80] 1: mean warning. will be true
   * @default false
   */
  isIgnoreCheckMaxSubjectLength?: boolean

  /**
   * @description: Force set header width.
   * @note it auto check rule "subject-min-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  minSubjectLength?: number

  /**
   * @description: pin type item the top of the types list (match item value)
   */
  defaultType?: string

  /**
   * @description Whether to use display default value in custom scope
   * @tip pin scope item the top of the scope list (match item value)
   *
   * `string[]` for checkbox mode will default-select the options whose values match those within the `scopes` range list.
   * @example: When you want to use default, just keyboard <Enter> it
   */
  defaultScope?: string | string[]

  /**
   * @description: default value show subject template prompt
   * @example: If you want to use template complete. just keyboard <Tab> or <Right Arrow> it
   * @example: If you want to use default, just keyboard <Enter> it
   */
  defaultSubject?: string

  /**
   * @description: default value show body and BREAKINGCHANGES template prompt
   * @example: If you want to use template complete. just keyboard <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keyboard <Enter> it
   */
  defaultBody?: string
  /**
   * @description: default value show issuePrefixes custom template prompt
   * @example: If you want to use template complete. just keyboard <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keyboard <Enter> it
   */
  defaultFooterPrefix?: string
  /**
   * @description: default value show issue foot template prompt
   * @example: If you want to use template complete. just keyboard <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keyboard <Enter> it
   */
  defaultIssues?: string

  /**
   * @description: Whether to use GPG sign commit message (git commit -S -m)
   * @note the options only support `czg` cz-git cli and no support git hooks mode
   * @usage_see https://github.com/Zhengqbbb/cz-git/issues/58
   * @default false
   */
  useCommitSignGPG?: boolean

  /**
   * @description: provide user custom finally message, can use the callback to change format
   * @param CommitMessageOptions: provide subdivides each message part
   * @default ({ defaultMessage }) => defaultMessage
   */
  formatMessageCB?: (messageMod: CommitMessageOptions) => string
}

export const defaultConfig = Object.freeze({
  alias: { fd: 'docs: fix typos' },
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: 'Denote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    markBreaking: 'Is any BREAKING CHANGE (add "!" in header) (optional) ?',
    breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
    footerPrefixesSelect: 'Select the ISSUES type of change (optional):',
    customFooterPrefix: 'Input ISSUES prefix:',
    footer: 'List any ISSUES AFFECTED by this change. E.g.: #31, #34:\n',
    generatingByAI: 'Generating your AI commit subject...',
    generatedSelectByAI: 'Select suitable subject by AI generated:',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  types: [
    { value: 'feat', name: 'feat:     A new feature', emoji: ':sparkles:' },
    { value: 'fix', name: 'fix:      A bug fix', emoji: ':bug:' },
    { value: 'docs', name: 'docs:     Documentation only changes', emoji: ':memo:' },
    { value: 'style', name: 'style:    Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
    { value: 'refactor', name: 'refactor: A code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
    { value: 'perf', name: 'perf:     A code change that improves performance', emoji: ':zap:' },
    { value: 'test', name: 'test:     Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
    { value: 'build', name: 'build:    Changes that affect the build system or external dependencies', emoji: ':package:' },
    { value: 'ci', name: 'ci:       Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
    { value: 'chore', name: 'chore:    Other changes that don\'t modify src or test files', emoji: ':hammer:' },
    { value: 'revert', name: 'revert:   Reverts a previous commit', emoji: ':rewind:' },
  ],
  typesAppend: [],
  typesSearchValue: true,
  themeColorCode: '',
  useEmoji: false,
  useAI: false,
  aiType: 'openAI-Turbo',
  aiNumber: 1,
  aiQuestionCB: undefined,
  openAIToken: '',
  apiProxy: '',
  apiEndpoint: 'https://api.openai.com/v1',
  emojiAlign: 'center',
  scopes: [],
  scopesSearchValue: false,
  scopeOverrides: undefined,
  scopeFilters: ['.DS_Store'],
  enableMultipleScopes: false,
  scopeEnumSeparator: ',',
  allowCustomScopes: true,
  allowEmptyScopes: true,
  customScopesAlign: 'bottom',
  customScopesAlias: 'custom',
  emptyScopesAlias: 'empty',
  upperCaseSubject: false,
  markBreakingChangeMode: false,
  allowBreakingChanges: ['feat', 'fix'],
  breaklineNumber: 100,
  breaklineChar: '|',
  skipQuestions: [],
  issuePrefixes: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
  customIssuePrefixAlign: 'top',
  emptyIssuePrefixAlias: 'skip',
  customIssuePrefixAlias: 'custom',
  allowCustomIssuePrefix: true,
  allowEmptyIssuePrefix: true,
  confirmColorize: true,
  maxHeaderLength: Infinity,
  maxSubjectLength: Infinity,
  isIgnoreCheckMaxSubjectLength: false,
  minSubjectLength: 0,
  defaultType: '',
  defaultScope: '',
  defaultBody: '',
  defaultSubject: '',
  defaultFooterPrefix: '',
  defaultIssues: '',
  useCommitSignGPG: false,
  formatMessageCB: undefined,
} as CommitizenGitOptions)
