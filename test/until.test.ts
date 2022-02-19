import { getMaxLength } from "../lib/until";
import { Rule } from "../lib/until";

/**
 * @description: getMaxLength Test
 */
describe("getMaxLength()", () => {
  test("use commitlint rule get subject max length", () => {
    const clConfig = {
      rules: {
        "subject-max-length": [2, "always", 80]
      }
    };
    expect(getMaxLength(clConfig.rules["subject-max-length"] as unknown as Rule)).toEqual(80);
  });

  test("underfined commitlint subject rule", () => {
    const clConfig = {
      rules: {
        "subject-max-length": undefined
      }
    };
    expect(getMaxLength(clConfig.rules["subject-max-length"] as unknown as Rule)).toEqual(Infinity);
  });
});

// TODO: getMinLength

// TODO: getEmojiStrLength
