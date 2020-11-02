#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { bgGreenBright } = require('chalk');
// cosnt execa = require("execa");
const Spawn = require("cross-spawn")
// console.log(chalk.red.bold.bgWhite('Hello World'));
const program = new Command();
// program.version('0.0.1');
Spawn.sync('yo', ['puppy'], { stdio: 'inherit' });
console.log(chalk.red.bold.bgGreenBright('Done...'));
Spawn.sync('rollup', ['-c', '-w'], { stdio: 'inherit' });

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