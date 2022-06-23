import { prompter } from "cz-git";

export type CallBackFn = (err: Error | null, data?: any) => void;

export type CzGitPrompter = typeof prompter;

export type CommitOptions = {
  args: string[];
  disableAppendPaths: boolean;
  emitData: boolean;
  quiet: boolean;
  retryLastCommit: boolean;
  rebackLastCommit: boolean;
  hookMode: boolean;
  environment: any;
};
