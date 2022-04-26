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
import { generateOptions, generateQuestions } from "./generator";
import { buildCommit, editCommit, log } from "./shared";
import type { CommitizenType, QualifiedConfig, UserConfig } from "./shared/types";

export * from "./shared/types";

export const prompter = (cz: CommitizenType, commit: (message: string) => void) => {
  commitilintConfigLoader().then((clConfig: QualifiedConfig) => {
    const options = generateOptions(clConfig as unknown as UserConfig);
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
