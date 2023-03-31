import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig((opts) => {
  return Object.assign({}, baseConfig, {
    dts: false,
    minify: !opts.watch,
  })
})
