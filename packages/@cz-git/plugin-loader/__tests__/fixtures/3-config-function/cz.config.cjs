const mockUseEmoji = () => process.env.TEST && true
const mockCustomIssuePrefixsAlign = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('top')
    }, 10)
  })
}

module.exports = {
  useEmoji: mockUseEmoji,
  customIssuePrefixsAlign: mockCustomIssuePrefixsAlign,
}
