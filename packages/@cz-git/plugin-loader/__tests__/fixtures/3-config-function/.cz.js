const mockUseEmoji = () => process.env.TEST && true;
const mockCustomIssuePrefixesAlign = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("top");
    }, 10);
  });
};

module.exports = {
  useEmoji: mockUseEmoji,
  customIssuePrefixesAlign: mockCustomIssuePrefixesAlign
};
