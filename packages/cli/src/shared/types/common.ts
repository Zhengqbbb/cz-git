import { prompter } from "cz-git";

export type CallBackFn = (err: Error | null, data?: any) => void;

export type CzGitPrompter = typeof prompter;

export type CommitOptions = {
  args: any[];
  disableAppendPaths: boolean;
  emitData: boolean;
  quiet: boolean;
  retryLastCommit: boolean;
  hookMode: boolean;
};
