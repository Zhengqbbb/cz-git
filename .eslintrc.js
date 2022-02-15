module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    jasmine: true
  },
  globals: {
    console: true,
    module: true
  }
};
