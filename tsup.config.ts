import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: !options.watch ? ["./dist/index.js"] : ["./src/index.js"],
    outDir: "./lib",
    tsconfig: "./tsconfig.build.json",
    sourcemap: true,
    dts: true,
    splitting: false
  };
});
