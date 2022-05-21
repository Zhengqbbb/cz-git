import { EventEmitter } from "events";
import { vitest } from "vitest";

export default class ReadlineStub extends EventEmitter {
  line: string;
  input: EventEmitter;
  constructor() {
    super();
    this.line = "";
    this.input = new EventEmitter();
  }
}

const stub = {};
Object.assign(stub, {
  write: vitest.fn(() => stub),
  moveCursor: vitest.fn(() => stub),
  setPrompt: vitest.fn(() => stub),
  close: vitest.fn(() => stub),
  pause: vitest.fn(() => stub),
  resume: vitest.fn(() => stub),
  _getCursorPos: vitest.fn(() => {
    return {
      cols: 0,
      rows: 0
    };
  }),
  output: {
    end: vitest.fn(),
    mute: vitest.fn(),
    unmute: vitest.fn(),
    __raw__: "",
    write(str: string) {
      this.__raw__ += str;
    }
  }
});

Object.assign(ReadlineStub.prototype, stub);
