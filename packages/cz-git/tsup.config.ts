import { defineConfig } from 'tsup'
import baseConfig from '../../tsup.config'

export default defineConfig(() => {
    return [
        baseConfig,
        // index.mts : Provide types helper fn
        {
            ...baseConfig,
            entry: ['./src/index.mts'],
            format: 'esm',
            dts: false,
        },
    ]
})
