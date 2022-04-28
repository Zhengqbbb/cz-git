import { test, expect, describe } from "vitest";
import { generateOptions } from "../src/generator";
import { defaultConfig } from "../src/shared";

/**
 * @description: generateOptions Test
 */
describe("generateOptions()", () => {
  test("generate default options should be equal default config", () => {
    expect(generateOptions({})).toEqual(defaultConfig);
  });
});
