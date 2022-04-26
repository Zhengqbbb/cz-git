/**
 * Powered by Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 *
 * @description: A standalone fuzzy search / fuzzy filter. provide inquirer usage
 * @author: @Zhengqbbb (zhengqbbb@gmail.com)
 * @license: MIT
 */

import { FilterFucType, MatchOptions, MatchResult } from "../types";

/**
 * @description: If `pattern` matches `inputString`, wrap each matching character in `opts.pre`
 * and `opts.post`. If no match, return null.
 * @param {string} pattern inputString
 * @param {string} str targetString
 */
export const fuzzyMatch = (
  pattern: string,
  str: string,
  opts?: MatchOptions
): MatchResult | null => {
  opts = opts || {};
  const result = [];
  const len = str.length;
  // prefix
  const pre = opts.pre || "";
  // suffix
  const post = opts.post || "";
  // String to compare against. This might be a lowercase version of the
  // raw string
  const compareString = (opts.caseSensitive && str) || str.toLowerCase();
  let patternIdx = 0,
    totalScore = 0,
    currScore = 0,
    ch;

  pattern = (opts.caseSensitive && pattern) || pattern.toLowerCase();

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for (let idx = 0; idx < len; idx++) {
    ch = str[idx];
    if (compareString[idx] === pattern[patternIdx]) {
      ch = pre + ch + post;
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if (patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    totalScore = compareString === pattern ? Infinity : totalScore;
    return { rendered: result.join(""), score: totalScore };
  }

  return null;
};

/**
 * @description: Does `pattern` fuzzy match `inputString`?
 * @param {string} pattern inputString
 * @param {string} str targetString
 * @return {boolean} isMatch
 */
export const fuzzyTest = (pattern: string, str: string): boolean => {
  return fuzzyMatch(pattern, str) !== null;
};

/**
 * @description: The normal entry point. Filters `arr` for matches against `pattern`.
 * @param {*} pattern inputString
 * @param {*} arr targetArray
 * @param {*} opts FilterOptions
 */
export const fuzzyFilter: FilterFucType<any> = (pattern, arr, opts?) => {
  if (!arr || arr.length === 0) {
    return [];
  }
  if (typeof pattern !== "string") {
    return arr;
  }
  opts = opts || {};
  return arr
    .reduce(function (prev, element, idx) {
      let str = element;
      if (opts?.extract) {
        str = opts?.extract(element);
      }
      const rendered = fuzzyMatch(pattern, str, opts);
      if (rendered != null) {
        prev[prev.length] = {
          string: rendered.rendered,
          score: rendered.score,
          index: idx,
          original: element
        };
      }
      return prev;
    }, [])
    .sort(function (a: any, b: any) {
      const compare = b.score - a.score;
      if (compare) return compare;
      return a.index - b.index;
    });
};

/**
 * @description: Return all elements of `array` that have a fuzzy match against `pattern`.
 * @param {string} pattern inputString
 * @param {Array<string>} array targetArray
 */
export const fuzzySimpleFilter = (pattern: string, array: string[]): string[] => {
  return array.filter(function (str) {
    return fuzzyTest(pattern, str);
  });
};
