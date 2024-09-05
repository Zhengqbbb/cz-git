const mockUseEmoji = () => process.env.TEST && true
function mockCustomIssuePrefixsAlign() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('top')
        }, 10)
    })
}

module.exports = {
    useEmoji: mockUseEmoji,
    customIssuePrefixAlign: mockCustomIssuePrefixsAlign,
}
