export type CzgitFlagList =
  | "config"
  | "version"
  | "help"
  | "reback"
  | "retry"
  | "yes"
  | "hook"
  | "alias";
export type CzgitCommonFlag = {
  /** option: --version|-v */
  version?: boolean;
  /** option: --help|-h */
  help?: boolean;
};

export type CzgitFlag = {
  /** option: --config="xxx" */
  config?: string;
  /** option: --alias="xxx" */
  alias?: string;
  /** option: --reback|-b */
  reback?: boolean;
  /** option: --retry|-r */
  retry?: boolean;
  /** option: --hook, provide husky */
  hook?: boolean;
};

export type InitFlag = {
  /** option: --yes|-y */
  yes?: boolean;
};

export type CzgitSubCommandList = "init" | "emoji" | "checkbox" | "break";
export type CzgitSubCommand = {
  /** option: init */
  init?: boolean;
  /** subcmd: emoji */
  emoji?: boolean;
  /** subcmd: checkbox */
  checkbox?: boolean;
  /** subcmd: break */
  break?: boolean;
};

/**
 * @description: provide czgit parsed Args
 */
export type CzgitParseArgs = {
  czgitArgs: {
    flag: (CzgitCommonFlag & CzgitFlag & InitFlag) | null;
    subCommand: CzgitSubCommand | null;
  };
  gitArgs: string[];
};
