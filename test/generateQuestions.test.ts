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
  const getQuestion = (index: number) => {
    const question = generateQuestions(options, mockedCz);
    if (question) {
      return question[index - 1];
    } else {
      return undefined;
    }
  };

  test("test questions be returned", () => {
    options = {
      types: [{ value: "feat", name: "feat: my feat" }]
    };
    expect(getQuestion(1)?.name).toEqual("type");
  });
});
