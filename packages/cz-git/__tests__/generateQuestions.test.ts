import { test, expect, describe, beforeEach } from "vitest";
import { generateQuestions } from "../src/generator";

/**
 * @description: generateQuestions Test
 */

describe("generateQuestions()", () => {
  let options: any;

  beforeEach(() => {
    options = {};
  });

  const mockedCz = {
    Separator: function () {
      return this;
    }
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

  test("error config should be return false and print log", () => {
    expect(generateQuestions({}, undefined)).toBe(false);
  });

  test("test questions should be returned", () => {
    options = {
      types: [{ value: "feat", name: "feat: this is a feature" }],
      scopes: ["cz-git"]
    };
    // test question 1 - type
    expect(getQuestion(1)?.name).toEqual("type");
    expect(getQuestion(1)?.type).toEqual("search-list");
    let mockTypesSourceFn = getQuestion(1)?.source || fn;
    expect(mockTypesSourceFn({}, "f")).toEqual([
      {
        value: "feat",
        name: "feat: this is a feature",
        index: 0,
        score: 1
      }
    ]);

    // test question 2 - scope
    expect(getQuestion(2)?.name).toEqual("scope");
    expect(getQuestion(2)?.type).toEqual("search-list");
    mockTypesSourceFn = getQuestion(2)?.source || fn;
    expect(mockTypesSourceFn({}, "")).toEqual([
      { name: "empty", value: false },
      { name: "custom", value: "___CUSTOM___" },
      {},
      { name: "cz-git", value: "cz-git" }
    ]);
    expect(mockTypesSourceFn({}, "cz")).toEqual([
      { name: "cz-git", value: "cz-git", index: 3, score: 4 }
    ]);
    expect(mockTypesSourceFn({}, "em")).toEqual([
      { name: "empty", value: false, index: 0, score: 4 }
    ]);
    expect(mockTypesSourceFn({}, "cu")).toEqual([
      { name: "custom", value: "___CUSTOM___", index: 1, score: 4 }
    ]);
    expect(mockTypesSourceFn({}, "aaa")).toEqual([]);
  });
});
