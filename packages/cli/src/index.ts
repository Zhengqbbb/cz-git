#!/usr/bin/env node
import { czg, generateHelp } from "./generator";

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
  const subCommand = commandArgs[0] || "";
  const czgitVersion = require("../package.json").version;

  if (!subCommand) {
    czg(czgitVersion, commandArgs, environment);
    return;
  }

  /* eslint-disable prettier/prettier */
  /* prettier-ignore */
  switch (true) {
    // options
    case /^(--config)$/.test(subCommand):                 
      console.log("config file");   process.exit(0);    
    case /^(--reback|-b)$/.test(subCommand):              
      console.log("reback");   process.exit(0);    
    case /^(--retry|-r$)$/.test(subCommand):              
      console.log("retry");   process.exit(0);    

    // subCommand
    case /^(init)$/.test(subCommand):                     
      console.log("init");          process.exit(0);
    case /^(emoji)$/.test(subCommand):                    
      console.log("emoji");         process.exit(0);
    case /^(checkbox)$/.test(subCommand):                 
      console.log("checkbox");      process.exit(0);
    case /^(version|-v|--version)$/.test(subCommand):     
      console.log(czgitVersion);    process.exit(0);
    case /^(help|-h|--help)$/.test(subCommand):           
      generateHelp(czgitVersion);            return;
    
    default:                                              
      czg(czgitVersion, commandArgs, environment);   return;
  }
};

bootsrap()
