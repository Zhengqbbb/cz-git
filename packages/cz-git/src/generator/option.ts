/**
 * @description: generate commitizen config option(generateOptions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import {
  defaultConfig,
  emptyRuleIsActive,
  enumRuleIsActive,
  getEnumList,
  getMaxLength,
  getMinLength,
  ruleIsWarning,
} from '../shared'
import type { Answers, CommitizenGitOptions, UserConfig } from '../shared'

export function generateOptions(config: UserConfig): CommitizenGitOptions {
  const { emoji, checkbox, czai, no_czai, cz_ainum, ___X_CMD_THEME_COLOR_CODE } = process.env
  const promptConfig = config.prompt ?? {}

  return {
    alias: promptConfig.alias ?? defaultConfig.alias,
    messages: {
      ...defaultConfig.messages,
      ...promptConfig.messages,
    } as Answers,
    themeColorCode: ___X_CMD_THEME_COLOR_CODE || promptConfig.themeColorCode || defaultConfig.themeColorCode,
    types: promptConfig.types ?? defaultConfig.types,
    typesAppend: promptConfig.typesAppend ?? defaultConfig.typesAppend,
    typesSearchValue: promptConfig.typesSearchValueKey ?? promptConfig.typesSearchValue ?? defaultConfig.typesSearchValue,
    useAI: Boolean(czai === '1' && no_czai !== '1') || (promptConfig.useAI && no_czai !== '1') || defaultConfig.useAI,
    aiNumber: parseInt(cz_ainum || '0', 10) || promptConfig.aiNumber || defaultConfig.aiNumber,
    aiDiffIgnore: promptConfig.aiDiffIgnore ?? promptConfig.aiDiffIgnore,
    aiType: promptConfig.aiType ?? defaultConfig.aiType,
    aiQuestionCB: promptConfig.aiQuestionCB ?? defaultConfig.aiQuestionCB,
    openAIToken: process.env.CZ_OPENAI_TOKEN || process.env.CZ_OPENAI_API_KEY || promptConfig.openAIToken || defaultConfig.openAIToken,
    apiProxy: promptConfig.apiProxy || defaultConfig.apiProxy,
    apiEndpoint: promptConfig.apiEndpoint || defaultConfig.apiEndpoint,
    useEmoji: Boolean(emoji === '1') || promptConfig.useEmoji || defaultConfig.useEmoji,
    emojiAlign: promptConfig.emojiAlign || defaultConfig.emojiAlign,
    scopes: promptConfig.scopes ?? getEnumList(config?.rules?.['scope-enum'] as any),
    scopesSearchValue: promptConfig.scopesSearchValue ?? defaultConfig.scopesSearchValue,
    scopeOverrides: promptConfig.scopeOverrides ?? defaultConfig.scopeOverrides,
    scopeFilters: promptConfig.scopeFilters ?? defaultConfig.scopeFilters,
    enableMultipleScopes: Boolean(checkbox === '1') || promptConfig.enableMultipleScopes || defaultConfig.enableMultipleScopes,
    scopeEnumSeparator: promptConfig.scopeEnumSeparator ?? defaultConfig.scopeEnumSeparator,
    allowCustomScopes: promptConfig.allowCustomScopes ?? !enumRuleIsActive(config?.rules?.['scope-enum'] as any),
    allowEmptyScopes: promptConfig.allowEmptyScopes ?? !emptyRuleIsActive(config?.rules?.['scope-empty'] as any),
    customScopesAlign: promptConfig.customScopesAlign ?? defaultConfig.customScopesAlign,
    customScopesAlias: promptConfig.customScopesAlias ?? defaultConfig.customScopesAlias,
    emptyScopesAlias: promptConfig.emptyScopesAlias ?? defaultConfig.emptyScopesAlias,
    upperCaseSubject: promptConfig.upperCaseSubject ?? defaultConfig.upperCaseSubject,
    markBreakingChangeMode: promptConfig.markBreakingChangeMode ?? defaultConfig.markBreakingChangeMode,
    allowBreakingChanges: promptConfig.allowBreakingChanges ?? defaultConfig.allowBreakingChanges,
    breaklineNumber: getMaxLength(config?.rules?.['body-max-line-length'] as any) === Infinity
      ? promptConfig.breaklineNumber ?? defaultConfig.breaklineNumber
      : getMaxLength(config?.rules?.['body-max-line-length'] as any),
    breaklineChar: promptConfig.breaklineChar ?? defaultConfig.breaklineChar,
    skipQuestions: promptConfig.skipQuestions ?? defaultConfig.skipQuestions,
    issuePrefixes: promptConfig.issuePrefixs ?? promptConfig.issuePrefixes ?? defaultConfig.issuePrefixes,
    customIssuePrefixAlign: promptConfig.customIssuePrefixsAlign ?? promptConfig.customIssuePrefixAlign ?? defaultConfig.customIssuePrefixAlign,
    emptyIssuePrefixAlias: promptConfig.emptyIssuePrefixsAlias ?? promptConfig.emptyIssuePrefixAlias ?? defaultConfig.emptyIssuePrefixAlias,
    customIssuePrefixAlias: promptConfig.customIssuePrefixsAlias ?? promptConfig.customIssuePrefixAlias ?? defaultConfig.customIssuePrefixAlias,
    allowCustomIssuePrefix: promptConfig.allowCustomIssuePrefixs ?? promptConfig.allowCustomIssuePrefix ?? defaultConfig.allowCustomIssuePrefix,
    allowEmptyIssuePrefix: promptConfig.allowEmptyIssuePrefixs ?? promptConfig.allowEmptyIssuePrefix ?? defaultConfig.allowEmptyIssuePrefix,
    confirmColorize: promptConfig.confirmColorize ?? defaultConfig.confirmColorize,
    maxHeaderLength: promptConfig.maxHeaderLength ?? getMaxLength(config?.rules?.['header-max-length'] as any),
    maxSubjectLength: promptConfig.maxSubjectLength ?? getMaxLength(config?.rules?.['subject-max-length'] as any),
    isIgnoreCheckMaxSubjectLength: promptConfig.isIgnoreCheckMaxSubjectLength
      || ruleIsWarning(config?.rules?.['subject-max-length'] as any)
      || ruleIsWarning(config?.rules?.['header-max-length'] as any),
    minSubjectLength: promptConfig.minSubjectLength ?? getMinLength(config?.rules?.['subject-min-length'] as any),
    defaultType: promptConfig.defaultType ?? defaultConfig.defaultType,
    defaultScope: promptConfig.defaultScope ?? defaultConfig.defaultScope,
    defaultSubject: promptConfig.defaultSubject ?? defaultConfig.defaultSubject,
    defaultBody: promptConfig.defaultBody ?? defaultConfig.defaultBody,
    defaultFooterPrefix: promptConfig.defaultFooterPrefix ?? defaultConfig.defaultFooterPrefix,
    defaultIssues: promptConfig.defaultIssues ?? defaultConfig.defaultIssues,
    useCommitSignGPG: promptConfig.useCommitSignGPG ?? defaultConfig.useCommitSignGPG,
    formatMessageCB: promptConfig.formatMessageCB ?? defaultConfig.formatMessageCB,
  }
}
