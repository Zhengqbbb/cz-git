import type { Answers, Question } from "inquirer";
import type Separator from "inquirer/lib/objects/separator";

export interface ChoiceType<T> {
  name: string;
  type: string | T;
  short: string;
  value: string;
  line: string;
  disabled: boolean;
  checked: boolean;
  index: number;
}

export interface ChoicesType {
  choices: ChoiceType<Separator["type"]>[];
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
  /**
   * Function to determine what options to display to user.
   * Called with previous answers object and the current user input each time the user types, it must return a promise.
   */
  source: (answersSoFar: T, input: string | undefined) => Promise<any[]>;

  /**
   * The number of elements to show on each page.
   */
  pageSize?: number | undefined;

  /**
   * default false. Setting it to true turns the input into a normal text input.
   */
  isInitDefault?: boolean | undefined;

  /**
   * Is the text shown when searching. Defaults: Searching...
   */
  // searchText?: boolean | undefined;

  /**
   *  Is the text shown if the search returns no results. Defaults: No results...
   */
  // emptyText?: boolean | undefined;
}
