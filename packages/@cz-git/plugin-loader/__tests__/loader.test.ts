import { describe, expect, test, afterEach } from "vitest";
import { useBootstrap } from "./utils";
import { configLoader } from "../src";
import tmp from "tmp";

describe("config loader", () => {
  let mockDir: tmp.DirResult | null = null;
  afterEach(() => {
    if (mockDir !== null) mockDir.removeCallback();
  });

  test("basic packages.json config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/1-basic");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({ prompt: { path: "node_modules/cz-git", useEmoji: true } });
  }, 1000);

  test("basic commitlint js config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/1-basic-commitlint-js");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({
      rules: { "scope-enum": [2, "always", ["cz-git"]] },
      prompt: { path: "node_modules/cz-git", useEmoji: true }
    });
  }, 1000);

  test("basic commitlint json config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/1-basic-commitlint-json");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({
      rules: { "scope-enum": [2, "always", ["cz-git"]] },
      prompt: { path: "node_modules/cz-git", useEmoji: true }
    });
  }, 1000);

  test("basic commitizen js config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/1-basic-cz-js");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({ prompt: { useEmoji: true } });
  }, 1000);

  test("basic commitizen json config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/1-basic-cz-json");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({ prompt: { path: "node_modules/cz-git", useEmoji: true } });
  }, 1000);

  test("commitizen extends config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/2-extend-commitlint");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({
      rules: {
        "scope-enum": [2, "always", ["cz-git"]],
        "subject-empty": [2, "never"],
        "subject-min-length": [2, "always", 2]
      },
      prompt: {
        useEmoji: true,
        customIssuePrefixesAlign: "top"
      }
    });
  }, 1000);

  test("config function should be call", async () => {
    mockDir = await useBootstrap("./fixtures/3-config-function");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({
      rules: {
        "scope-enum": [2, "always", ["cz-git"]],
        "subject-empty": [2, "never"],
        "subject-min-length": [2, "always", 2]
      },
      prompt: {
        useEmoji: true,
        customIssuePrefixesAlign: "top",
        themeColorCode: "38;5;043"
      }
    });
  }, 1000);

  test("custom config should be loaded", async () => {
    mockDir = await useBootstrap("./fixtures/4-custom-config");
    const config = await configLoader(mockDir.name);
    expect(config).toEqual({
      prompt: {
        useEmoji: true
      }
    });
  }, 1000);
});
