/**
 * @description: generate commitizen config option(generateOptions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { commitizenConfigLoader } from "@cz-git/loader";
import type { Config, CommitizenGitOptions, UserConfig } from "../shared";
import {
  defaultConfig,
  getMaxLength,
  getMinLength,
  enumRuleIsActive,
  emptyRuleIsActive,
  getEnumList,
  getValueByCallBack
} from "../shared";

/**
 * @description: Compatibility support for cz-conventional-changelog
 */
const {
  CZ_SCOPE,
  CZ_SUBJECT,
  CZ_BODY,
  CZ_ISSUES,
  CZ_MAN_HEADER_LENGTH,
  CZ_MAN_SUBJECT_LENGTH,
  CZ_MIN_SUBJECT_LENGTH
} = process.env;

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
    useEmoji: pkgConfig.useEmoji ?? clPromptConfig.useEmoji ?? defaultConfig.useEmoji,
    scopes: pkgConfig.scopes ?? clPromptConfig.scopes ?? getEnumList(clConfig?.rules?.["scope-enum"] as any),
    scopeOverrides: pkgConfig.scopeOverrides ?? clPromptConfig.scopeOverrides ?? defaultConfig.scopeOverrides,
    enableMultipleScopes: pkgConfig.enableMultipleScopes ?? clPromptConfig.enableMultipleScopes ?? defaultConfig.enableMultipleScopes,
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
    maxHeaderLength: CZ_MAN_HEADER_LENGTH
      ? parseInt(CZ_MAN_HEADER_LENGTH)
      : clPromptConfig.maxHeaderLength ?? getMaxLength(clConfig?.rules?.["header-max-length"] as any),
    maxSubjectLength: CZ_MAN_SUBJECT_LENGTH
      ? parseInt(CZ_MAN_SUBJECT_LENGTH)
      : clPromptConfig.maxSubjectLength ?? getMaxLength(clConfig?.rules?.["subject-max-length"] as any),
    minSubjectLength: CZ_MIN_SUBJECT_LENGTH
      ? parseInt(CZ_MIN_SUBJECT_LENGTH)
      : clPromptConfig.minSubjectLength ?? getMinLength(clConfig?.rules?.["subject-min-length"] as any),
    defaultScope: CZ_SCOPE ?? clPromptConfig.defaultScope ?? defaultConfig.defaultScope,
    defaultSubject: CZ_SUBJECT ?? clPromptConfig.defaultSubject ?? defaultConfig.defaultSubject,
    defaultBody: CZ_BODY ?? clPromptConfig.defaultBody ?? defaultConfig.defaultBody,
    defaultFooterPrefix: clPromptConfig.defaultFooterPrefix ?? defaultConfig.defaultFooterPrefix,
    defaultIssues: CZ_ISSUES ?? clPromptConfig.defaultIssues ?? defaultConfig.defaultIssues
  }
}
