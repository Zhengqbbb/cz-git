"use strict";
var inquirer = require("inquirer");
var { SearchList, fuzzyFilter } = require("@cz-git/inquirer");
var testArr1 = [
  { name: "test1", value: "test1" },
  { name: "test2", value: "test2" },
  { name: "test3", value: "test3" },
  { name: "test4", value: "test4" },
  { name: "test5", value: "test5" },
  { name: "test6", value: "test6" },
  { name: "test7", value: "test7" },
  { name: "test8", value: "test8" },
  { name: "test9", value: "test9" }
];

var testArr2 = [
  { name: "test1", value: "test1" },
  new inquirer.Separator(),
  { name: "test2", value: "test2" },
  { name: "test3", value: "test3" },
  { name: "test4", value: "test4" },
  { name: "test5", value: "test5" },
  { name: "test6", value: "test6" },
  { name: "test7", value: "test7" },
  { name: "test8", value: "test8" },
  { name: "test9", value: "test9" }
];

var testArr3 = [
  { value: false, name: "empty" },
  { value: "___CUSTOM___", name: "custom" },
  new inquirer.Separator(),
  { value: "cz-git", name: "cz-git" },
  { value: "docs", name: "docs:              cz-git document" },
  { value: "plugin-inquirer", name: "plugin-inquirer:   provide cz-git inquirer" },
  { value: "plugin-loader", name: "plugin-loader:     options loader" }
];

inquirer.registerPrompt("search-list", SearchList);
inquirer
  .prompt([
    {
      type: "search-list",
      name: "testOne",
      themeColorCode: "",
      message: "Select checkbox test:",
      source: function (answers, input) {
        return fuzzyFilter(input, testArr1);
      }
    },
    {
      type: "search-list",
      name: "testTwo",
      themeColorCode: "38;5;043",
      searchKeyword: "9",
      message: "Select checkbox test:",
      source: function (answers, input) {
        return fuzzyFilter(input, testArr2);
      }
    },
    {
      type: "search-list",
      name: "cz",
      themeColorCode: "38;5;042",
      message: "Select scope:",
      source: function (answers, input) {
        return fuzzyFilter(input, testArr3);
      }
    }
  ])
  .then(function (answers) {
    console.log(JSON.stringify(answers, null, "  "));
  })
  .catch((e) => console.log(e));
