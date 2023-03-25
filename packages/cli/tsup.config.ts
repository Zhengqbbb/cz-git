import { type Options, defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

const extendConfig: Options = {
  minify: true,
  dts: false,
}

export default defineConfig({
  ...baseConfig,
  ...extendConfig,
})
