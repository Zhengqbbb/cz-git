import { defineConfig } from 'cz-git'

export default defineConfig({
    rules: {
        'scope-enum': [2, 'always', ['cz-git']],
    },
    prompt: {
        useEmoji: true,
    },
})
