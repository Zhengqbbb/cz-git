import type { prompter } from 'cz-git'

export type CallBackFn = (err: Error | null, data?: any) => void

export type CzGitPrompter = typeof prompter

export interface CommitOptions {
  args: string[]
  disableAppendPaths: boolean
  emitData: boolean
  quiet: boolean
  retryLastCommit: boolean
  rebackLastCommit: boolean
  hookMode: boolean
  environment: any
  configPath?: string
}
