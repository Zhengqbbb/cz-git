export interface CommitizenGitOptions {
  /**
   * project: "node_modules/cz-git"
   * root: "cz-git"
   * @default node_modules/cz-git
   */
  path?: string
  $schema?: string
  prompt?: CommitizenGitOptions
  
  /**
   * @description: Define commonly used commit message alias
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
   * choose your AI model: gpt-3.5-turbo | text-davinci-003
   * 
   * gpt-3.5-turbo: Lower price consumption (10x) and faster
   * 
   * text-davinci-003: Get more reliable information
   * 
   * @default "openAI-Turbo"
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
   * @description: Use emoji ?| it will be use typesOption.emoji code
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
   * @description: Provides a select issue prefix box in footer
   * @default issuePrefixes: [{ value: "closed", name: "ISSUES has been processed" }]
   */
  issuePrefixes?: Option[]

  /**
   * @default "top"
   */
  customIssuePrefixAlign?: 'top' | 'bottom' | 'top-bottom' | 'bottom-top'

  /**
   * @default "skip"
   */
  emptyIssuePrefixAlias?: string

  /**
   * @default "custom"
   */
  customIssuePrefixAlias?: string

  /**
   * @description: Whether to show "custom" selecting issue prefixes
   * @default true
   */
  allowCustomIssuePrefix?: boolean

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
   * @description: Whether to use display default value in custom scope
   * @tip pin scope item the top of the scope list (match item value)
   * 
   * `string[]` for checkbox mode will default-select the options whose values match those within the `scopes` range list.
   * @example: When you want to use default value, just keyboard <Enter> it
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

  /**
   * @default 'Select the ISSUES type of change (optional):'
   */
  footerPrefixesSelect?: string

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
  generatingByAI?: string
  /**
   * @default 'Select suitable subject by AI generated:'
   */
  generatedSelectByAI?: string
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

export type ScopesType = string[] | Array<{ name: string; value?: string }>
