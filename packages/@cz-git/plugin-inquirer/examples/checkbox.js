"use strict";
var inquirer = require("inquirer");
var { SearchCheckbox, fuzzyFilter } = require("@cz-git/inquirer");
var testArr1 = [
  { name: "test1", value: "test1" },
  new inquirer.Separator(),
  { name: "test2", value: "test2" }
];

inquirer.registerPrompt("search-checkbox", SearchCheckbox);
inquirer
  .prompt([
    {
      type: "search-checkbox",
      name: "testOne",
      message: "Select checkbox test",
      source: function (answers, input) {
        return fuzzyFilter(input, testArr1);
      }
    }
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((e) => console.log(e));
