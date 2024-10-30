/**
 * Provide configure types and types helper fn
 */

import type { defineConfig as defineConfigType, definePrompt as definePromptType } from 'cz-git'

export type { UserConfig } from 'cz-git'
export type { CommitizenGitOptions } from 'cz-git'

// Duplicate definition of helper functions, avoid tree-shaking failures, increase additional code
export const defineConfig: typeof defineConfigType = config => config
export const definePrompt: typeof definePromptType = config => config
