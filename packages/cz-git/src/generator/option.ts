/**
 * @description: generate commitizen config option(generateOptions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { commitizenConfigLoader } from "@cz-git/loader";
import {
  defaultConfig,
  enumRuleIsActive,
  emptyRuleIsActive,
  getEnumList,
  getValueByCallBack,
  getMaxLength,
  getMinLength
} from "../shared";
import type { Config, CommitizenGitOptions, UserConfig } from "../shared";

const { emoji, checkbox } = process.env;

const pkgConfig: Config = commitizenConfigLoader() ?? {};

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const generateOptions = (clConfig: UserConfig): CommitizenGitOptions => {
  let clPromptConfig = clConfig.prompt ?? {};
  clPromptConfig = getValueByCallBack(
    clPromptConfig,
    ["defaultScope", "defaultSubject", "defaultBody", "defaultFooterPrefix", "defaultIssues"]
  )
  return {
    messages: pkgConfig.messages ?? clPromptConfig.messages ?? defaultConfig.messages,
    types: pkgConfig.types ?? clPromptConfig.types ?? defaultConfig.types,
    typesAppend: pkgConfig.typesAppend ?? clPromptConfig.typesAppend ?? defaultConfig.typesAppend,
    useEmoji: Boolean(emoji) ?? pkgConfig.useEmoji ?? clPromptConfig.useEmoji ?? defaultConfig.useEmoji,
    scopes: pkgConfig.scopes ?? clPromptConfig.scopes ?? getEnumList(clConfig?.rules?.["scope-enum"] as any),
    scopeOverrides: pkgConfig.scopeOverrides ?? clPromptConfig.scopeOverrides ?? defaultConfig.scopeOverrides,
    enableMultipleScopes: Boolean(checkbox) ?? pkgConfig.enableMultipleScopes ?? clPromptConfig.enableMultipleScopes ?? defaultConfig.enableMultipleScopes,
    scopeEnumSeparator: pkgConfig.scopeEnumSeparator ?? clPromptConfig.scopeEnumSeparator ?? defaultConfig.scopeEnumSeparator,
    allowCustomScopes: pkgConfig.allowCustomScopes ?? clPromptConfig.allowCustomScopes ?? !enumRuleIsActive(clConfig?.rules?.["scope-enum"] as any),
    allowEmptyScopes: pkgConfig.allowEmptyScopes ?? clPromptConfig.allowEmptyScopes ?? !emptyRuleIsActive(clConfig?.rules?.["scope-empty"] as any),
    customScopesAlign: pkgConfig.customScopesAlign ?? clPromptConfig.customScopesAlign ?? defaultConfig.customScopesAlign,
    customScopesAlias: pkgConfig.customScopesAlias ?? clPromptConfig.customScopesAlias ?? defaultConfig.customScopesAlias,
    emptyScopesAlias: pkgConfig.emptyScopesAlias ?? clPromptConfig.emptyScopesAlias ?? defaultConfig.emptyScopesAlias,
    upperCaseSubject: pkgConfig.upperCaseSubject ?? clPromptConfig.upperCaseSubject ?? defaultConfig.upperCaseSubject,
    allowBreakingChanges: pkgConfig.allowBreakingChanges ?? clPromptConfig.allowBreakingChanges ?? defaultConfig.allowBreakingChanges,
    breaklineNumber: getMaxLength(clConfig?.rules?.["body-max-line-length"] as any) === Infinity
      ? pkgConfig.breaklineNumber ?? clPromptConfig.breaklineNumber ?? defaultConfig.breaklineNumber
      : getMaxLength(clConfig?.rules?.["body-max-line-length"] as any),
    breaklineChar: pkgConfig.breaklineChar ?? clPromptConfig.breaklineChar ?? defaultConfig.breaklineChar,
    skipQuestions: pkgConfig.skipQuestions ?? clPromptConfig.skipQuestions ?? defaultConfig.skipQuestions,
    issuePrefixs: pkgConfig.issuePrefixs ?? clPromptConfig.issuePrefixs ?? defaultConfig.issuePrefixs,
    customIssuePrefixsAlign: pkgConfig.customIssuePrefixsAlign ?? clPromptConfig.customIssuePrefixsAlign ?? defaultConfig.customIssuePrefixsAlign,
    emptyIssuePrefixsAlias: pkgConfig.emptyIssuePrefixsAlias ?? clPromptConfig.emptyIssuePrefixsAlias ?? defaultConfig.emptyIssuePrefixsAlias,
    customIssuePrefixsAlias: pkgConfig.customIssuePrefixsAlias ?? clPromptConfig.customIssuePrefixsAlias ?? defaultConfig.customIssuePrefixsAlias,
    allowCustomIssuePrefixs: pkgConfig.allowCustomIssuePrefixs ?? clPromptConfig.allowCustomIssuePrefixs ?? defaultConfig.allowCustomIssuePrefixs,
    allowEmptyIssuePrefixs: pkgConfig.allowEmptyIssuePrefixs ?? clPromptConfig.allowEmptyIssuePrefixs ?? defaultConfig.allowEmptyIssuePrefixs,
    confirmColorize: pkgConfig.confirmColorize ?? clPromptConfig.confirmColorize ?? defaultConfig.confirmColorize,
    maxHeaderLength: clPromptConfig.maxHeaderLength ?? getMaxLength(clConfig?.rules?.["header-max-length"] as any),
    maxSubjectLength: clPromptConfig.maxSubjectLength ?? getMaxLength(clConfig?.rules?.["subject-max-length"] as any),
    minSubjectLength: clPromptConfig.minSubjectLength ?? getMinLength(clConfig?.rules?.["subject-min-length"] as any),
    defaultScope: clPromptConfig.defaultScope ?? defaultConfig.defaultScope,
    defaultSubject: clPromptConfig.defaultSubject ?? defaultConfig.defaultSubject,
    defaultBody: clPromptConfig.defaultBody ?? defaultConfig.defaultBody,
    defaultFooterPrefix: clPromptConfig.defaultFooterPrefix ?? defaultConfig.defaultFooterPrefix,
    defaultIssues: clPromptConfig.defaultIssues ?? defaultConfig.defaultIssues
  }
}
