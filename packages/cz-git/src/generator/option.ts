/**
 * @description: generate commitizen config option(generateOptions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import {
  defaultConfig,
  enumRuleIsActive,
  emptyRuleIsActive,
  getEnumList,
  getMaxLength,
  getMinLength
} from "../shared";
import type { CommitizenGitOptions, UserConfig } from "../shared";

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const generateOptions = (config: UserConfig): CommitizenGitOptions => {
  const { emoji, checkbox, ___X_CMD_THEME_COLOR_CODE } = process.env;
  const promptConfig = config.prompt ?? {};

  return {
    messages: promptConfig.messages ?? defaultConfig.messages,
    themeColorCode: ___X_CMD_THEME_COLOR_CODE || promptConfig.themeColorCode || defaultConfig.themeColorCode,
    types: promptConfig.types ?? defaultConfig.types,
    typesAppend: promptConfig.typesAppend ?? defaultConfig.typesAppend,
    useEmoji: Boolean(emoji) || promptConfig.useEmoji || defaultConfig.useEmoji,
    scopes: promptConfig.scopes ?? getEnumList(config?.rules?.["scope-enum"] as any),
    scopeOverrides: promptConfig.scopeOverrides ?? defaultConfig.scopeOverrides,
    scopeFilters: promptConfig.scopeFilters ?? defaultConfig.scopeFilters,
    enableMultipleScopes: Boolean(checkbox) || promptConfig.enableMultipleScopes || defaultConfig.enableMultipleScopes,
    scopeEnumSeparator: promptConfig.scopeEnumSeparator ?? defaultConfig.scopeEnumSeparator,
    allowCustomScopes: promptConfig.allowCustomScopes ?? !enumRuleIsActive(config?.rules?.["scope-enum"] as any),
    allowEmptyScopes: promptConfig.allowEmptyScopes ?? !emptyRuleIsActive(config?.rules?.["scope-empty"] as any),
    customScopesAlign: promptConfig.customScopesAlign ?? defaultConfig.customScopesAlign,
    customScopesAlias: promptConfig.customScopesAlias ?? defaultConfig.customScopesAlias,
    emptyScopesAlias: promptConfig.emptyScopesAlias ?? defaultConfig.emptyScopesAlias,
    upperCaseSubject: promptConfig.upperCaseSubject ?? defaultConfig.upperCaseSubject,
    allowBreakingChanges: promptConfig.allowBreakingChanges ?? defaultConfig.allowBreakingChanges,
    breaklineNumber: getMaxLength(config?.rules?.["body-max-line-length"] as any) === Infinity
      ? promptConfig.breaklineNumber ?? defaultConfig.breaklineNumber
      : getMaxLength(config?.rules?.["body-max-line-length"] as any),
    breaklineChar: promptConfig.breaklineChar ?? defaultConfig.breaklineChar,
    skipQuestions: promptConfig.skipQuestions ?? defaultConfig.skipQuestions,
    issuePrefixes: promptConfig.issuePrefixes ?? defaultConfig.issuePrefixes,
    customIssuePrefixesAlign: promptConfig.customIssuePrefixesAlign ?? defaultConfig.customIssuePrefixesAlign,
    emptyIssuePrefixesAlias: promptConfig.emptyIssuePrefixesAlias ?? defaultConfig.emptyIssuePrefixesAlias,
    customIssuePrefixesAlias: promptConfig.customIssuePrefixesAlias ?? defaultConfig.customIssuePrefixesAlias,
    allowCustomIssuePrefixes: promptConfig.allowCustomIssuePrefixes ?? defaultConfig.allowCustomIssuePrefixes,
    allowEmptyIssuePrefixes: promptConfig.allowEmptyIssuePrefixes ?? defaultConfig.allowEmptyIssuePrefixes,
    confirmColorize: promptConfig.confirmColorize ?? defaultConfig.confirmColorize,
    maxHeaderLength: promptConfig.maxHeaderLength ?? getMaxLength(config?.rules?.["header-max-length"] as any),
    maxSubjectLength: promptConfig.maxSubjectLength ?? getMaxLength(config?.rules?.["subject-max-length"] as any),
    minSubjectLength: promptConfig.minSubjectLength ?? getMinLength(config?.rules?.["subject-min-length"] as any),
    defaultType: promptConfig.defaultType ?? defaultConfig.defaultType,
    defaultScope: promptConfig.defaultScope ?? defaultConfig.defaultScope,
    defaultSubject: promptConfig.defaultSubject ?? defaultConfig.defaultSubject,
    defaultBody: promptConfig.defaultBody ?? defaultConfig.defaultBody,
    defaultFooterPrefix: promptConfig.defaultFooterPrefix ?? defaultConfig.defaultFooterPrefix,
    defaultIssues: promptConfig.defaultIssues ?? defaultConfig.defaultIssues
  }
}
