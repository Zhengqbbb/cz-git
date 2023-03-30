import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  entry: ['./src/index.ts'],
  outDir: './lib',
  tsconfig: './tsconfig.json',
  dts: false,
  sourcemap: false,
  splitting: false,
})
