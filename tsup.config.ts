import { defineConfig } from "tsup";

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
