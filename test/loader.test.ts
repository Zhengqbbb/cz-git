import { buildCommit } from "../src/until";

/**
 * @description: buildCommit Test
 */
describe("buildCommit()", () => {
  const answers = {
    type: "feat",
    scope: "app",
    subject: "add a new feature"
  };
  test("subject with default subject standard separator", () => {
    const options = {};
    expect(buildCommit(answers, options)).toEqual("feat(app): add a new feature");
  });
});
