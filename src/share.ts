/**
 * @description: cz-git types
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */
import type { QuestionsType } from "./loader";
import type { UserConfig as CommitlintUserConfig } from "@commitlint/types";

export interface UserConfig extends CommitlintUserConfig {
  prompt: CommitizenGitOptions;
}

export type Config = Omit<Partial<typeof defaultConfig>, "scopes"> & {
  scopes: TypesOption[];
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
  /**
   * @default: Select the type of change that you're committing:
   */
  type?: string;
  /**
   * @default: Denote the SCOPE of this change (optional):
   */
  scope?: string;
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
   * @default: List any BREAKING CHANGES (optional):\n
   */
  breaking?: string;
  /**
   * @default: Select the ISSUES type of changeList by this change (optional):
   */
  footerPrefixsSelect?: string;
  /**
   * @default: Input ISSUES Prefix:
   */
  customFooterPrefixs?: string;
  /**
   * @default: List any ISSUES by this change. E.g.: #31, #34, #I972S:\n
   */
  footer?: string;
  /**
   * @default: Are you sure you want to proceed with the commit above ?
   */
  confirmCommit?: string;
};

export interface CommitizenType {
  registerPrompt: (type: string, plugin: unknown) => void;
  prompt: (qs: QuestionsType) => Promise<Answers>;
}

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
   * @description: Customize prompt type
   */
  types?: TypesOption[];

  /**
   * @description: Use emoji ？| it will be use typesOption.emoji code
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
  scopeOverrides?: { [type: string]: Array<{ name: string }> };

  /**
   * @description: Whether to not selectable skipping when appearing or customizing when selecting scopes
   * @default true
   */
  allowCustomScopes?: boolean;

  /**
   * @description: Subject is need upper case first.
   * @default false
   */
  upperCaseSubject?: boolean;

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
    footerPrefixsSelect: "Select the ISSUES type of changeList by this change (optional):",
    customFooterPrefixs: "Input ISSUES Prefix:",
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
  upperCaseSubject: false,
  skipQuestions: [],
  issuePrefixs: [
    { value: "link", name: "link:     processing to ISSUES" },
    { value: "closed", name: "closed:   ISSUES has been processed" }
  ],
  confirmNoColor: false
} as CommitizenGitOptions);
