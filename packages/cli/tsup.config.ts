import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig((opts) => {
    return [
        {
            ...baseConfig,
            dts: false,
            minify: !opts.watch,
        },
        {
            entry: { index: './src/shared/types/config.ts' },
            outDir: './lib',
            dts: { only: true },
        },
    ]
})
