/**
 * @description: customizable and git support commitizen adapter
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 * @copyright: Copyright (c) 2022-present Qiubin Zheng
 */

// @ts-ignore
import autocompletePrompt from "inquirer-autocomplete-prompt";
import { generateOptions, generateQuestions } from "./loader";
import commitlintLoad from "@commitlint/load";
import type { QuestionsType } from "./loader";
import type { Answers } from "./share";

export * from "./share";

interface CommitizenType {
  registerPrompt: (type: string, plugin: unknown) => void;
  prompt: (qs: QuestionsType) => Promise<Answers>;
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const prompter = (cz: CommitizenType, commit: (message: string) => void) => {
  commitlintLoad().then((clConfig) => {
    const options = generateOptions(clConfig);
    const questions = generateQuestions(options);
    console.log(options.maxSubjectLength);
    cz.registerPrompt("autocomplete", autocompletePrompt);
    cz.prompt(questions).then((answers) => {
      console.log(answers);
      return false;
    });
  });
};
