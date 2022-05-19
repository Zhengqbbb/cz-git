import { defineConfig } from "tsup";

/**
 * NOTE: build types for `src/index.ts` only
 * otherwise `Options` will not be exported by `tsup`, not sure how this happens
 * probbably a bug in rollup-plugin-dts
 */

export default defineConfig((options) => {
  return {
    minify: false,
    entry: !options.watch ? ["./dist/index.js"] : ["./src/index.js"],
    outDir: "./lib",
    tsconfig: "./tsconfig.build.json",
    sourcemap: false,
    dts: true,
    splitting: false
  };
});
