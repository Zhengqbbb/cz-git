import process from "node:process";
import { test, expect, describe, beforeEach, afterAll, vitest } from "vitest";
import { isColorizenSupport, createStyle } from "../src";

/**
 * @description: utils - isColorizenSupport Test
 */
describe("isColorizenSupport()", () => {
  const env = process.env;
  beforeEach(() => {
    vitest.resetModules();
    process.env = { ...env };
    delete process.env.NO_COLOR;
    process.env.TERM = "xterm-256color";
  });
  afterAll(() => {
    process.env = env;
  });
  test("default user should be true", () => {
    expect(isColorizenSupport()).toBe(true);
  });
  test("param force false should be false", () => {
    expect(isColorizenSupport(false)).toBe(false);
  });
  test("NO_COLOR should be false", () => {
    process.env.NO_COLOR = "true";
    expect(isColorizenSupport()).toBe(false);
  });
  test("TERM is dumb should be false", () => {
    delete process.env.CI;
    process.env.TERM = "dumb";
    expect(isColorizenSupport()).toBe(false);
  });
});

/**
 * @description: utils - style Test
 */
describe("style()", () => {
  test("force unenable color shoule be normal", () => {
    const style = createStyle(false);
    expect(style.cyan("hello world")).toBe("hello world");
    expect(style.bold(style.white("hello"))).toBe("hello");
    expect(style.bold(" Add plugin " + style.yellow("hello"))).toBe(" Add plugin hello");
  });
  test("default use ouput should be right", () => {
    const style = createStyle(true);
    expect(style.bold("hello")).toBe("\u001b[1mhello\u001b[0m");
    expect(style.cyan("hello")).toBe("\u001b[36mhello\u001b[0m");
    expect(style.gray("hello")).toBe("\u001b[90mhello\u001b[0m");
    expect(style.bold(" Add plugin " + style.yellow("hello"))).toBe(
      "\u001b[1m Add plugin \u001b[33mhello\u001b[0m\u001b[0m"
    );
  });
  test("if param error should be not output", () => {
    const style = createStyle();
    // @ts-ignore
    expect(style.bold("hello", [])).toBe("\u001b[1mhello\u001b[0m");
  });
});
