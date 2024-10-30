import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig((opts) => {
    return [
        {
            ...baseConfig,
            entry: ['./src/main.ts'],
            dts: false,
            minify: !opts.watch,
        },
        // index.ts : Provide configure types and types helper fn
        {
            ...baseConfig,
            format: ['esm', 'cjs'],
            dts: false,
            minify: !opts.watch,
        },
        {
            ...baseConfig,
            dts: { only: true },
        },
    ]
})
