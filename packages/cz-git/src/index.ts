/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 * TODO: add more test to protect code
 */

// @ts-ignore
import autocompletePrompt from "inquirer-autocomplete-prompt";
import { commitilintConfigLoader } from "@cz-git/loader";
import { generateOptions, generateQuestions } from "./loader";
import { buildCommit, editCommit, log } from "./until";
import type { CommitizenType } from "./share";

export * from "./share";

export const prompter = (cz: CommitizenType, commit: (message: string) => void) => {
  commitilintConfigLoader().then((clConfig) => {
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
