#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const { Command } = require('commander');
// const chalk = require('chalk');
// const { bgGreenBright } = require('chalk');
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var cross_spawn_1 = __importDefault(require("cross-spawn"));
// cosnt execa = require("execa");
// const Spawn = require("cross-spawn")
// console.log(chalk.red.bold.bgWhite('Hello World'));
var program = new commander_1.Command();
// program.version('0.0.1');
cross_spawn_1.default.sync('yo', ['puppy'], { stdio: 'inherit' });
console.log(chalk_1.default.red.bold.bgGreenBright('Done...'));
cross_spawn_1.default.sync('rollup', ['-c', '-w'], { stdio: 'inherit' });
program
    .option('-create, --yeoman <y>', 'Create a yeoman project')
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);
// (async () => {
//   const {stdout} = await execa('echo', ['unicorns']);
//   console.log(stdout);
//   //=> 'unicorns'
// })();
// if (program.debug) console.log(chalk.red.bold.bgGreenBright(program.pizzaType));
//   console.log('pizza details:', program.yeoman);
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);
