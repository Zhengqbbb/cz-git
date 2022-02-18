/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

// @ts-ignore
import autocompletePrompt from "inquirer-autocomplete-prompt";
import commitlintLoad from "@commitlint/load";
import { generateOptions, generateQuestions } from "./loader";
import { buildCommit, editCommit, log } from "./until";
import type { CommitizenType } from "./share";

export * from "./share";

export const prompter = (cz: CommitizenType, commit: (message: string) => void) => {
  commitlintLoad().then((clConfig) => {
    const options = generateOptions(clConfig);
    const questions = generateQuestions(options, cz);
    cz.registerPrompt("autocomplete", autocompletePrompt);
    cz.prompt(questions).then((answers) => {
      switch (answers.confirmCommit) {
        case "edit":
          editCommit(answers, options, commit);
          break;

        case "yes":
          commit(buildCommit(answers, options));
          break;

        default:
          log("info", "Commit has been canceled.");
          break;
      }
    });
  });
};
