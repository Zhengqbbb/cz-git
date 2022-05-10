/**
 * @description: provide inquirer plugin util Function
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license MIT
 */

import type Separator from "inquirer/lib/objects/separator";
import type { ChoiceType } from "../types";

/**
 * @description: check the target is Promise
 */
export const isPromise = (target: any) => {
  return typeof target === "object" && typeof target.then === "function";
};

/**
 * @description: check choice is selectable
 */
export const isSelectable = (choice: ChoiceType<Separator["type"]>) =>
  choice.type !== "separator" && !choice.disabled;
