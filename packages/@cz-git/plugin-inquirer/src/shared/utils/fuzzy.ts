/**
 * @description: provide list and checkBox fuzzy search
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import type { FilterArrayItemType } from "../types";

/**
 * @description: inputString match targetString return match score
 * @param {string} input input string
 * @param {string} target target string
 * @param {boolean} caseSensitive isCaseSensitive, default: false
 * @return {number | null} match score. if not match return null
 */
export const fuzzyMatch = (
  input: string,
  target: string,
  caseSensitive?: boolean
): number | null => {
  if (typeof input !== "string" || typeof target !== "string") return null;
  const matchResult = [];
  const len = target.length;
  const shimTarget = (caseSensitive && target) || target.toLowerCase();
  input = (caseSensitive && input) || input.toLowerCase();
  let inputIndex = 0,
    totalScore = 0,
    currentScore = 0,
    currentChar;
  for (let idx = 0; idx < len; idx++) {
    currentChar = input[idx];
    if (shimTarget[idx] === input[inputIndex]) {
      // consecutive matches will score higher
      inputIndex += 1;
      currentScore += 1 + currentScore;
    } else {
      currentScore = 0;
    }
    totalScore += currentScore;
    matchResult[matchResult.length] = currentChar;
  }
  if (inputIndex === input.length) {
    totalScore = shimTarget === input ? Infinity : totalScore;
    return totalScore;
  }

  return null;
};

/**
 * @description: Array fuzzy filter
 * @param {string} input input string
 * @param {Array<FilterArrayItemType | unknown>} arr target Array
 * @return {Array<FilterArrayItemType>} filtered array
 */
export const fuzzyFilter = (
  input: string,
  arr: Array<FilterArrayItemType | unknown>,
  targetKey: "name" | "value" = "name"
): Array<FilterArrayItemType> => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return [];
  } else if (typeof input !== "string" || input === "") {
    return arr;
  }

  return arr
    .reduce((preVal: Array<FilterArrayItemType>, curItem: FilterArrayItemType, index) => {
      if (!curItem || !curItem[targetKey]) return preVal;
      const score = fuzzyMatch(input, curItem[targetKey]);
      if (score !== null) {
        preVal.push({
          score,
          index,
          ...curItem
        });
      }
      return preVal;
    }, [])
    .sort((a: any, b: any) => {
      const compare = b.score - a.score;
      if (compare) {
        return compare;
      } else {
        return a.index - b.index;
      }
    });
};
