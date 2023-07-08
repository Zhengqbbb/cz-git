import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig((opts) => {
  return Object.assign({}, baseConfig, {
    dts: './src/shared/types/config.ts',
    minify: !opts.watch,
  })
})
