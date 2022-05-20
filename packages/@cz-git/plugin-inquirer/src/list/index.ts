/**
 * @description: inquirer plugin - Search List
 * Powered by `inquirer-autocomplete-prompt`
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import Base from "inquirer/lib/prompts/base";
import Choices from "inquirer/lib/objects/choices";
import observe from "inquirer/lib/utils/events";
import Paginator from "inquirer/lib/utils/paginator";
import utils from "inquirer/lib/utils/readline";
import { takeWhile } from "rxjs/operators";
import type { Interface as ReadlineInterface } from "readline";
import type { Answers, Question } from "inquirer";
import type Separator from "inquirer/lib/objects/separator";
import { style, figures } from "../shared";
import type { CZPromptQuestionOptions, ChoicesType, ChoiceType } from "../shared";

export type { CZPromptQuestionOptions } from "../shared";
export class SearchList extends Base {
  private renderChoices: ChoicesType;
  private pointer = 0;
  private choicesLen = 0;
  private firstRender = true;
  private searching = false;
  private haveSearched = false;
  private themeColorCode?: string;
  private initialValue: any = -1;
  private lastSearchInput?: string;
  private paginator: Paginator = new Paginator(this.screen, { isInfinite: true });
  private answer?: string | boolean;
  private done: any;

  constructor(questions: Question, readline: ReadlineInterface, answers: Answers) {
    super(questions, readline, answers);
    const { source, isInitDefault, themeColorCode } = this
      .opt as unknown as CZPromptQuestionOptions;
    if (!source) this.throwParamError("source");
    if (isInitDefault) this.initialValue = this.opt.default;
    if (themeColorCode) this.themeColorCode = themeColorCode;
    this.renderChoices = new Choices([], {});
  }

  /**
   * @description: Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   */
  _run(cb: any): this {
    this.done = cb;

    // Bind events
    const events = observe(this.rl);
    const dontHaveAnswer = () => this.answer === undefined;

    events.keypress.pipe(takeWhile(dontHaveAnswer)).forEach(this.onKeypress.bind(this));
    events.line.pipe(takeWhile(dontHaveAnswer)).forEach(this.onSubmit.bind(this));

    // Init the prompt
    this.search(undefined);

    return this;
  }

  /**
   * @description: render screen
   */
  render(error?: string) {
    // Render question
    let content = this.getQuestion();
    let bottomContent = "";

    // Render choices or answer depending on the state
    if (this.status === "answered") {
      this.themeColorCode
        ? (content += style.rgb(this.themeColorCode)(this.answer as string))
        : (content += style.cyan(this.answer as string));
    } else if (this.searching) {
      content += this.rl.line;
      bottomContent += "  " + style.dim("Searching...");
    } else if (this.choicesLen) {
      const choicesStr = listRender(this.renderChoices.choices, this.pointer, this.themeColorCode);
      content += this.rl.line;
      const indexPosition = this.pointer;
      let realIndexPosition = 0;
      this.renderChoices.choices.every((choice, index) => {
        if (index > indexPosition) {
          return false;
        }
        const name = choice.name;
        realIndexPosition += name ? name.split("\n").length : 0;
        return true;
      });
      const { pageSize } = this.opt as unknown as CZPromptQuestionOptions;
      bottomContent += this.paginator.paginate(choicesStr, realIndexPosition, pageSize);
    } else {
      content += this.rl.line;
      bottomContent += "  " + style.yellow("No results...");
    }

    if (this.firstRender) {
      content += style.dim("Use arrow keys or type to search");
    }
    this.firstRender = false;

    if (error) {
      bottomContent += "\n" + style.red(">> ") + error;
    }

    this.screen.render(content, bottomContent);
  }

  /**
   * @description: resolve source to get renderChoices
   */
  search(input?: string): Promise<any> {
    this.pointer = 0;

    // First render set searching state after first time
    if (this.haveSearched) {
      this.searching = true;
      this.renderChoices = new Choices([], this.answers);
      this.render();
    } else {
      this.haveSearched = true;
    }
    this.lastSearchInput = input;

    let thisPromise: Promise<any[]>;
    try {
      const { source } = this.opt as unknown as CZPromptQuestionOptions;
      const res = source(this.answers, input?.trim());
      thisPromise = Promise.resolve(res);
    } catch (err) {
      console.log(err);
      thisPromise = Promise.reject(err);
    }

    const lastPromise = thisPromise;
    // If another search is triggered before the current search finishes, don't set results
    return thisPromise.then((choices: ChoicesType["choices"]) => {
      if (thisPromise !== lastPromise) return;

      // Core
      this.renderChoices = new Choices(choices, this.answers);
      const realChoices = choices.filter((choice) => isSelectable(choice));
      this.choicesLen = realChoices.length;

      const selectedIndex = realChoices.findIndex(
        (choice) => choice === this.initialValue || choice.value === this.initialValue
      );
      if (~selectedIndex) {
        this.pointer = selectedIndex;
      }

      this.searching = false;
      this.render();
    });
  }

  /**
   * @description: resovle line Events <Enter>
   */
  onSubmit() {
    const lineOrRl = this.rl.line;

    if (typeof this.opt.validate === "function") {
      const checkValidationResult = (validationResult: string | boolean) => {
        if (validationResult !== true) {
          this.render(validationResult || "Enter something!");
        } else {
          this.onSubmitAfterValidation(lineOrRl);
        }
      };

      const validationResult = this.opt.validate(lineOrRl, this.answers);
      if (typeof validationResult === "object" && typeof validationResult.then === "function") {
        validationResult.then(checkValidationResult);
      } else {
        checkValidationResult(validationResult as string | boolean);
      }
    } else {
      this.onSubmitAfterValidation(lineOrRl);
    }
  }

  onSubmitAfterValidation(line: string) {
    if (!this.choicesLen || this.choicesLen <= this.pointer) {
      this.rl.write(line);
      this.search(line);
      return;
    }

    const choice = this.renderChoices.getChoice(this.pointer);
    this.status = "answered";
    this.answer = choice.name || choice.value;
    this.render();
    this.screen.done();
    this.done(choice.value);
  }

  /**
   * @description: Search <any key>
   */
  onKeypress(e: { key: { name?: string; ctrl?: boolean }; value: string }) {
    let len;
    const keyName = e.key?.name || "";
    if (keyName === "down" || (keyName === "n" && e.key.ctrl)) {
      len = this.choicesLen;
      this.pointer = this.pointer < len - 1 ? this.pointer + 1 : 0;
      this.ensureSelectedInRange();
      this.render();
      utils.up(this.rl, 2);
    } else if (keyName === "up" || (keyName === "p" && e.key.ctrl)) {
      len = this.choicesLen;
      this.pointer = this.pointer > 0 ? this.pointer - 1 : len - 1;
      this.ensureSelectedInRange();
      this.render();
    } else {
      this.render();
      if (this.lastSearchInput !== this.rl.line) {
        this.search(this.rl.line); // Trigger new search
      }
    }
  }

  ensureSelectedInRange() {
    const selectedIndex = Math.min(this.pointer, this.choicesLen); // Not above renderChoices length - 1
    this.pointer = Math.max(selectedIndex, 0); // Not below 0
  }
}

/**
 * Function for rendering checkbox choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */
const listRender = (
  choices: ChoicesType["choices"],
  pointer: number,
  themeColorCode?: string
): string => {
  let output = "";
  let separatorOffset = 0;

  choices.forEach((choice, i) => {
    if (choice.type === "separator") {
      separatorOffset++;
      output += " " + choice + "\n";
      return;
    }

    if (choice.disabled) {
      separatorOffset++;
      output += " - " + choice.name;
      output += ` (${typeof choice.disabled === "string" ? choice.disabled : "Disabled"})`;
      output += "\n";
      return;
    }

    const isSeleted = i - separatorOffset === pointer;
    let line = (isSeleted ? figures.pointer + " " : "  ") + choice.name;

    if (isSeleted) {
      line = themeColorCode ? style.rgb(themeColorCode)(line) : style.cyan(line);
    }

    output += line + " \n";
  });

  return output.replace(/\n$/, "");
};

/**
 * @description: check choice is selectable
 */
const isSelectable = (choice: ChoiceType<Separator["type"]>) =>
  choice.type !== "separator" && !choice.disabled;
