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
     * define commonly used commit message alias
     *
     * @default { fd: "docs: fix typos" }
     * @use commitizen CLI: "cz_alias=fd cz"
     * @use czg CLI: "czg --alias=fd" | "czg :fd"
     * @note use commitizen CLI will meet process not exit. cz-git can't resolve it.
     */
    alias?: Record<string, string>

    /**
     * Customize prompt questions
     */
    messages?: Answers

    /**
     * the prompt inquirer primary color
     *
     * @rule `38;5;${color_code}`
     * @tip the color_code can get by https://github.com/sindresorhus/xterm-colors
     * @example "38;5;043"
     * @default '' //cyan color
     */
    themeColorCode?: string

    /**
     * Customize prompt type
     */
    types?: TypesOption[]

    /**
     * Add extra types to default types
     *
     * @use Use when you don't want to add bloated defaults and don't want to adjust the default order in configuration
     * @example `typesAppend: [ { value: "workflow", name: "workflow:  Workflow changes"} ],`
     * @default []
     */
    typesAppend?: TypesOption[]

    /**
     * Default types list fuzzy search types `value` key of list.
     * If choose `false` will search `name` key of list.
     *
     * @use Using emoji unicode as `value` and that can't be searched
     * @default true
     */
    typesSearchValue?: boolean

    /**
     * Use OpenAI to auto generate short description for commit message
     *
     * @default false
     */
    useAI?: boolean

    /**
     * If >1 will turn on select mode, select generate options like returned by OpenAI
     *
     * @default 1
     */
    aiNumber?: number

    /**
     * Choose the AI model you want to use
     *
     * @see https://platform.openai.com/docs/models/model-endpoint-compatibility => /v1/chat/completions
     * @example "gpt-3.5-turbo" | "gpt-4" | "gpt-4o" | "gpt-4o-mini"
     * @default "gpt-4o-mini"
     */
    aiModel?: string

    /**
     * To ignore selection codes when sending AI API requests
     *
     * @default [ "package-lock.json", "yarn.lock", "pnpm-lock.yaml" ]
     * @example [ "pnpm-lock.yaml", "docs/public" ]
     */
    aiDiffIgnore?: string[]

    /**
     * Use emoji ？It will be use typesOption.emoji code
     *
     * @default false
     */
    useEmoji?: boolean

    /**
     * Set the location of emoji in header
     *
     * @default "center"
     */
    emojiAlign?: 'left' | 'center' | 'right'

    /**
     * Provides a select of prompt to select module scopes
     *
     * @commitlint it auto import value from rule "scope-enum"
     */
    scopes?: ScopesType

    /**
     * Default scope list fuzzy search types `name` key of list.
     * If choose `true` will search `value` key of list.
     *
     * @use If have long description of scope. can use it to enhanced search.
     * @default false
     */
    scopesSearchValue?: boolean

    /**
     * Provides an overriding select of prompt to select module scopes under specific type
     *
     * @note use this option should set `scopes` option to realize distinguish
     * @example { "test": ["e2eTest", "unitTest"] }
     */
    scopeOverrides?: { [type: string]: ScopesType }

    /**
     * Filter select of prompt to select module scopes by the scope.value
     *
     * @default ['.DS_Store']
     */
    scopeFilters?: string[]

    /**
     * Whether to enable scope multiple mode
     *
     * @default false
     */
    enableMultipleScopes?: boolean

    /**
     * Multiple choice scope separator
     *
     * @default ","
     */
    scopeEnumSeparator?: string

    /**
     * Whether to show "custom" when selecting scopes
     *
     * @note it auto check rule "scope-enum" set the option with `@commitlint`
     * @use when you not use commitlint
     * @default true
     */
    allowCustomScopes?: boolean

    /**
     * Whether to show "empty" when selecting scopes
     *
     * @default true
     */
    allowEmptyScopes?: boolean

    /**
     * Set the location of empty option (empty) and custom option (custom) in selection range
     *
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
     * Subject is need upper case first.
     *
     * @default false
     */
    upperCaseSubject?: boolean

    /**
     * Whether to add extra prompt BREAKCHANGE ask. to add an extra "!" to the header
     *
     * @see: https://cz-git.qbb.sh/recipes/breakingchange
     * @default false
     */
    markBreakingChangeMode?: boolean

    /**
     * Allow breaking changes in the included types output box
     *
     * @default ['feat', 'fix']
     */
    allowBreakingChanges?: string[]

    /**
     * set body and BREAKING CHANGE max length to break-line
     *
     * @default 100
     * @commitlint it auto check rule "body-max-line-length".
     */
    breaklineNumber?: number

    /**
     * body and BREAKINGCHANGES new line char
     *
     * @default "|"
     */
    breaklineChar?: string

    /**
     * Provides a select issue prefix box in footer
     *
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
     * Whether to show "custom" selecting issue prefixes
     *
     * @default true
     */
    allowCustomIssuePrefix?: boolean

    /**
     * Whether to show "skip(empty)" when selecting issue prefixes
     *
     * @default true
     */
    allowEmptyIssuePrefix?: boolean

    /**
     * Prompt final determination whether to display the color
     *
     * @default true
     */
    confirmColorize?: boolean

    /**
     * List of questions you want to skip
     *
     * @default []
     * @example ['body']
     */
    skipQuestions?: Array<'scope' | 'body' | 'breaking' | 'footerPrefix' | 'footer' | 'confirmCommit'>

    /**
     * Force set max header length | Equivalent setting maxSubjectLength.
     *
     * @commitlint it auto check rule and use value from "header-max-length".
     * @use when you not use commitlint
     */
    maxHeaderLength?: number

    /**
     * Force set max subject length.
     *
     * @commitlint it auto check rule and use value from "subject-max-length".
     * @use when you not use commitlint
     */
    maxSubjectLength?: number

    /**
     * Is not strict subject rule. Just provide prompt word length warning.
     * Effected maxHeader and maxSubject commitlint.
     *
     * @example [1, 'always', 80] 1: mean warning. will be true
     * @default false
     */
    isIgnoreCheckMaxSubjectLength?: boolean

    /**
     * Force set header width.
     *
     * @commitlint it auto check rule and use value from "subject-min-length".
     * @use when you not use commitlint
     */
    minSubjectLength?: number

    /**
     * pin type item the top of the types list (match item value)
     */
    defaultType?: string

    /**
     * Whether to use display default value in custom scope
     *
     * @tip
     * 1. pin scope item the top of the scope list (match item value)
     * 2. `string[]` for checkbox mode will default-select the options whose values match those within the `scopes` range list.
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultScope?: string | string[]

    /**
     * default value show subject template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage If you want to use default, just keyboard `Enter` it
     */
    defaultSubject?: string

    /**
     * default value show body and BREAKINGCHANGES template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultBody?: string
    /**
     * default value show issuePrefixes custom template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultFooterPrefix?: string
    /**
     * default value show issue foot template prompt
     *
     * @usage If you want to use template complete. just keyboard `Tab` or `Right Arrow` it
     * @usage When you want to use default, just keyboard `Enter` it
     */
    defaultIssues?: string

    /**
     * Whether to use GPG sign commit message (git commit -S -m)
     * @note the options only support `czg` cz-git cli and no support git hooks mode
     * @see https://github.com/Zhengqbbb/cz-git/issues/58
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

export type ScopesType = string[] | Array<{ name: string, value?: string }>
