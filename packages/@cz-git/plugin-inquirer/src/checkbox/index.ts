/**
 * @description: inquirer plugin - Search Checkbox
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
import type { SearchPromptQuestionOptions, ChoicesType, ChoiceType } from "../shared";

export type { SearchPromptQuestionOptions } from "../shared";
export class SearchCheckbox extends Base {
  private renderChoices: ChoicesType;
  private originChoices: ChoiceType<string>[] = [];
  private pointer = 0;
  private choicesLen = 0;
  private selection: (string | boolean)[] = [];
  private firstRender = true;
  private searching = false;
  private haveSearched = false;
  private themeColorCode?: string;
  private initialValue: any = -1;
  private lastSearchInput?: string;
  private paginator: Paginator = new Paginator(this.screen, { isInfinite: true });
  private separator = " ,";
  private answer?: boolean;
  private done: any;

  constructor(questions: Question, readline: ReadlineInterface, answers: Answers) {
    super(questions, readline, answers);
    const { source, separator, isInitDefault, themeColorCode } = this
      .opt as unknown as SearchPromptQuestionOptions;
    if (!source) this.throwParamError("source");
    if (typeof separator === "string") this.separator = separator;
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
    events.spaceKey.pipe(takeWhile(dontHaveAnswer)).forEach(this.onChoice.bind(this));
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
        ? (content += style.rgb(this.themeColorCode)(this.selection.join(this.separator)))
        : (content += style.cyan(this.selection.join(this.separator)));
    } else if (this.searching) {
      content += this.rl.line;
      bottomContent += "  " + style.dim("Searching...");
    } else if (this.choicesLen) {
      const choicesStr = choicesRender(
        this.renderChoices.choices,
        this.pointer,
        this.themeColorCode
      );
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
      const { pageSize } = this.opt as unknown as SearchPromptQuestionOptions;
      bottomContent += this.paginator.paginate(choicesStr, realIndexPosition, pageSize);
    } else {
      content += this.rl.line;
      bottomContent += "  " + style.yellow("No results...");
    }

    if (this.firstRender) {
      content += style.dim("Press <space>|<right> to select, <enter> to submit");
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
      const { source } = this.opt as unknown as SearchPromptQuestionOptions;
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
      const filterChoiced: (string | boolean)[] = this.originChoices
        .filter((org) => org.checked)
        .map((org) => org.value);
      choices = choices.map((cur) => {
        if (filterChoiced.includes(cur.value)) cur.checked = true;
        return cur;
      });
      this.renderChoices = new Choices(choices, this.answers);
      const realChoices = choices.filter((choice) => isSelectable(choice));
      this.choicesLen = realChoices.length;
      if (this.firstRender) {
        this.originChoices = JSON.parse(JSON.stringify(this.renderChoices.realChoices));
      }

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
   * @description: resolve choice
   */
  onChoice() {
    const item = this.renderChoices.realChoices[this.pointer];
    if (item && item.value) {
      const checked = !item.checked;
      this.renderChoices.realChoices[this.pointer].checked = checked;
      this.originChoices.forEach((i) => {
        if (i.value && i.value === item.value) i.checked = checked;
      });
    }
    this.render();
  }

  /**
   * @description: resovle line Events <Enter>
   */
  onSubmit() {
    let checkedChoices: ChoiceType<string>[];
    // provide cz-git submit on <custom> item
    if (this.renderChoices.realChoices[this.pointer]?.value === "___CUSTOM___") {
      checkedChoices = this.originChoices.filter((item) => item.value === "___CUSTOM___");
    } else {
      checkedChoices = this.originChoices.filter((item) => item.checked && !item.disabled);
    }

    if (typeof this.opt.validate === "function") {
      const checkValidationResult = (validationResult: string | boolean) => {
        if (validationResult !== true) {
          this.render(validationResult || "choice something!");
        } else {
          this.onSubmitAfterValidation(checkedChoices);
        }
      };

      const validationResult = this.opt.validate(checkedChoices, this.answers);
      if (typeof validationResult === "object" && typeof validationResult.then === "function") {
        validationResult.then(checkValidationResult);
      } else {
        checkValidationResult(validationResult as string | boolean);
      }
    } else {
      this.onSubmitAfterValidation(checkedChoices);
    }
  }

  onSubmitAfterValidation(choices: ChoiceType<string>[]) {
    const isCustom = choices.length === 1 && choices[0].value === "___CUSTOM___";
    this.selection = isCustom
      ? choices.map((item) => item.name)
      : choices.map((item) => item.value);
    this.status = "answered";
    this.answer = true;
    this.render();
    this.screen.done();
    this.done(isCustom ? choices[0].value : this.selection);
  }

  /**
   * @description: Search <any key>
   */
  onKeypress(e: { key: { name?: string; ctrl?: boolean }; value: string }) {
    let len;
    const keyName = e.key?.name || "";

    /**
     * NOTE: use ansiEscapes and write move cursor can't work in this.rl
     * so force change this.rl
     */
    if (keyName === "space") {
      const input = this.rl.line?.trim();
      // @ts-ignore
      this.rl.line = input;
      // @ts-ignore
      this.rl.cursor = input.length;
      this.render();
    } else if (keyName === "right") {
      this.onChoice();
    } else if (keyName === "tab" || keyName === "down" || (keyName === "n" && e.key.ctrl)) {
      if (keyName === "tab") {
        const input = this.rl.line?.trim();
        // @ts-ignore
        this.rl.line = input;
        // @ts-ignore
        this.rl.cursor = input.length;
        this.render();
      }
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
const choicesRender = (
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
    } else {
      const line =
        choice.value === false || choice.value === "___CUSTOM___"
          ? figures.squareSmallFilled + " " + choice.name
          : getCheckbox(choice.checked || false) + " " + choice.name;
      if (i - separatorOffset === pointer) {
        themeColorCode
          ? (output += style.rgb(themeColorCode)(
              " " + figures.pointer + style.rgb(themeColorCode)(line)
            ))
          : (output += style.cyan(" " + figures.pointer + line));
      } else {
        output += "  " + line;
      }
    }

    output += "\n";
  });

  return output.replace(/\n$/, "");
};

/**
 * Get the checkbox
 * @param  {Boolean} checked - add a X or not to the checkbox
 * @return {String} Composited checkbox string
 */
const getCheckbox = (checked: boolean): string => {
  return checked ? style.green(figures.radioOn) : figures.radioOff;
};

/**
 * @description: check choice is selectable
 */
const isSelectable = (choice: ChoiceType<Separator["type"]>) =>
  choice.type !== "separator" && !choice.disabled;
