import { generateOptions } from "../lib/generator";
import { defaultConfig } from "../lib/shared";

/**
 * @description: generateOptions Test
 */
describe("generateOptions()", () => {
  test("generate default options should be equal default config", () => {
    expect(generateOptions({})).toEqual(defaultConfig);
  });
});
