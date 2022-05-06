/**
 * @description: provide inquirer plugin util Function
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import process from "node:process";
import type { ChoiceType } from "../types";

/**
 * @description check the term is support unicode
 */
export const isUnicodeSupport = () => {
  if (process.platform !== "win32") {
    return process.env.TERM !== "linux"; // Linux console (kernel)
  }

  return (
    Boolean(process.env.CI) ||
    Boolean(process.env.WT_SESSION) || // Windows Terminal
    process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu and cmder
    process.env.TERM_PROGRAM === "vscode" ||
    process.env.TERM === "xterm-256color" ||
    process.env.TERM === "alacritty" ||
    process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm"
  );
};

/**
 * @description: check the target is Promise
 */
export const isPromise = (target: any) => {
  return typeof target === "object" && typeof target.then === "function";
};

/**
 * @description: check choice is selectable
 */
export const isSelectable = (choice: ChoiceType) => choice.type !== "separator" && !choice.disabled;
