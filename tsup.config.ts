import type { Options } from 'tsup'

/**
 * NOTE: build types for `src/index.ts` only
 * otherwise `Options` will not be exported by `tsup`, not sure how this happens
 * probbably a bug in rollup-plugin-dts
 */

const baseConfig: Options = {
  entry: ['src/index.ts'],
  outDir: './lib',
  clean: true,
  minify: true,
  bundle: true,
  sourcemap: false,
  splitting: false,
  dts: true,
}

export default baseConfig
export { baseConfig }
