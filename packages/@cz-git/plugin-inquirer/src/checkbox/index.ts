/**
 * @description: inquirer plugin - ComplateCheckbox
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import cliCursor from "cli-cursor";
import { map, takeUntil } from "rxjs/operators";
import Base from "inquirer/lib/prompts/base";
import Choices from "inquirer/lib/objects/choices";
import observe from "inquirer/lib/utils/events";
import Paginator from "inquirer/lib/utils/paginator";
import utils from "inquirer/lib/utils/readline";
import type { Interface as ReadlineInterface } from "readline";
import type { Answers, Question } from "inquirer";
import type { CZPromptQuestionOptions, ChoicesType } from "../shared";
import { style, figures } from "../shared";
import { isSelectable } from "../shared/utils/inquirer";
import { takeWhile } from "rxjs/operators";

export class SearchCheckbox extends Base {
  // private choices: Choice[] = [];
  private currentChoices: ChoicesType;
  private searching = false;
  private firstRender = true;
  private haveSearched = false;
  private pointer = 0;
  private nbChoices = 0;
  private lastSearchInput = "";
  private selection: string[] = [];
  private paginator: Paginator = new Paginator(this.screen, { isInfinite: true });
  private answer: any = undefined;
  private initialValue: any = -1;
  private done: any;

  constructor(questions: Question, readline: ReadlineInterface, answers: Answers) {
    super(questions, readline, answers);

    const { source, isInitDefault } = this.opt as unknown as CZPromptQuestionOptions;
    if (!source) this.throwParamError("source");
    if (isInitDefault) this.initialValue = this.opt.default;
    this.currentChoices = new Choices([], {});
  }

  /**
   * Start the Inquiry session
   * @param  {Function} cb      Callback when prompt is done
   * @return {this}
   */
  _run(cb: any): this {
    this.done = cb;

    // Bind events
    const events = observe(this.rl);
    const dontHaveAnswer = () => this.answer === undefined;

    const validation = this.handleSubmitEvents(events.line.pipe(map(this.onSubmit.bind(this))));
    validation.success.forEach(this.onEnd.bind(this));
    validation.error.forEach(this.onError.bind(this));
    events.spaceKey.pipe(takeUntil(validation.success)).forEach(this.onSpaceKey.bind(this));
    // events.keypress.pipe(takeUntil(validation.success)).forEach(this.onKeyPress.bind(this));
    events.keypress
      .pipe(takeWhile(dontHaveAnswer)) // $FlowFixMe[method-unbinding]
      .forEach(this.onKeyPress.bind(this));

    // Init the prompt
    cliCursor.hide();
    this.search(undefined);

    return this;
  }

  render(error?: string) {
    // Render question
    let content = this.getQuestion();
    let bottomContent = "";

    // Render choices or answer depending on the state
    if (this.status === "answered") {
      content += style.cyan(this.selection.join(", "));
    } else if (this.searching) {
      content += this.rl.line;
      bottomContent += "  " + style.dim("Searching...");
    } else if (this.nbChoices) {
      const choicesStr = choicesRender(this.currentChoices.choices, this.pointer);
      content += this.rl.line;
      const indexPosition = this.pointer;
      let realIndexPosition = 0;
      this.currentChoices.choices.every((choice, index) => {
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
    }

    if (this.firstRender) {
      content += style.dim("Press <space> to select, <enter> to submit");
      bottomContent += "\n" + style.dim("(Use arrow keys or type to search)");
    }
    if (error) {
      bottomContent = style.red(">> ") + error;
    }

    this.firstRender = false;
    this.screen.render(content, bottomContent);
  }

  search(input?: string): Promise<any> {
    this.pointer = 0;

    // First render set searching state after first time
    if (this.haveSearched) {
      this.searching = true;
      this.currentChoices = new Choices([], this.answer);
      this.render();
    } else {
      this.haveSearched = true;
    }

    let thisPromise: Promise<any[]>;
    try {
      const { source } = this.opt as unknown as CZPromptQuestionOptions;
      const res = source(this.answers, input);
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
      this.currentChoices = new Choices(choices, this.answer);
      const realChoices = choices.filter((choice) => isSelectable(choice));
      this.nbChoices = realChoices.length;

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

  toggleChoice(index: number) {
    console.log("toggleChoice", index);
  }

  onSpaceKey() {
    // this.rl.line = this.rl.line.trim(); // remove space from input
    this.toggleChoice(this.pointer);
    this.render();
  }

  /**
   * @description: handleSubmitEvents <Enter>
   */
  onSubmit() {
    console.log("onSubmit");
    // const choices = this.currentChoices.filter((item) => item.type === "separator" && item.checked);

    // this.selection = choices.map((item) => item.short);
    // return choices.map((item) => item.value);
  }

  /**
   * @description: Search <any key>
   */
  onKeyPress(e: { key: { name?: string; ctrl?: boolean }; value: string }) {
    let len;
    const keyName = e.key?.name || "";
    if (keyName === "down" || (keyName === "n" && e.key.ctrl)) {
      len = this.nbChoices;
      this.pointer = this.pointer < len - 1 ? this.pointer + 1 : 0;
      this.ensureSelectedInRange();
      this.render();
      utils.up(this.rl, 2);
    } else {
      this.render();
      if (this.lastSearchInput !== this.rl.line) {
        this.search(this.rl.line); // Trigger new search
      }
    }
    // console.log(keyName);
    // this.pointer = 0;
    // this.filterChoices();
  }

  ensureSelectedInRange() {
    const selectedIndex = Math.min(this.pointer, this.nbChoices); // Not above currentChoices length - 1
    this.pointer = Math.max(selectedIndex, 0); // Not below 0
  }

  onEnd(state: any) {
    this.status = "answered";

    // Rerender prompt (and clean subline error)
    this.render();

    this.screen.done();
    cliCursor.show();
    this.done(state.value);
  }

  onError(state: any) {
    this.render(state.isValid);
  }
}

/**
 * Function for rendering checkbox choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */
function choicesRender(choices: ChoicesType["choices"], pointer: number): string {
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
      const line = getCheckbox(choice.checked || false) + " " + choice.name;
      if (i - separatorOffset === pointer) {
        output += style.cyan(" " + figures.pointer + style.cyan(line));
      } else {
        output += "  " + line;
      }
    }

    output += "\n";
  });

  return output.replace(/\n$/, "");
}

/**
 * Get the checkbox
 * @param  {Boolean} checked - add a X or not to the checkbox
 * @return {String} Composited checkbox string
 */
function getCheckbox(checked: boolean): string {
  return checked ? style.green(figures.radioOn) : figures.radioOff;
}
