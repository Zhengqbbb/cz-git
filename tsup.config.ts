import { Options } from "tsup";

/**
 * NOTE: build types for `src/index.ts` only
 * otherwise `Options` will not be exported by `tsup`, not sure how this happens
 * probbably a bug in rollup-plugin-dts
 */

const baseConfig: Options = {
  minify: false,
  entry: ["./dist/index.js"],
  outDir: "./lib",
  tsconfig: "./tsconfig.build.json",
  sourcemap: false,
  dts: true,
  splitting: false
};

export default baseConfig;
export { baseConfig };
