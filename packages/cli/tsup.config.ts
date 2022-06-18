import { defineConfig } from "tsup";
import baseConfig from "../../tsup.config";

export default defineConfig(() => {
  return {
    ...baseConfig,

    minify: true,
    entry: ["./src/index.ts"],
    tsconfig: "./tsconfig.json",
    dts: false
  };
});
