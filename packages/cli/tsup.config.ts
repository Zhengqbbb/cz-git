import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  entry: ['./src/index.ts'],
  outDir: './bin',
  tsconfig: './tsconfig.json',
  dts: false,
  sourcemap: false,
  splitting: false,
})
