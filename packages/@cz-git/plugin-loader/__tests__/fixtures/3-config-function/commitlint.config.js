function mockSope() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([2, 'always', ['cz-git']])
        }, 10)
    })
}
const mockempty = () => [2, 'never']

module.exports = {
    rules: {
        'scope-enum': mockSope,
        'subject-empty': mockempty(),
        'subject-min-length': [2, 'always', 2],
    },
    prompt: {
        themeColorCode: '38;5;043',
    },
}
