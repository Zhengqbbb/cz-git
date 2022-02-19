import { generateOptions } from "../lib/loader";
import { defaultConfig } from "../lib/share";

/**
 * @description: generateOptions Test
 */
describe("generateOptions()", () => {
  test("generate default options", () => {
    expect(generateOptions({})).toEqual(defaultConfig);
  });
});
