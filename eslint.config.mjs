import antfu from '@antfu/eslint-config'

export default antfu(
    {
        yaml: false,
        markdown: false,
        vue: true,
        stylistic: { indent: 4 },
        overrides: {
            jsonc: {
                'indent': ['error', 2],
                'jsonc/indent': ['error', 2],
            },
            typescript: {
                'ts/ban-ts-comment': 'off',
            },
            vue: {
                'vue/no-v-text-v-html-on-component': 'off',
            },
            test: {
                'test/prefer-lowercase-title': 'off',
            },
        },
        ignores: [
            '!./docs/.vitepress',
            '**/*/node_modules**/*',
            '**/*/lib**/*',
            '**/*/dist**/*',
            '**/*/examples**/*',
            '**/*/cache**/*',
            '**/*/components.d.ts**/*',
        ],
    },
    {
        rules: {
            'no-new': 'off',
            'no-console': 'off',
            'import/export': 'off',
            'jsdoc/check-param-names': 'off',
        },
    },
)
