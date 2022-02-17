/**
 * @description: generate commitizen config option(generateOptions) | generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

// @ts-ignore
import { configLoader } from "commitizen";
import { defaultConfig } from "./share";
import { getMaxLength, getMinLength, log } from "./until";
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

export const generateQuestions = (options: commitizenGitOptions, cz:any) => {
  if (!Array.isArray(options.types)) {
    log("err", "Error [types] Option");
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
          scopes = scopes.concat([
            new cz.Separator(),
            { name: 'empty', value: false },
            { name: 'custom', value: 'custom' },
          ]);
        }
        return scopes?.filter((item) => (input ? item.name?.includes(input) : true)) || true;
      }
    },
    {
      type: 'input',
      name: 'scope',
      message: options.messages?.customScope,
      when(answers: Answers) {
        return answers.scope === 'custom';
      },
    },
  ];
};

type GenerateQuestionsType = typeof generateQuestions;
export type QuestionsType = ReturnType<GenerateQuestionsType>;
