/**
 * @description: inquirer plugin - ComplateCheckbox
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import type { Answers, Question } from "inquirer";
// import Choices from "inquirer/lib/objects/choices";
import Base from "inquirer/lib/prompts/base";
import { Interface as ReadlineInterface } from "readline";
import { ComplateCheckboxQuestionOptions } from "../shared";

export class ComplateCheckbox extends Base {
  // private currentChoices: Choices<Answers> = new Choices([], {});
  // private firstRender = true;
  // private selected = 0;

  constructor(questions: Question, readline: ReadlineInterface, answers: Answers) {
    super(questions, readline, answers);

    const { source } = this.opt as unknown as ComplateCheckboxQuestionOptions;
    if (!source) {
      this.throwParamError("source");
    }
  }
}
