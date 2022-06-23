#!/usr/bin/env node
import { czg, generateHelp } from "./generator";
import { resovleArgs } from "./shared";

process.on("uncaughtException", function (err) {
  console.error(err.message || err);
  process.exit(1);
});

// catch SIGINT signal like control+c
process.stdin.on("data", function (key: any) {
  if (key == "\u0003") {
    process.exit(130); // 128 + SIGINT
  }
});

/**
 * Main CLI Enter Point
 * @param environment use debug mode
 * @param {string[]} argv  Node.js process
 */
export const bootsrap = (environment: any = {}, argv = process.argv) => {
  const commandArgs = argv.slice(2, argv.length);
  const czgitVersion = require("../package.json").version;

  if (!commandArgs[0]) {
    czg(czgitVersion, commandArgs, environment);
    return;
  }

  const parsedArgs = resovleArgs(commandArgs);
  if (!parsedArgs.czgitArgs.subCommand) {
    if (parsedArgs.czgitArgs.flag?.help) {
      generateHelp(czgitVersion);
    } else if (parsedArgs.czgitArgs.flag?.version) {
      console.log(czgitVersion);
      process.exit(0);
    }
  }

  czg(czgitVersion, commandArgs, environment);
};

bootsrap();
