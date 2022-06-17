import { test, expect, describe } from "vitest";
import { generateMessage } from "../src/generator";

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

  test("hit single scope should be output scope", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      scopes: ["app"],
      allowCustomScopes: false,
      allowEmptyScopes: false
    };
    const answers = {
      type: "feat",
      subject: "add a new feature"
    };
    expect(generateMessage(answers, options)).toEqual("feat(app): add a new feature");
  });

  test("both hit single footerPrefix should be output right", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      issuePrefixes: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
      allowCustomIssuePrefixes: false,
      allowEmptyIssuePrefixes: false
    };
    const answers = {
      type: "feat",
      subject: "add a new feature",
      footer: "#12"
    };
    expect(generateMessage(answers, options)).toEqual(
      `feat: add a new feature

closed #12`
    );
  });

  test("both hit single footerPrefix but not footer should be not output", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      issuePrefixes: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
      allowCustomIssuePrefixes: false,
      allowEmptyIssuePrefixes: false
    };
    const answers = {
      type: "feat",
      subject: "add a new feature"
    };
    expect(generateMessage(answers, options)).toEqual("feat: add a new feature");
  });

  test("both hit single scope and footerPrefix should be output right", () => {
    const options = {
      types: [{ value: "feat", name: "feat:     A new feature" }],
      scopes: ["app"],
      allowCustomScopes: false,
      allowEmptyScopes: false,
      issuePrefixes: [{ value: "closed", name: "closed:   ISSUES has been processed" }],
      allowCustomIssuePrefixes: false,
      allowEmptyIssuePrefixes: false
    };
    const answers = {
      type: "feat",
      subject: "add a new feature",
      footer: "#12"
    };
    expect(generateMessage(answers, options)).toEqual(
      `feat(app): add a new feature

closed #12`
    );
  });
});
