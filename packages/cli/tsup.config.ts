import { type Options, defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

const extendConfig: Options = {
  minify: true,
  dts: false,
}

const config = Object.assign({}, baseConfig, extendConfig)

export default defineConfig(config)
