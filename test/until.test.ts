import { getMaxSubjectLength } from "../lib/until";

/**
 * @description: getMaxSubjectLength Test
 */
describe("getMaxSubjectLength", () => {
  const answer = {
    type: "feat",
    scope: "cz-git"
  };

  test("underfined options subject rule", () => {
    expect(getMaxSubjectLength(undefined, undefined, {})).toEqual(Infinity);
    expect(getMaxSubjectLength(answer.type, undefined, {})).toEqual(Infinity);
    expect(getMaxSubjectLength(answer.type, answer.scope, {})).toEqual(Infinity);
  });

  test("use commitlint rule get subject max length", () => {
    const options = { maxSubjectLength: 100 };
    expect(getMaxSubjectLength(answer.type, answer.scope, options)).toEqual(100);
  });

  test("when use both maxsubject rule and maxheader rule", () => {
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 120,
        maxSubjectLength: 100
      })
    ).toEqual(86);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 120
      })
    ).toEqual(86);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 110
      })
    ).toEqual(86);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: Infinity,
        maxSubjectLength: Infinity
      })
    ).toEqual(Infinity);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: Infinity,
        maxSubjectLength: 100
      })
    ).toEqual(100);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: Infinity
      })
    ).toEqual(86);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 0
      })
    ).toEqual(0);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 0,
        maxSubjectLength: 100
      })
    ).toEqual(0);
    expect(
      getMaxSubjectLength(answer.type, answer.scope, {
        maxHeaderLength: 100,
        maxSubjectLength: 100
      })
    ).toEqual(86);
  });
});
