// Provide types helper fn
import type { defineConfig as defineConfigType, definePrompt as definePromptType } from './shared/types/options'

export const defineConfig: typeof defineConfigType = config => config
export const definePrompt: typeof definePromptType = config => config
