import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig((opts) => {
  return {
    ...baseConfig,
    dts: false,
    minify: !opts.watch,
  }
})
