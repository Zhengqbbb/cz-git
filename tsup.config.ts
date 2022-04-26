import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./dist/index.js"],
  outDir: "./lib",
  tsconfig: "./tsconfig.build.json",
  minify: true,
  sourcemap: true,
  dts: true,
  splitting: false
});
