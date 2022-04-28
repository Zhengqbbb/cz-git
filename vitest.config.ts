import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    root: resolve(__dirname),
    include: ["**/__tests__/*.test.ts"],
    globals: true,
    watchIgnore: ["**/node_modules/**", "**/dist/**", "**/lib/**"]
  }
});
