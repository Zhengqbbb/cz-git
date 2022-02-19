import type { Config } from "@jest/types";
import { resolve } from "path";

const config: Config.InitialOptions = {
  rootDir: resolve(__dirname),
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.base.json"
    }
  },
  testMatch: ["<rootDir>/test/*.test.ts"]
};

export default config;
