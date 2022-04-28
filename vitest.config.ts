import { defineConfig } from "vitest/config";
import { resolve } from "path";

/* prettier-ignore */
export default defineConfig({
  test: {
    root: resolve(__dirname),
    globals: true,
    include: ["**/__tests__/*.test.ts"]
  }
});
