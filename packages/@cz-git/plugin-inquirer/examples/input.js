"use strict";
var inquirer = require("inquirer");
var { CompleteInput, style } = require("@cz-git/inquirer");

const useThemeCode = (input, themeColorCode) =>
  themeColorCode ? style.rgb(themeColorCode)(input) : style.cyan(input);

inquirer.registerPrompt("complete-input", CompleteInput);
inquirer
  .prompt([
    {
      type: "complete-input",
      name: "testOne",
      message: "Input empty test: \n",
      completeValue: "",
      validate: (input) => {
          return input.length ? true : style.red("[ERROR] value is required");
      },
      transformer: (input) => useThemeCode(input, '38;5;042')
    },
    {
      type: "complete-input",
      name: "testTwo",
      message: "Write a SHORT, IMPERATIVE tense description of the change:\n",
      validate: (input) => {
        return input.length ? true : style.red("[ERROR] value is required");
      },
      transformer: (input) => {
        if (input.length < 100) {
          return useThemeCode(input, '38;5;042');
        }else {
          return style.red(input);
        }
      },
      completeValue: "[Form] "
    },
    {
      type: "complete-input",
      name: "cz",
      completeValue: "cz-git",
      message: "Denote the SCOPE of this change:",
      validate: (input) => {
        return input.length ? true : style.red("[ERROR] value is required");
      },
      transformer: (input) => useThemeCode(input, '38;5;043')
    }
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((e) => console.log(e));
