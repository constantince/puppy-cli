#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const { Command } = require('commander');
// const chalk = require('chalk');
// const { bgGreenBright } = require('chalk');
var commander_1 = require("commander");
// console.log('take me home country home!！！！');
// cosnt execa = require("execa");;
// const Spawn = require("cross-spawn")
// console.log(chalk.red.bold.bgWhite('Hello World'));
var program = new commander_1.Command();
// program.version('0.0.1');
// Spawn.sync('yo', ['puppy'], { stdio: 'inherit' });
// console.log(Chalk.red.bold.bgGreenBright('Done...'));
// Spawn.sync('rollup', ['-c', '-w'], { stdio: 'inherit' });
program.option('-c, --create <y>', 'Create a project');
//   .option('-create, --yeoman <y>', 'Create a yeoman project')
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);
console.log(program.create);
// (async () => {
//   const {stdout} = await execa('echo', ['unicorns']);
//   console.log(stdout);
//   //=> 'unicorns'
// })();
// if (program.debug) console.log(chalk.red.bold.bgGreenBright(program.pizzaType));
//   console.log('pizza details:', program.yeoman);
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);
