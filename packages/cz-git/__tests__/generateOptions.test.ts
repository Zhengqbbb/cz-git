import { generateOptions } from "../lib/loader";
import { defaultConfig } from "../lib/shared";

/**
 * @description: generateOptions Test
 */
describe("generateOptions()", () => {
  test("generate default options", () => {
    expect(generateOptions({})).toEqual(defaultConfig);
  });
});
