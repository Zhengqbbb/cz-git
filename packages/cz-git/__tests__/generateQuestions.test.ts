/**
 * @description: generateQuestions Test
 */

import { generateQuestions } from "../lib/loader";

describe("generateQuestions()", () => {
  let options: any;

  beforeEach(() => {
    options = {};
  });

  const mockedCz = {
    Separator: {}
  };
  const fn = () => "";
  const getQuestion = (index: number) => {
    const question = generateQuestions(options, mockedCz);
    if (question) {
      return question[index - 1];
    } else {
      return undefined;
    }
  };

  test("error config be return false and print log", () => {
    expect(generateQuestions({}, undefined)).toBe(false);
  });

  test("test questions be returned", () => {
    options = {
      types: [{ value: "feat", name: "feat: this is a feature" }]
    };
    // test question 1 - type
    expect(getQuestion(1)?.name).toEqual("type");
    expect(getQuestion(1)?.type).toEqual("autocomplete");
    const mockTypesSourceFn = getQuestion(1)?.source || fn;
    expect(mockTypesSourceFn({}, "f")).toEqual([
      {
        value: "feat",
        name: "feat: this is a feature"
      }
    ]);
  });
});
