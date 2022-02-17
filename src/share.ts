/**
 * @description: cz-git types
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

export type Config = Omit<Partial<typeof defaultConfig>, "scopes"> & {
  scopes: typesOption[];
  disableScopeLowerCase?: boolean;
  disableSubjectLowerCase?: boolean;
  maxHeaderWidth?: number;
  maxLineWidth?: number;
  defaultType?: string;
  defaultScope?: string;
  defaultSubject?: string;
  defaultBody?: string;
  defaultIssues?: string;
};

export type Answers = {
  type?: string;
  scope?: string;
  customScope?: string;
  subject?: string;
  body?: string;
  breaking?: string;
  footer?: string;
  footerPrefixsSelect?: string;
  confirmCommit?: string;
};

interface Option {
  /**
   * @description: show prompt name
   */
  name: string;
  /**
   * @description: output real value
   */
  value: string;
}

export interface typesOption extends Option {
  /**
   * @description: Submit emoji commit string
   * @see: https://gitmoji.dev/
   * @example: ":bug:" => 🐛
   */
  emoji?: string;
}

export interface commitizenGitOptions {
  messages?: Answers;

  /**
   * @description: commitizen cli prompt
   */
  types?: typesOption[];

  /**
   * @description: use emoji ？| it will be use typesOption.emoji code
   * @default: false
   */
  useEmoji?: boolean;

  /**
   * @description: Provides a select of prompt to select module scopes
   */
  scopes?: Array<{ name: string }>;

  /**
   * @description: Provides an overriding select of prompt to select module scopes under specific typs
   * @example: [test] => provide select e2eTest unitTest
   */
  scopeOverrides?: { [type: string]: Option[] };

  /**
   * @description: Whether to not selectable skipping when appearing or customizing when selecting scopes
   * @default true
   */
  allowCustomScopes?: boolean;

  /**
   * @description: Allow breaking changes in the included types output box
   * @default: ['feat', 'fix']
   */
  allowBreakingChanges?: string[];

  /**
   * @description: List of questions you want to skip
   * @example: ['body']
   */
  skipQuestions?: string[];

  /**
   * @description: Provides a select issue prefix box in footer
   * @default: issuePrefixs: [{ value: "closed", name: "ISSUES has been processed" }]
   */
  issuePrefixs?: Option[];

  /**
   * @description: prompt final determination whether to display the color
   * @default: false
   */
  confirmNoColor?: boolean;

  maxHeaderWidth?: number;
  maxSubjectLength?: number;
  minSubjectLength?: number;
  maxLineWidth?: number;
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
    breaking: "List any BREAKING CHANGES (optional):\n",
    footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):\n",
    footer: "List any ISSUES by this change. E.g.: #31, #34, #I972S:\n",
    confirmCommit: "Are you sure you want to proceed with the commit above ?"
  },
  types: [
    { value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" },
    { value: "fix", name: "fix:      A bug fix", emoji: ":bug:" },
    { value: "docs", name: "docs:     Documentation only changes", emoji: ":memo:" },
    { value: "style", name: "style:    Changes that do not affect the meaning of the code", emoji: ":lipstick:" },
    { value: "refactor", name: "refactor: A code change that neither fixes a bug nor adds a feature", emoji: ":recycle:" },
    { value: "perf", name: "perf:     A code change that improves performance", emoji: ":zap:" },
    { value: "test", name: "test:     Adding missing tests or correcting existing tests", emoji: ":rotating_light:" },
    { value: "build", name: "build:    Changes that affect the build system or external dependencies", emoji: ":building_construction:" },
    { value: "ci", name: "ci:       Changes to our CI configuration files and scripts", emoji: ":green_heart:" },
    { value: "chore", name: "chore:    Other changes that don't modify src or test files", emoji: ":hammer:" },
    { value: "revert", name: "revert:   Reverts a previous commit", emoji: ":rewind:" }
  ],
  useEmoji: false,
  scopes: [{ name: 'READEME' }, { name: 'theme' }, { name: 'module' }, { name: 'plugin' }],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  skipQuestions: [],
  issuePrefixs: [
    { value: "link", name: "processing to ISSUES" },
    { value: "closed", name: "ISSUES has been processed" }
  ],
  confirmNoColor: false
} as commitizenGitOptions);
