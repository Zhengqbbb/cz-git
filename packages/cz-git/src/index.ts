/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 * TODO: add more test to protect code
 */

import { SearchCheckbox } from "@cz-git/inquirer";
import { configLoader } from "@cz-git/loader";
// @ts-ignore
import autocompletePrompt from "inquirer-autocomplete-prompt";
import { editCommit, log } from "./shared";
import { generateOptions, generateQuestions, generateMessage } from "./generator";
import type { CommitizenType } from "./shared";

export * from "./shared/types";

export const prompter = (cz: CommitizenType, commit: (message: string) => void) => {
  configLoader().then((config) => {
    const options = generateOptions(config);
    const questions = generateQuestions(options, cz);
    cz.registerPrompt("autocomplete", autocompletePrompt);
    cz.registerPrompt("search-checkbox", SearchCheckbox);
    cz.prompt(questions).then((answers) => {
      switch (answers.confirmCommit) {
        case "edit":
          editCommit(answers, options, commit);
          break;

        case "yes":
          commit(generateMessage(answers, options));
          break;

        default:
          log("info", "Commit has been canceled.");
          break;
      }
    });
  });
};
