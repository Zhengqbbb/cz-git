/**
 * @description: generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import type { Answers, CommitizenGitOptions, Option } from "../shared";
import {
  getProcessSubject,
  getMaxSubjectLength,
  handleStandardScopes,
  handleCustomTemplate,
  log,
  isSingleItem,
  getCurrentScopes
} from "../shared";
import { generateMessage } from "./message";
import { fuzzyFilter } from "@cz-git/inquirer";

export const generateQuestions = (options: CommitizenGitOptions, cz: any) => {
  if (!Array.isArray(options.types) || options.types.length === 0) {
    if (!process.env.VITEST) log("err", "Error [types] Option");
    return false;
  }

  return [
    {
      type: "autocomplete",
      name: "type",
      message: options.messages?.type,
      source: (_: unknown, input: string) => {
        const typeSource = options.types?.concat(options.typesAppend || []) || [];
        return fuzzyFilter(input, typeSource, "value");
      }
    },
    {
      type: "autocomplete",
      name: "scope",
      message: options.messages?.scope,
      source: (answer: Answers, input: string) => {
        let scopeSource: Option[] = [];
        scopeSource = handleStandardScopes(
          getCurrentScopes(options.scopes, options.scopeOverrides, answer.type)
        );
        scopeSource = handleCustomTemplate(
          scopeSource,
          cz,
          options.customScopesAlign,
          options.emptyScopesAlias,
          options.customScopesAlias,
          options.allowCustomScopes,
          options.allowEmptyScopes,
          options.defaultScope as string
        );
        return fuzzyFilter(input, scopeSource);
      },
      when: (answer: Answers) => {
        return !isSingleItem(
          options.allowCustomScopes,
          options.allowEmptyScopes,
          handleStandardScopes(
            getCurrentScopes(options.scopes, options.scopeOverrides, answer.type)
          )
        );
      }
    },
    {
      type: "input",
      name: "scope",
      message: options.messages?.customScope,
      default: options.defaultScope || undefined,
      validate: (input: string) => {
        if (options.allowEmptyScopes) return true;
        return input.length ? true : "\u001B[1;31m[ERROR] scope is required\u001B[0m";
      },
      when: (answers: Answers) => {
        return answers.scope === "___CUSTOM___";
      }
    },
    {
      type: "input",
      name: "subject",
      message: options.messages?.subject,
      validate: (subject: string, answers: Answers) => {
        const processedSubject = getProcessSubject(subject);
        if (processedSubject.length === 0)
          return "\u001B[1;31m[ERROR] subject is required\u001B[0m";
        if (!options.minSubjectLength && !options.maxSubjectLength) {
          log("err", "Error [Subject Length] Option");
          return false;
        }
        const maxSubjectLength = getMaxSubjectLength(answers.type, answers.scope, options);
        if (options.minSubjectLength && processedSubject.length < options.minSubjectLength)
          return `\u001B[1;31m[ERROR]subject length must be greater than or equal to ${options.minSubjectLength} characters\u001B[0m`;
        if (processedSubject.length > maxSubjectLength)
          return `\u001B[1;31m[ERROR]subject length must be less than or equal to ${maxSubjectLength} characters\u001B[0m`;
        return true;
      },
      transformer: (subject: string, answers: Answers) => {
        const { minSubjectLength } = options;
        const subjectLength = subject.length;
        const maxSubjectLength = getMaxSubjectLength(answers.type, answers.scope, options);
        let tooltip;
        if (minSubjectLength !== undefined && subjectLength < minSubjectLength)
          tooltip = `${minSubjectLength - subjectLength} more chars needed`;
        else if (subjectLength > maxSubjectLength)
          tooltip = `${subjectLength - maxSubjectLength} chars over the limit`;
        else tooltip = `${maxSubjectLength - subjectLength} more chars allowed`;
        const tooltipColor =
          minSubjectLength !== undefined &&
          subjectLength >= minSubjectLength &&
          subjectLength <= maxSubjectLength
            ? "\u001B[90m"
            : "\u001B[31m";
        const subjectColor =
          minSubjectLength !== undefined &&
          subjectLength >= minSubjectLength &&
          subjectLength <= maxSubjectLength
            ? "\u001B[36m"
            : "\u001B[31m";

        return `${tooltipColor}[${tooltip}]\u001B[0m\n  ${subjectColor}${subject}\u001B[0m`;
      },
      filter: (subject: string) => {
        const upperCaseSubject = options.upperCaseSubject || false;

        return (
          (upperCaseSubject ? subject.charAt(0).toUpperCase() : subject.charAt(0).toLowerCase()) +
          subject.slice(1)
        );
      },
      default: options.defaultSubject || undefined
    },
    {
      type: "input",
      name: "body",
      message: options.messages?.body,
      default: options.defaultBody || undefined
    },
    {
      type: "input",
      name: "breaking",
      message: options.messages?.breaking,
      default: options.defaultBody || undefined,
      when: (answers: Answers) => {
        if (
          options.allowBreakingChanges &&
          answers.type &&
          options.allowBreakingChanges.includes(answers.type)
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      type: "autocomplete",
      name: "footerPrefix",
      message: options.messages?.footerPrefixsSelect,
      source: (_: Answers, input: string) => {
        const issuePrefixSource = handleCustomTemplate(
          options.issuePrefixs as Option[],
          cz,
          options.customIssuePrefixsAlign,
          options.emptyIssuePrefixsAlias,
          options.customIssuePrefixsAlias,
          options.allowCustomIssuePrefixs,
          options.allowEmptyIssuePrefixs
        );
        return fuzzyFilter(input, issuePrefixSource);
      },
      when: () =>
        !isSingleItem(
          options.allowCustomIssuePrefixs,
          options.allowEmptyIssuePrefixs,
          options.issuePrefixs
        )
    },
    {
      type: "input",
      name: "footerPrefix",
      message: options.messages?.customFooterPrefixs,
      default: options.defaultIssues || undefined,
      when: (answers: Answers) => {
        return answers.footerPrefix === "___CUSTOM___";
      }
    },
    {
      type: "input",
      name: "footer",
      default: options.defaultIssues || undefined,
      when(answers: Answers) {
        return (answers.footerPrefix as string | boolean) !== false;
      },
      message: options.messages?.footer
    },
    {
      type: "expand",
      name: "confirmCommit",
      choices: [
        { key: "y", name: "Yes", value: "yes" },
        { key: "n", name: "Abort commit", value: "no" },
        { key: "e", name: "Edit message", value: "edit" }
      ],
      default: 0,
      message(answers: Answers) {
        const SEP = options.confirmColorize
          ? "\u001B[1;90m###--------------------------------------------------------###\u001B[0m"
          : "###--------------------------------------------------------###";
        console.info(
          `\n${SEP}\n${generateMessage(answers, options, options.confirmColorize)}\n${SEP}\n`
        );
        return options.messages?.confirmCommit;
      }
    }
  ].filter(
    (i) =>
      !options.skipQuestions?.includes(
        i.name as "scope" | "body" | "breaking" | "footer" | "footerPrefix"
      )
  );
};

type GenerateQuestionsType = typeof generateQuestions;
export type QuestionsType = ReturnType<GenerateQuestionsType>;
