import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    root: resolve(__dirname),
    globals: true,
    include: ["**/__tests__/*.test.ts"],
    watchIgnore: ["**/node_modules/**", "**/dist/**", "**/lib/**", "**/docs/**"]
  }
});
