import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig(() => {
  return {
    ...baseConfig,

    minify: true,
    entry: ['./src/index.ts'],
    outDir: './bin',
    tsconfig: './tsconfig.json',
    dts: false,
  }
})
