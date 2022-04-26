import type { Answers, KeyUnion, Question } from "inquirer";

export interface ComplateCheckboxQuestionOptions<T extends Answers = Answers> extends Question<T> {
  /**
   * The key to save the answer to the answers-hash.
   */
  type: "autocomplete";

  /**
   * The key to save the answer to the answers-hash.
   */
  name: KeyUnion<T>;

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
  suggestOnly?: boolean | undefined;

  /**
   * Is the text shown when searching. Defaults: Searching...
   */
  searchText?: boolean | undefined;

  /**
   *  Is the text shown if the search returns no results. Defaults: No results...
   */
  emptyText?: boolean | undefined;
}
