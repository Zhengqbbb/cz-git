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
} from '../shared'
import type { CommitizenGitOptions, UserConfig } from '../shared'

export const generateOptions = (config: UserConfig): CommitizenGitOptions => {
  const { emoji, checkbox, ___X_CMD_THEME_COLOR_CODE } = process.env
  const promptConfig = config.prompt ?? {}

  return {
    alias: promptConfig.alias ?? defaultConfig.alias,
    messages: promptConfig.messages ?? defaultConfig.messages,
    themeColorCode: ___X_CMD_THEME_COLOR_CODE || promptConfig.themeColorCode || defaultConfig.themeColorCode,
    types: promptConfig.types ?? defaultConfig.types,
    typesAppend: promptConfig.typesAppend ?? defaultConfig.typesAppend,
    useEmoji: Boolean(emoji === '1') || promptConfig.useEmoji || defaultConfig.useEmoji,
    emojiAlign: promptConfig.emojiAlign || defaultConfig.emojiAlign,
    scopes: promptConfig.scopes ?? getEnumList(config?.rules?.['scope-enum'] as any),
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
    issuePrefixs: promptConfig.issuePrefixs ?? defaultConfig.issuePrefixs,
    customIssuePrefixsAlign: promptConfig.customIssuePrefixsAlign ?? defaultConfig.customIssuePrefixsAlign,
    emptyIssuePrefixsAlias: promptConfig.emptyIssuePrefixsAlias ?? defaultConfig.emptyIssuePrefixsAlias,
    customIssuePrefixsAlias: promptConfig.customIssuePrefixsAlias ?? defaultConfig.customIssuePrefixsAlias,
    allowCustomIssuePrefixs: promptConfig.allowCustomIssuePrefixs ?? defaultConfig.allowCustomIssuePrefixs,
    allowEmptyIssuePrefixs: promptConfig.allowEmptyIssuePrefixs ?? defaultConfig.allowEmptyIssuePrefixs,
    confirmColorize: promptConfig.confirmColorize ?? defaultConfig.confirmColorize,
    maxHeaderLength: promptConfig.maxHeaderLength ?? getMaxLength(config?.rules?.['header-max-length'] as any),
    maxSubjectLength: promptConfig.maxSubjectLength ?? getMaxLength(config?.rules?.['subject-max-length'] as any),
    minSubjectLength: promptConfig.minSubjectLength ?? getMinLength(config?.rules?.['subject-min-length'] as any),
    defaultType: promptConfig.defaultType ?? defaultConfig.defaultType,
    defaultScope: promptConfig.defaultScope ?? defaultConfig.defaultScope,
    defaultSubject: promptConfig.defaultSubject ?? defaultConfig.defaultSubject,
    defaultBody: promptConfig.defaultBody ?? defaultConfig.defaultBody,
    defaultFooterPrefix: promptConfig.defaultFooterPrefix ?? defaultConfig.defaultFooterPrefix,
    defaultIssues: promptConfig.defaultIssues ?? defaultConfig.defaultIssues,
  }
}
