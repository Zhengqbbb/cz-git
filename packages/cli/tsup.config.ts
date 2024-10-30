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
        {
            ...baseConfig,
            minify: !opts.watch,
        },
    ]
})
