"use strict";
var inquirer = require("inquirer");
var { SearchList, fuzzyFilter } = require("@cz-git/inquirer");
var testArr1 = [
  { name: "test1", value: "test1" },
  { name: "test2", value: "test2" }
];

inquirer.registerPrompt("search-list", SearchList);
inquirer
  .prompt([
    {
      type: "search-list",
      name: "testOne",
      message: "Select list test",
      source: function (answers, input) {
        return fuzzyFilter(input, testArr1);
      }
    }
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((e) => console.log(e));
