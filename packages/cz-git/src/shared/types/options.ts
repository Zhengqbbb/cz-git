/**
 * @description: cz-git types
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */
import type { QuestionsType } from "../../generator";
import type { CommitlintUserConfig } from "./commitlint";

export interface UserConfig extends CommitlintUserConfig {
  prompt?: CommitizenGitOptions;
}

export type Config = Omit<Partial<typeof defaultConfig>, "scopes"> & {
  scopes: ScopesType;
  disableScopeLowerCase?: boolean;
  disableSubjectLowerCase?: boolean;
  maxHeaderLength?: number;
  maxSubjectLength?: number;
  minSubjectLength?: number;
  defaultScope?: string;
  defaultSubject?: string;
  defaultBody?: string;
  defaultFooterPrefix?: string;
  defaultIssues?: string;
};

export type Answers = {
  /**
   * @default: Select the type of change that you're committing:
   */
  type?: string;
  /**
   * @default: Denote the SCOPE of this change (optional):
   */
  scope?: string | string[];
  /**
   * @default: Denote the SCOPE of this change:
   */
  customScope?: string;
  /**
   * @default: Write a SHORT, IMPERATIVE tense description of the change:\n
   */
  subject?: string;
  /**
   * @default:Provide a LONGER description of the change (optional). Use "|" to break new line:\n
   */
  body?: string;
  /**
   * @default: Is any BREAKING CHANGE (add "!" in header) (optional) ?
   * @use need turn on options "markBreakingChangeMode"
   */
  markBreaking?: string | boolean;
  /**
   * @default: List any BREAKING CHANGES (optional). Use "|" to break new line:\n
   */
  breaking?: string;
  /**
   * @default: Select the ISSUES type of change (optional):
   */
  footerPrefixsSelect?: string;
  footerPrefix?: string;
  /**
   * @default: Input ISSUES prefix:
   */
  customFooterPrefixs?: string;
  /**
   * @default: List any ISSUES AFFECTED by this change. E.g.: #31, #34:
   */
  footer?: string;
  /**
   * @default: Are you sure you want to proceed with the commit above?
   */
  confirmCommit?: string;
};

export type ScopesType = string[] | Array<{ name: string; value?: string }>;

export interface CommitizenType {
  registerPrompt: (type: string, plugin: unknown) => void;
  prompt: (qs: QuestionsType) => Promise<Answers>;
}

export interface Option {
  /**
   * @description: show prompt name
   */
  name: string;
  /**
   * @description: output real value
   */
  value: string;
}

export interface TypesOption extends Option {
  /**
   * @description: Submit emoji commit string
   * @see: https://gitmoji.dev/
   * @example: ":bug:" => 🐛
   */
  emoji?: string;
}

export interface CommitizenGitOptions {
  /**
   * @description: Customize prompt questions
   */
  messages?: Answers;

  /**
   * @description: the prompt inquirer primary color
   * @rule `38;5;${color_code}`
   * @tip the color_code can get by https://github.com/sindresorhus/xterm-colors
   * @example "38;5;043"
   * @default: "" = cyan color
   */
  themeColorCode?: string;

  /**
   * @description: Customize prompt type
   */
  types?: TypesOption[];

  /**
   * @description: Add extra types to default types
   * @use Use when you don't want to add bloated defaults and don't want to adjust the default order in configuration
   * @example `typesAppend: [ { value: "workflow", name: "workflow:  Workflow changes"} ],`
   * @default: []
   */
  typesAppend?: TypesOption[];

  /**
   * @description: Use emoji ？| it will be use typesOption.emoji code
   * @default: false
   */
  useEmoji?: boolean;

  /**
   * @description: Set the location of emoji in header
   * @default: "center"
   */
  emojiAlign?: "left" | "center" | "right";

  /**
   * @description: Provides a select of prompt to select module scopes
   * @note it auto import value from rule "scope-enum" with `@commitlint`
   * @use want to add scopes description or when you not use commitlint
   */
  scopes?: ScopesType;

  /**
   * @description: Provides an overriding select of prompt to select module scopes under specific typs
   * @note use this option should set `scopes` option to realize distinguish
   * @example: [test] => provide select e2eTest unitTest
   */
  scopeOverrides?: { [type: string]: ScopesType };

  /**
   * @description: Filter select of prompt to select module scopes by the scope.value
   * @default: ['.DS_Store']
   */
  scopeFilters?: string[];

  /**
   * @description: Whether to enable scope multiple mode
   * @default: false
   */
  enableMultipleScopes?: boolean;

  /**
   * @description: Multiple choice scope separator
   * @default: ","
   */
  scopeEnumSeparator?: string;

  /**
   * @description: Whether to show "custom" when selecting scopes
   * @note it auto check rule "scope-enum" set the option with `@commitlint`
   * @use when you not use commitlint
   * @default true
   */
  allowCustomScopes?: boolean;

  /**
   * @description: Whether to show "empty" when selecting scopes
   * @default true
   */
  allowEmptyScopes?: boolean;

  /**
   * @description: Set the location of empty option (empty) and custom option (custom) in selection range
   * @default: "bottom"
   */
  customScopesAlign?: "top" | "bottom" | "top-bottom" | "bottom-top";

  /**
   * @default: "custom"
   */
  customScopesAlias?: string;

  /**
   * @default: "empty"
   */
  emptyScopesAlias?: string;

  /**
   * @description: Subject is need upper case first.
   * @default false
   */
  upperCaseSubject?: boolean;

  /**
   * @description: Whether to add extra prompt BREAKCHANGE ask. to add an extra "!" to the header
   * @see: https://cz-git.qbenben.com/recipes/breakingchange
   * @default: false
   */
  markBreakingChangeMode?: boolean;

  /**
   * @description: Allow breaking changes in the included types output box
   * @default: ['feat', 'fix']
   */
  allowBreakingChanges?: string[];

  /**
   * @description: set body and BREAKING CHANGE max length to breakline
   * @default: 100
   * @note it auto check rule "body-max-line-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  breaklineNumber?: number;

  /**
   * @description: body and BREAKINGCHANGES new line char
   * @default: "|"
   */
  breaklineChar?: string;

  /**
   * @description: Provides a select issue prefix box in footer
   * @default: issuePrefixs: [{ value: "closed", name: "ISSUES has been processed" }]
   */
  issuePrefixs?: Option[];

  /**
   * @default: "top"
   */
  customIssuePrefixsAlign?: "top" | "bottom" | "top-bottom" | "bottom-top";

  /**
   * @default: "skip"
   */
  emptyIssuePrefixsAlias?: string;

  /**
   * @default: "custom"
   */
  customIssuePrefixsAlias?: string;

  /**
   * @description: Whether to show "custom" selecting issue prefixs
   * @default true
   */
  allowCustomIssuePrefixs?: boolean;

  /**
   * @description: Whether to show "skip(empty)" when selecting issue prefixs
   * @default true
   */
  allowEmptyIssuePrefixs?: boolean;

  /**
   * @description: Prompt final determination whether to display the color
   * @default: true
   */
  confirmColorize?: boolean;

  /**
   * @description: List of questions you want to skip
   * @default: []
   * @example: ['body']
   */
  skipQuestions?: Array<"scope" | "body" | "breaking" | "footerPrefix" | "footer">;

  /**
   * @description: Force set max header length | Equivalent setting maxSubjectLength.
   * @note it auto check rule "header-max-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  maxHeaderLength?: number;

  /**
   * @description: Force set max subject length.
   * @note it auto check rule "subject-max-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  maxSubjectLength?: number;

  /**
   * @description: Force set header width.
   * @note it auto check rule "subject-min-length" set the option with `@commitlint`.
   * @use when you not use commitlint
   */
  minSubjectLength?: number;

  /**
   * @description: pin type item the top of the types list (match item value)
   */
  defaultType?: string;

  /**
   * @description: Whether to use display default value in custom scope
   * @tip pin scope item the top of the scope list (match item value)
   * @example: When you want to use default, just keybord <Enter> it
   */
  defaultScope?: string;

  /**
   * @description: default value show subject template prompt
   * @example: If you want to use template complate. just keybord <Tab> or <Right Arrow> it
   * @example: If you want to use default, just keybord <Enter> it
   */
  defaultSubject?: string;

  /**
   * @description: default value show body and BREAKINGCHANGES template prompt
   * @example: If you want to use template complate. just keybord <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keybord <Enter> it
   */
  defaultBody?: string;
  /**
   * @description: default value show issuePrefixs custom template prompt
   * @example: If you want to use template complate. just keybord <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keybord <Enter> it
   */
  defaultFooterPrefix?: string;
  /**
   * @description: default value show issue foot template prompt
   * @example: If you want to use template complate. just keybord <Tab> or <Right Arrow> it
   * @example: When you want to use default, just keybord <Enter> it
   */
  defaultIssues?: string;
}

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const defaultConfig = Object.freeze({
   messages: {
     type: "Select the type of change that you're committing:",
     scope: "Denote the SCOPE of this change (optional):",
     customScope: "Denote the SCOPE of this change:",
     subject: "Write a SHORT, IMPERATIVE tense description of the change:\n",
     body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
     markBreaking: 'Is any BREAKING CHANGE (add "!" in header) (optional) ?',
     breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
     footerPrefixsSelect: "Select the ISSUES type of change (optional):",
     customFooterPrefixs: "Input ISSUES prefix:",
     footer: "List any ISSUES AFFECTED by this change. E.g.: #31, #34:\n",
     confirmCommit: "Are you sure you want to proceed with the commit above?"
   },
   types: [
     { value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" },
     { value: "fix", name: "fix:      A bug fix", emoji: ":bug:" },
     { value: "docs", name: "docs:     Documentation only changes", emoji: ":memo:" },
     { value: "style", name: "style:    Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
     { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
     { value: "perf", name: "perf:     A code change that improves performance", emoji: ":zap:" },
     { value: "test", name: "test:     Adding missing tests or correcting existing tests", emoji: ":white_check_mark:" },
     { value: "build", name: "build:    Changes that affect the build system or external dependencies", emoji: ":package:" },
     { value: "ci", name: "ci:       Changes to our CI configuration files and scripts", emoji: ":ferris_wheel:" },
     { value: "chore", name: "chore:    Other changes that don't modify src or test files", emoji: ":hammer:" },
     { value: "revert", name: "revert:   Reverts a previous commit", emoji: ":rewind:" }
   ],
   typesAppend: [],
   themeColorCode: "",
   useEmoji: false,
   emojiAlign: "center",
   scopes: [],
   enableMultipleScopes: false,
   scopeEnumSeparator: ",",
   allowCustomScopes: true,
   allowEmptyScopes: true,
   customScopesAlign: "bottom",
   customScopesAlias: "custom",
   emptyScopesAlias: "empty",
   upperCaseSubject: false,
   markBreakingChangeMode: false,
   allowBreakingChanges: ['feat', 'fix'],
   breaklineNumber: 100,
   breaklineChar: "|",
   skipQuestions: [],
   issuePrefixs: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
   customIssuePrefixsAlign: "top",
   emptyIssuePrefixsAlias: "skip",
   customIssuePrefixsAlias: "custom",
   allowCustomIssuePrefixs: true,
   allowEmptyIssuePrefixs: true,
   confirmColorize: true,
   maxHeaderLength: Infinity,
   maxSubjectLength: Infinity,
   minSubjectLength: 0,
   scopeOverrides: undefined,
   scopeFilters: [".DS_Store"],
   defaultType: "",
   defaultScope: "",
   defaultBody: "",
   defaultSubject: "",
   defaultFooterPrefix: "",
   defaultIssues: ""
 } as CommitizenGitOptions);
