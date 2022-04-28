import { test, expect, describe } from "vitest";
import { fuzzyMatch } from "../src";

/**
 * @description: fuzzyMatch Test
 */
describe("fuzzyMatch", () => {
  test("function should be check param fit", () => {
    expect(fuzzyMatch(null, null)).toBe(null);
    expect(fuzzyMatch(undefined, null)).toBe(null);
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
