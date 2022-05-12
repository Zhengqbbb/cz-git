import { test, expect, describe } from "vitest";
import { fuzzyFilter, fuzzyMatch } from "../src";

/**
 * @description: utils - fuzzyMatch Test
 */
describe("fuzzyMatch", () => {
  test("function should be check param fit", () => {
    // @ts-ignore
    expect(fuzzyMatch(null, null)).toBe(null);
    // @ts-ignore
    expect(fuzzyMatch(undefined, null)).toBe(null);
    // @ts-ignore
    expect(fuzzyMatch(undefined, undefined)).toBe(null);
    // @ts-ignore
    expect(fuzzyMatch([], [])).toBe(null);
    // @ts-ignore
    expect(fuzzyMatch({}, {})).toBe(null);
  });

  test("match char should be return right score", () => {
    expect(fuzzyMatch("a", "Apple")).toEqual(1);
    expect(fuzzyMatch("ae", "Apple")).toEqual(2);
    expect(fuzzyMatch("ap", "Apple")).toEqual(4);
    expect(fuzzyMatch("app", "Apple")).toEqual(11);
    expect(fuzzyMatch("ban", "banana")).toEqual(11);
    expect(fuzzyMatch("bna", "banana")).toEqual(5);
    expect(fuzzyMatch("baaa", "banana")).toEqual(6);
  });

  test("consistent case should be return same score", () => {
    expect(fuzzyMatch("sz", "shenzhen")).toEqual(fuzzyMatch("sz", "ShenZhen"));
  });

  test("case sensitive should be return diff score", () => {
    expect(fuzzyMatch("sz", "shenzhen", true)).toEqual(2);
    expect(fuzzyMatch("sz", "ShenZhen", true)).toEqual(null);
  });

  test("not match char should be return null", () => {
    expect(fuzzyMatch("k", "banana")).toEqual(null);
    expect(fuzzyMatch("kkkkkk", "banana")).toEqual(null);
    expect(fuzzyMatch("bne", "banana")).toEqual(null);
    expect(fuzzyMatch("bnae", "banana")).toEqual(null);
  });

  test("all match should be return Infinity", () => {
    expect(fuzzyMatch("apple", "Apple")).toEqual(Infinity);
    expect(fuzzyMatch("Apple", "Apple")).toEqual(Infinity);
  });
});

/**
 * @description: utils - fuzzyFilter Test
 */
describe("fuzzyFilter", () => {
  const testArr = [
    { name: "cz-git", value: "cz-git" },
    { name: "plugin-inquirer", value: "plugin-inquirer" },
    { name: "plugin-loader", value: "plugin-loader" },
    { type: "separator", line: "\x1B[2m──────────────\x1B[22m" },
    { name: "custom", value: "___CUSTOM__" },
    { name: "empty", value: false }
  ];

  test("function should be check param fit", () => {
    expect(fuzzyFilter("", [])).toEqual([]);
    // @ts-ignore
    expect(fuzzyFilter("", undefined)).toEqual([]);
    // @ts-ignore
    expect(fuzzyFilter(undefined, undefined)).toEqual([]);
    // @ts-ignore
    expect(fuzzyFilter("", null)).toEqual([]);
  });

  test("empty input should be return origin array", () => {
    expect(fuzzyFilter("", testArr)).toBe(testArr);
  });

  test("normal match should be return right array", () => {
    expect(fuzzyFilter("cz-git", testArr)).toEqual([
      { name: "cz-git", value: "cz-git", index: 0, score: Infinity }
    ]);
    expect(fuzzyFilter("ty", testArr)).toEqual([
      { name: "empty", value: false, index: 5, score: 4 }
    ]);
    expect(fuzzyFilter("inq", testArr)).toEqual([
      { name: "plugin-inquirer", value: "plugin-inquirer", index: 1, score: 5 }
    ]);
    expect(fuzzyFilter("ii", testArr)).toEqual([
      { name: "plugin-inquirer", value: "plugin-inquirer", index: 1, score: 2 }
    ]);
  });

  test("same score shoule be return sort by index", () => {
    expect(fuzzyFilter("plu", testArr)).toEqual([
      { name: "plugin-inquirer", value: "plugin-inquirer", index: 1, score: 11 },
      { name: "plugin-loader", value: "plugin-loader", index: 2, score: 11 }
    ]);
  });

  test("diff score shoule be return sort by score", () => {
    const testArr = [
      { name: "anapple", value: "apple" },
      { name: "aapple", value: "apple" },
      { name: "apple", value: "apple" }
    ];
    expect(fuzzyFilter("ap", testArr)).toEqual([
      { name: "apple", value: "apple", index: 2, score: 4 },
      { name: "anapple", value: "apple", index: 0, score: 2 },
      { name: "aapple", value: "apple", index: 1, score: 2 }
    ]);
    expect(fuzzyFilter("aap", testArr)).toEqual([
      { name: "aapple", value: "apple", index: 1, score: 11 },
      { name: "anapple", value: "apple", index: 0, score: 5 }
    ]);
  });
});
