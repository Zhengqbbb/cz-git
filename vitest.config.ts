import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

/* prettier-ignore */
export default defineConfig({
    test: {
        root: resolve(__dirname),
        globals: true,
        include: ['**/__tests__/*.test.ts'],
    },
})
