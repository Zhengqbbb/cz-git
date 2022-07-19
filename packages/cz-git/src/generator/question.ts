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
  handleCustomTemplate,
  handlePinListTop,
  handleStandardScopes,
  isSingleItem,
  log,
} from '../shared'
import { generateMessage } from './message'

const useThemeCode = (input: string, themeColorCode?: string) =>
  themeColorCode ? style.rgb(themeColorCode)(input) : style.cyan(input)

export const generateQuestions = (options: CommitizenGitOptions, cz: any) => {
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
        const typeSource = handlePinListTop(
          options.types?.concat(options.typesAppend || []) || [],
          options.defaultType,
        )
        return fuzzyFilter(input, typeSource, 'value')
      },
    },
    {
      type: options.enableMultipleScopes ? 'search-checkbox' : 'search-list',
      name: 'scope',
      message: options.messages?.scope,
      themeColorCode: options?.themeColorCode,
      separator: options.scopeEnumSeparator,
      source: (answer: Answers, input: string) => {
        let scopeSource: Option[] = []
        scopeSource = handleStandardScopes(
          getCurrentScopes(options.scopes, options.scopeOverrides, answer.type),
        )
        scopeSource = handleCustomTemplate(
          scopeSource,
          cz,
          options.customScopesAlign,
          options.emptyScopesAlias,
          options.customScopesAlias,
          options.allowCustomScopes,
          options.allowEmptyScopes,
          options.defaultScope as string,
          options.scopeFilters,
        )
        return fuzzyFilter(input, scopeSource)
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
        return !isSingleItem(
          options.allowCustomScopes,
          options.allowEmptyScopes,
          handleStandardScopes(
            getCurrentScopes(options.scopes, options.scopeOverrides, answer.type),
          ),
        )
      },
    },
    {
      type: 'complete-input',
      name: 'customScope',
      message: options.messages?.customScope,
      completeValue: options.defaultScope || undefined,
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
      },
      transformer: (input: string) => useThemeCode(input, options.themeColorCode),
    },
    {
      type: 'complete-input',
      name: 'subject',
      message: options.messages?.subject,
      validate: (subject: string, answers: Answers) => {
        const processedSubject = getProcessSubject(subject)
        if (processedSubject.length === 0)
          return style.red('[ERROR] subject is required')
        if (!options.minSubjectLength && !options.maxSubjectLength) {
          log('err', 'Error [Subject Length] Option')
          return false
        }
        const maxSubjectLength = getMaxSubjectLength(answers.type, answers.scope, options)
        if (options.minSubjectLength && processedSubject.length < options.minSubjectLength) {
          return style.red(
            `[ERROR]subject length must be greater than or equal to ${options.minSubjectLength} characters`,
          )
        }
        if (processedSubject.length > maxSubjectLength) {
          return style.red(
            `[ERROR]subject length must be less than or equal to ${maxSubjectLength} characters`,
          )
        }
        return true
      },
      transformer: (subject: string, answers: Answers) => {
        const { minSubjectLength } = options
        const subjectLength = subject.length
        const maxSubjectLength = getMaxSubjectLength(answers.type, answers.scope, options)
        let tooltip
        if (minSubjectLength !== undefined && subjectLength < minSubjectLength)
          tooltip = `${minSubjectLength - subjectLength} more chars needed`
        else if (subjectLength > maxSubjectLength)
          tooltip = `${subjectLength - maxSubjectLength} chars over the limit`
        else tooltip = `${maxSubjectLength - subjectLength} more chars allowed`
        tooltip
          = minSubjectLength !== undefined
          && subjectLength >= minSubjectLength
          && subjectLength <= maxSubjectLength
            ? style.gray(`[${tooltip}]`)
            : style.red(`[${tooltip}]`)
        subject
          = minSubjectLength !== undefined
          && subjectLength >= minSubjectLength
          && subjectLength <= maxSubjectLength
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
      completeValue: options.defaultSubject || undefined,
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
        if (
          options.allowBreakingChanges
          && answers.type
          && options.allowBreakingChanges.includes(answers.type)
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
      message: options.messages?.footerPrefixsSelect,
      themeColorCode: options?.themeColorCode,
      source: (_: Answers, input: string) => {
        const issuePrefixSource = handleCustomTemplate(
          options.issuePrefixs as Option[],
          cz,
          options.customIssuePrefixsAlign,
          options.emptyIssuePrefixsAlias,
          options.customIssuePrefixsAlias,
          options.allowCustomIssuePrefixs,
          options.allowEmptyIssuePrefixs,
        )
        return fuzzyFilter(input, issuePrefixSource)
      },
      when: () =>
        !isSingleItem(
          options.allowCustomIssuePrefixs,
          options.allowEmptyIssuePrefixs,
          options.issuePrefixs,
        ),
    },
    {
      type: 'complete-input',
      name: 'customFooterPrefixs',
      message: options.messages?.customFooterPrefixs,
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
    {
      type: 'expand',
      name: 'confirmCommit',
      choices: [
        { key: 'y', name: 'Yes', value: 'yes' },
        { key: 'n', name: 'Abort commit', value: 'no' },
        { key: 'e', name: 'Edit message(wq: save, cq: exit)', value: 'edit' },
      ],
      default: 0,
      message(answers: Answers) {
        const SEP = options.confirmColorize
          ? style.gray('###--------------------------------------------------------###')
          : '###--------------------------------------------------------###'
        console.info(
          `\n${SEP}\n${generateMessage(answers, options, options.confirmColorize)}\n${SEP}\n`,
        )
        return options.messages?.confirmCommit
      },
    },
  ].filter(
    i =>
      !options.skipQuestions?.includes(
        i.name as 'scope' | 'body' | 'breaking' | 'footer' | 'footerPrefix',
      ),
  )
}

type GenerateQuestionsType = typeof generateQuestions
export type QuestionsType = ReturnType<GenerateQuestionsType>
