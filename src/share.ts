interface Option {
  /**
   * @description: show prompt name
   */
  name: string;
  /**
   * @description: output real value
   */
  value?: string;
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
  messages?: {
    type?: string;
    scope?: string;
    customScope?: string;
    subject?: string;
    body?: string;
    breaking?: string;
    footer?: string;
    confirmCommit?: string;
  };

  /**
   * @description: commitizen cli prompt
   */
  types?: typesOption[];

  /**
   * @description: use emoji ？
   * @default: false
   * @see: TODO:
   */
  useEmoji?: boolean;

  /**
   * @description: Provides a select of prompt to select module scopes
   */
  scopes?: Option[];

  /**
   * @description: Provides an overriding select of prompt to select module scopes under specific typs
   * @example: [test] => provide select e2eTest unitTest
   */
  scopeOverrides?: { [type: string]: Option[] };

  /**
   * @description: Whether to not selectable skipping when appearing or customizing when selecting scopes
   * @default false
   */
  allowCustomScopes?: boolean;

  /**
   * @description: Allow breaking changes in the included types output box
   * @default: ['feat', 'fix']
   */
  allowBreakingChanges?: string[];

  /**
   * @description: List of questions you want to skip
   * @example: ['footer']
   */
  skipQuestions?: string[];

  /**
   * @description: Provides a select issue prefix box in footer
   * @default: [ {links: 'link to this issue', closed: 'The issue has been processed'} ]
   */
  issuePrefixs?: Option;
}

export const defaultConfig = Object.freeze({
  types: [{ value: "feat", name: "feat:    A new feature", emoji: ":sparkles:" }]
} as commitizenGitOptions);
