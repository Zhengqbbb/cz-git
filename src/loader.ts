/**
 * @description: generate commitizen config option(generateOptions) | generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

// @ts-ignore
import { configLoader } from "commitizen";
import { defaultConfig, Option } from "./share";
import {
  getMaxLength,
  getMinLength,
  getProcessSubject,
  getMaxSubjectLength,
  handleScopes,
  buildCommit,
  log
} from "./until";
import type { Answers, Config, CommitizenGitOptions } from "./share";

/**
 * @description: Compatibility support for cz-conventional-changelog
 */
/* prettier-ignore */
const {
  CZ_SCOPE,
  CZ_SUBJECT,
  CZ_BODY,
  CZ_ISSUES,
  CZ_MAN_SUBJECT_LENGTH,
  CZ_MIN_SUBJECT_LENGTH,
} = process.env;

const pkgConfig: Config = configLoader.load() ?? {};

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const generateOptions = (clConfig: any): CommitizenGitOptions => {
  const clPromptConfig = clConfig.prompt ?? {};
  return {
    messages: pkgConfig.messages ?? clPromptConfig.messages ?? defaultConfig.messages,
    types: pkgConfig.types ?? clPromptConfig.types ?? defaultConfig.types,
    useEmoji: pkgConfig.useEmoji ?? clPromptConfig.useEmoji ?? defaultConfig.useEmoji,
    scopes: pkgConfig.scopes ?? clPromptConfig.scopes ?? defaultConfig.scopes,
    scopeOverrides: pkgConfig.scopeOverrides ?? clPromptConfig.scopeOverrides ?? defaultConfig.scopeOverrides,
    allowCustomScopes: pkgConfig.allowCustomScopes ?? clPromptConfig.allowCustomScopes ?? defaultConfig.allowCustomScopes,
    upperCaseSubject: pkgConfig.upperCaseSubject ?? clPromptConfig.upperCaseSubject ?? defaultConfig.upperCaseSubject,
    allowBreakingChanges: pkgConfig.allowBreakingChanges ?? clPromptConfig.allowBreakingChanges ?? defaultConfig.allowBreakingChanges,
    skipQuestions: pkgConfig.skipQuestions ?? clPromptConfig.skipQuestions ?? defaultConfig.skipQuestions,
    issuePrefixs: pkgConfig.issuePrefixs ?? clPromptConfig.issuePrefixs ?? defaultConfig.issuePrefixs,
    confirmNoColor: pkgConfig.confirmNoColor ?? clPromptConfig.confirmNoColor ?? defaultConfig.confirmNoColor,
    maxSubjectLength: CZ_MAN_SUBJECT_LENGTH ? parseInt(CZ_MAN_SUBJECT_LENGTH) : getMaxLength(clConfig?.rules?.["subject-max-length"]),
    minSubjectLength: CZ_MIN_SUBJECT_LENGTH ? parseInt(CZ_MIN_SUBJECT_LENGTH) : getMinLength(clConfig?.rules?.["subject-min-length"]),
    defaultScope: CZ_SCOPE ?? clPromptConfig.defaultScope ?? "",
    defaultSubject: CZ_SUBJECT ?? clPromptConfig.defaultSubject ?? "",
    defaultBody: CZ_BODY ?? clPromptConfig.defaultBody ?? "",
    defaultIssues: CZ_ISSUES ?? clPromptConfig.defaultIssues ?? ""
  }
}

export const generateQuestions = (options: CommitizenGitOptions, cz: any) => {
  if (!Array.isArray(options.types) || options.types.length === 0) {
    log("err", "Error [types] Option");
    return false;
  }
  return [
    {
      type: "autocomplete",
      name: "type",
      message: options.messages?.type,
      source: (_: unknown, input: string) =>
        options.types?.filter((item) => (input ? item.value.includes(input) : true)) || true
    },
    {
      type: "autocomplete",
      name: "scope",
      message: options.messages?.scope,
      source: (answer: Answers, input: string) => {
        let scopes: Option[] = [];
        if (options.scopeOverrides && answer.type && options.scopeOverrides[answer.type]) {
          scopes = scopes.concat(handleScopes(options.scopeOverrides[answer.type]));
        } else if (Array.isArray(options.scopes)) {
          scopes = scopes.concat(handleScopes(options.scopes));
        }
        if (options.allowCustomScopes || scopes.length === 0) {
          // TODO: add align option
          scopes = scopes.concat([
            // TODO: option
            new cz.Separator(""),
            // TODO: option
            { value: false, name: "empty" },
            { value: "custom", name: "custom" }
          ]);
        }
        return scopes?.filter((item) => (input ? item.name?.includes(input) : true)) || true;
      }
    },
    {
      type: "input",
      name: "scope",
      message: options.messages?.customScope,
      default: options.defaultScope || undefined,
      when(answers: Answers) {
        return answers.scope === "custom";
      }
    },
    {
      type: "input",
      name: "subject",
      message: options.messages?.subject,
      validate(subject: string, answers: Answers) {
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
      filter(subject: string) {
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
      when(answers: Answers) {
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
      name: "footerPrefixsSelect",
      message: options.messages?.footerPrefixsSelect,
      source: (_: Answers, input: string) => {
        let issues: Array<{ name: string; value: string }> = [
          { name: "skip", value: false },
          { name: "custom", value: "custom" },
          new cz.Separator("")
        ];
        if (Array.isArray(options.issuePrefixs)) {
          issues = issues.concat(options.issuePrefixs);
        }
        return issues?.filter((item) => (input ? item.name?.includes(input) : true)) || true;
      }
    },
    {
      type: "input",
      name: "footerPrefixsSelect",
      message: options.messages?.customFooterPrefixs,
      default: options.defaultIssues || undefined,
      when(answers: Answers) {
        return answers.footerPrefixsSelect === "custom";
      }
    },
    {
      type: "input",
      name: "footer",
      when(answers: Answers) {
        return (answers.footerPrefixsSelect as string | boolean) !== false;
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
        // TODO: COLOR
        const SEP =
          "\u001B[1;90m###--------------------------------------------------------###\u001B[0m";
        console.info(`\n${SEP}\n${buildCommit(answers, options, true)}\n${SEP}\n`);
        return options.messages?.confirmCommit;
      }
    }
  ].filter((i) => !options.skipQuestions?.includes(i.name));
};

type GenerateQuestionsType = typeof generateQuestions;
export type QuestionsType = ReturnType<GenerateQuestionsType>;
