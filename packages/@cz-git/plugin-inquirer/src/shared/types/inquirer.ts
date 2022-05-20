import type { Answers, Question } from "inquirer";
import type Separator from "inquirer/lib/objects/separator";

export interface ChoiceType<T> {
  name: string;
  type: string | T;
  short: string;
  value: string | boolean;
  line: string;
  disabled: boolean;
  checked: boolean;
}

export interface ChoicesType {
  /**
   * @description: origin choices
   */
  choices: ChoiceType<Separator["type"]>[];
  /**
   * @description: filter Separator choices
   */
  realChoices: ChoiceType<string>[];
}

export interface BaseOptionType {
  pageSize: number;
  default?: any;
}

export interface CZPromptOptionType extends BaseOptionType {
  source: ChoiceType<Separator["type"]>[];
  isInitDefault: boolean;
}
export interface CZPromptQuestionOptions<T extends Answers = Answers> extends Question<T> {
  separator: string;

  /**
   * @description: support rgb color code. e.g: `38;5;036`
   * @default: cyan
   */
  themeColorCode?: string;

  /**
   * @description:
   * Function to determine what options to display to user.
   * Called with previous answers object and the current user input each time the user types, it must return a promise.
   */
  source: (answersSoFar: T, input: string | undefined) => Promise<any[]>;

  /**
   * @description: The number of elements to show on each page.
   */
  pageSize?: number | undefined;

  /**
   * @description:
   * default false. Setting it to true turns the input into a normal text input.
   */
  isInitDefault?: boolean | undefined;
}
