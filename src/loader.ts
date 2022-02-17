/**
 * @description: generate commitizen config option(generateOptions) | generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

// @ts-ignore
import { configLoader } from "commitizen";
import { defaultConfig } from "./share";
import { getMaxLength, getMinLength, getProcessSubject, getMaxSubjectLength, log } from "./until";
import type { Answers, Config, commitizenGitOptions } from "./share";

/**
 * @description: Compatibility support for cz-conventional-changelog
 */
const { CZ_MAX_HEADER_WIDTH, CZ_MAN_SUBJECT_LENGTH, CZ_MIN_SUBJECT_LENGTH, CZ_MAX_LINE_WIDTH } =
  process.env;

const pkgConfig: Config = configLoader.load() ?? {};

/* eslint-disable prettier/prettier */
/* prettier-ignore */
export const generateOptions = (clConfig: any): commitizenGitOptions => {
  const clPromptConfig = clConfig.prompt ?? {};
  return {
    messages: pkgConfig.messages ?? clPromptConfig.message ?? defaultConfig.messages,
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
    maxHeaderWidth: CZ_MAX_HEADER_WIDTH ? parseInt(CZ_MAX_HEADER_WIDTH) : getMaxLength(clConfig?.rules?.["header-max-length"]),
    maxSubjectLength: CZ_MAN_SUBJECT_LENGTH ? parseInt(CZ_MAN_SUBJECT_LENGTH) : getMaxLength(clConfig?.rules?.["subject-max-length"]),
    minSubjectLength: CZ_MIN_SUBJECT_LENGTH ? parseInt(CZ_MIN_SUBJECT_LENGTH) : getMinLength(clConfig?.rules?.["subject-min-length"]),
    maxLineWidth: CZ_MAX_LINE_WIDTH ? parseInt(CZ_MAX_LINE_WIDTH) : getMaxLength(clConfig?.rules?.["max-line-width"]),
  }
}

export const generateQuestions = (options: commitizenGitOptions, cz: any) => {
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
        let scopes: Array<{ name: string }> = [];
        if (options.scopeOverrides && answer.type && options.scopeOverrides[answer.type]) {
          scopes = scopes.concat(options.scopeOverrides[answer.type]);
        } else if (Array.isArray(options.scopes)) {
          scopes = scopes.concat(options.scopes);
        }
        if (options.allowCustomScopes || scopes.length === 0) {
          // TODO: add align option
          scopes = scopes.concat([
            // TODO: option
            new cz.Separator(""),
            // TODO: option
            { name: "empty", value: false },
            { name: "custom", value: "custom" }
          ]);
        }
        return scopes?.filter((item) => (input ? item.name?.includes(input) : true)) || true;
      }
    },
    {
      type: "input",
      name: "scope",
      message: options.messages?.customScope,
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
      }
    }
  ];
};

type GenerateQuestionsType = typeof generateQuestions;
export type QuestionsType = ReturnType<GenerateQuestionsType>;
