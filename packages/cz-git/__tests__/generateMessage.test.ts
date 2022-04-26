import { generateMessage } from "../lib/generator";

/**
 * @description: generateMessage Test
 */
describe("generateMessage()", () => {
  const answers = {
    type: "feat",
    scope: "app",
    subject: "add a new feature"
  };

  test("subject with default subject should be standard separator", () => {
    const options = {};
    expect(generateMessage(answers, options)).toEqual("feat(app): add a new feature");
  });

  test("subject with emoji options should be standard separator", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature", emoji: ":sparkles:" }],
      useEmoji: true
    };
    expect(generateMessage(answers, options)).toEqual("feat(app): :sparkles: add a new feature");
  });

  test("subject with emoji options and lost type should be standard separator", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      useEmoji: true
    };
    expect(generateMessage(answers, options)).toEqual("feat(app): add a new feature");
  });

  test("body breaking line should be with breaklineNumber", () => {
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
    expect(generateMessage(answers, options)).toEqual(
      `feat(app): add a new feature

test breaklineNumber
test breaklineNumber`
    );
  });
});
