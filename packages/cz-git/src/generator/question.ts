/**
 * @description: generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { fuzzyFilter, style } from '@cz-git/inquirer'
import type { Answers, CommitizenGitOptions, Option } from '../shared'
import {
  getCurrentScopes,
  getMaxSubjectLength,
  getProcessSubject,
  isSingleItem,
  isString,
  log,
  parseStandardScopes,
  resolveDefaultType,
  resolveListItemPinTop,
  resovleCustomListTemplate,
  useThemeCode,
} from '../shared'

export function generateQuestions(options: CommitizenGitOptions, cz: any) {
  if (!Array.isArray(options.types) || options.types.length === 0) {
    if (!process.env.VITEST)
      log('err', 'Error [types] Option')
    return false
  }

  return [
    {
      type: 'search-list',
      name: 'type',
      message: options.messages?.type,
      themeColorCode: options?.themeColorCode,
      source: (_: unknown, input: string) => {
        const typeSource = resolveListItemPinTop(
          options.types?.concat(options.typesAppend || []) || [],
          options.defaultType,
        )
        const searchTarget = options.typesSearchValue
          ? 'value'
          : 'name'
        return fuzzyFilter(input, typeSource, searchTarget)
      },
    },
    {
      type: options.enableMultipleScopes ? 'search-checkbox' : 'search-list',
      name: 'scope',
      message: options.messages?.scope,
      separator: options.scopeEnumSeparator,
      themeColorCode: options?.themeColorCode,
      initialCheckedValue: options.defaultScope, // checkbox mode
      source: (answer: Answers, input: string) => {
        let scopeSource: Option[] = []
        const _answerType = resolveDefaultType(options, answer)
        scopeSource = parseStandardScopes(
          getCurrentScopes(options.scopes, options.scopeOverrides, _answerType),
        )
        scopeSource = resovleCustomListTemplate(
          scopeSource,
          cz,
          options.customScopesAlign,
          options.emptyScopesAlias,
          options.customScopesAlias,
          options.allowCustomScopes,
          options.allowEmptyScopes,
          options.defaultScope,
          options.scopeFilters,
        )
        const searchTarget = options.scopesSearchValue
          ? 'value'
          : 'name'
        return fuzzyFilter(input, scopeSource, searchTarget)
      },
      validate: (input: string | Array<string>) => {
        if (options.allowEmptyScopes)
          return true

        if (typeof input === 'string')
          return input.length ? true : style.red('[ERROR] scope is required')
        else
          return input.length !== 0 ? true : style.red('[ERROR] scope is required')
      },
      when: (answer: Answers) => {
        const _answerType = resolveDefaultType(options, answer)
        return !isSingleItem(
          options.allowCustomScopes,
          options.allowEmptyScopes,
          parseStandardScopes(
            getCurrentScopes(options.scopes, options.scopeOverrides, _answerType),
          ),
        )
      },
    },
    {
      type: 'complete-input',
      name: 'customScope',
      message: options.messages?.customScope,
      completeValue: (
        // input mode
        isString(options.defaultScope) && (options.defaultScope as string).replace(/^___CUSTOM___:/, '')
      ) || undefined,
      validate: (input: string | Array<string>) => {
        if (options.allowEmptyScopes)
          return true
        if (typeof input === 'string')
          return input.length ? true : style.red('[ERROR] scope is required')

        else
          return input.length !== 0 ? true : style.red('[ERROR] scope is required')
      },
      when: (answers: Answers) => {
        return answers.scope === '___CUSTOM___'
          || (isString(options.defaultScope) && (options.defaultScope as string).startsWith('___CUSTOM___:'))
      },
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
    {
      type: 'complete-input',
      name: 'subject',
      message: options.messages?.subject,
      completeValue: options.defaultSubject || undefined,
      validate: (subject: string, answers: Answers) => {
        const processedSubject = getProcessSubject(subject)
        if (processedSubject.length === 0)
          return style.red('[ERROR] subject is required')
        if (!options.minSubjectLength && !options.maxSubjectLength) {
          log('err', 'Error [Subject Length] Option')
          return false
        }
        const _answerType = resolveDefaultType(options, answers)
        const maxSubjectLength = getMaxSubjectLength(_answerType, answers.scope, options)
        if (options.minSubjectLength && processedSubject.length < options.minSubjectLength) {
          return style.red(
            `[ERROR]subject length must be greater than or equal to ${options.minSubjectLength} characters`,
          )
        }
        if (processedSubject.length > maxSubjectLength) {
          return options.isIgnoreCheckMaxSubjectLength
            ? true
            : style.red(
            `[ERROR]subject length must be less than or equal to ${maxSubjectLength} characters`,
            )
        }
        return true
      },
      transformer: (subject: string, answers: Answers) => {
        const { minSubjectLength, isIgnoreCheckMaxSubjectLength } = options
        const subjectLength = subject.length
        const _answerType = resolveDefaultType(options, answers)
        const maxSubjectLength = getMaxSubjectLength(_answerType, answers.scope, options)
        let tooltip
        let isWarning = false
        if (typeof minSubjectLength === 'number' && subjectLength < minSubjectLength) {
          tooltip = `${minSubjectLength - subjectLength} more chars needed`
        }
        else if (subjectLength > maxSubjectLength) {
          if (isIgnoreCheckMaxSubjectLength) {
            tooltip = `${subjectLength - maxSubjectLength} chars over the expected`
            isWarning = true
          }
          else { tooltip = `${subjectLength - maxSubjectLength} chars over the limit` }
        }
        else {
          tooltip = `${maxSubjectLength - subjectLength} more chars allowed`
        }

        tooltip
          = (
            minSubjectLength !== undefined
            && subjectLength >= minSubjectLength
            && subjectLength <= maxSubjectLength
          )
            ? style.gray(`[${tooltip}]`)
            : isWarning
              ? style.yellow(`[${tooltip}]`)
              : style.red(`[${tooltip}]`)
        subject
          = (
            minSubjectLength !== undefined
            && subjectLength >= minSubjectLength
            && subjectLength <= maxSubjectLength
          )
            ? useThemeCode(subject, options.themeColorCode)
            : isWarning
              ? useThemeCode(subject, options.themeColorCode)
              : style.red(subject)

        return `${tooltip}\n` + ` ${subject}`
      },
      filter: (subject: string) => {
        const upperCaseSubject = options.upperCaseSubject || false

        return (
          (upperCaseSubject ? subject.charAt(0).toUpperCase() : subject.charAt(0).toLowerCase())
          + subject.slice(1)
        )
      },
    },
    {
      type: 'complete-input',
      name: 'body',
      message: options.messages?.body,
      completeValue: options.defaultBody || undefined,
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
    {
      type: 'confirm',
      name: 'markBreaking',
      message: options.messages?.markBreaking,
      default: false,
      when: () => options.markBreakingChangeMode === true,
    },
    {
      type: 'complete-input',
      name: 'breaking',
      message: options.messages?.breaking,
      completeValue: options.defaultBody || undefined,
      when: (answers: Answers) => {
        const _answerType = resolveDefaultType(options, answers)
        if (
          options.allowBreakingChanges
          && _answerType
          && options.allowBreakingChanges.includes(_answerType)
        )
          return true

        else
          return answers.markBreaking || Boolean(process.env.break === '1') || false
      },
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
    {
      type: 'search-list',
      name: 'footerPrefix',
      message: options.messages?.footerPrefixsSelect || options.messages?.footerPrefixesSelect,
      themeColorCode: options?.themeColorCode,
      source: (_: Answers, input: string) => {
        const issuePrefixSource = resovleCustomListTemplate(
          options.issuePrefixes as Option[],
          cz,
          options.customIssuePrefixAlign,
          options.emptyIssuePrefixAlias,
          options.customIssuePrefixAlias,
          options.allowCustomIssuePrefix,
          options.allowEmptyIssuePrefix,
        )
        return fuzzyFilter(input, issuePrefixSource)
      },
      when: () =>
        !isSingleItem(
          options.allowCustomIssuePrefix,
          options.allowEmptyIssuePrefix,
          options.issuePrefixes,
        ),
    },
    {
      type: 'complete-input',
      name: 'customFooterPrefix',
      message: options.messages?.customFooterPrefixs || options.messages?.customFooterPrefix,
      completeValue: options.defaultFooterPrefix || undefined,
      when: (answers: Answers) => {
        return answers.footerPrefix === '___CUSTOM___'
      },
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
    {
      type: 'complete-input',
      name: 'footer',
      completeValue: options.defaultIssues || undefined,
      when(answers: Answers) {
        return (answers.footerPrefix as string | boolean) !== false
      },
      message: options.messages?.footer,
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
  ].filter(
    i =>
      !options.skipQuestions?.includes(
        i.name as 'scope' | 'body' | 'breaking' | 'footer' | 'footerPrefix' | 'confirmCommit',
      ),
  )
}

type GenerateQuestionsType = typeof generateQuestions
export type QuestionsType = ReturnType<GenerateQuestionsType>
