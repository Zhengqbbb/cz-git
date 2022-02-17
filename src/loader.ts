/**
 * @description: generate commitizen config option(generateOptions) | generate commitizen questions(generateQuestions)
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

// @ts-ignore
import { configLoader } from "commitizen";
import { defaultConfig } from "./share";
import { getMaxLength, getMinLength, log } from "./until";
import type { Config, commitizenGitOptions } from "./share";

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

// export const generateQuestions = (options: commitizenGitOptions) => {
//   if (!Array.isArray(options.types)) {
//     log("err", "Error [types] Option")
//   }
//   const defaultTypes = options!.types!.map((i) => {
//     return { [i.value]: i }
//   });
//   console.log(defaultTypes);
//   console.log(Object.entries(defaultTypes));
//   return [
//     {
//       type: "autocomplete",
//       name: "type",
//       message: options.messages?.type,
//       default: defaultTypes,
//       // @ts-ignore
//       source: (_: unknown, input: string) => Object.entries(defaultTypes)
//         .filter(([key]) => input ? key.includes(input) : true )
//         .map(([key, { name }]) => ({
//           name,
//           value: key
//         }))
//     }
//   ];
// };

export const generateQuestions = (options: commitizenGitOptions) => {
  if (!Array.isArray(options.types)) {
    log("err", "Error [types] Option")
  }
  return [
    {
      type: "autocomplete",
      name: "type",
      message: options.messages?.type,
      default: options.types,
      source: (_: unknown, input: string) => options.types
        ?.filter(item => input ? item.value.includes(input) : true) || true
    }
  ];
};

type GenerateQuestionsType = typeof generateQuestions
export type QuestionsType = ReturnType<GenerateQuestionsType>
