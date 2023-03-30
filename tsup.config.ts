import type { Options } from 'tsup'

/**
 * NOTE: build types for `src/index.ts` only
 * otherwise `Options` will not be exported by `tsup`, not sure how this happens
 * probbably a bug in rollup-plugin-dts
 */

const baseConfig: Options = {
  entry: ['src/index.ts'],
  outDir: './lib',
  format: 'cjs',
  dts: true,
  clean: true,
  bundle: true,
  minify: false,
  sourcemap: false,
  splitting: false,
}

export default baseConfig
export { baseConfig }
