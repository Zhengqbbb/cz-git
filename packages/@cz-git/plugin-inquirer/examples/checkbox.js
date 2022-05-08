"use strict";
var inquirer = require("inquirer");
var inquirerPlugin = require("@cz-git/inquirer");
var testArr1 = [
  { name: "test1", value: "test1" },
  { name: "test2", value: "test2" }
];

inquirer.registerPrompt("search-checkbox", inquirerPlugin.SearchCheckbox);
inquirer
  .prompt([
    {
      type: "search-checkbox",
      name: "testOne",
      message: "Select checkbox test",
      source: function (answers, input) {
        return inquirerPlugin.fuzzyFilter(input, testArr1);
      }
    }
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((e) => console.log(e));
