import { buildCommit } from "../lib/until";

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

  test("subject with emoji options standard separator", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" }],
      useEmoji: true
    };
    expect(buildCommit(answers, options)).toEqual("feat(app): :sparkles: add a new feature");
  });

  test("subject with emoji options and lost type standard separator", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      useEmoji: true
    };
    expect(buildCommit(answers, options)).toEqual("feat(app): add a new feature");
  });

  test("body breaking line with breaklineNumber", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      breaklineNumber: 20
    };
    const answers = {
      type: "feat",
      scope: "app",
      subject: "add a new feature",
      body: "test breaklineNumber test breaklineNumber"
    };
    expect(buildCommit(answers, options)).toEqual(
      `feat(app): add a new feature

test breaklineNumber
test breaklineNumber`
    );
  });
});
