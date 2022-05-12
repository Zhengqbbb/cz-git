import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    minify: false,
    entry: !options.watch ? ["./dist/index.js"] : ["./src/index.js"],
    outDir: "./lib",
    tsconfig: "./tsconfig.build.json",
    bundle: true,
    sourcemap: true,
    dts: true,
    splitting: false
  };
});
