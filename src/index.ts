#!/usr/bin/env node

// const { Command } = require('commander');
// const chalk = require('chalk');
// const { bgGreenBright } = require('chalk');
import { Command } from 'commander';
import Chalk from 'chalk';
import Spawn from 'cross-spawn';
import path from 'path';
import fs from 'fs';
import { exit } from 'process';
// console.log('take me home country home!！！！');
// cosnt execa = require("execa");;
// const Spawn = require("cross-spawn")
// console.log(chalk.red.bold.bgWhite('Hello World'));
const program = new Command();
// program.version('0.0.1');
// Spawn.sync('yo', ['puppy'], { stdio: 'inherit' });
// console.log(Chalk.red.bold.bgGreenBright('Done...'));
// Spawn.sync('rollup', ['-c', '-w'], { stdio: 'inherit' });

program.option('-c, --create <project>', 'Create a project')
       .option('-u, --use <module>', 'Use Some Module')
       .option('-p, --plugin <plugin>', 'Create a plugins');
//   .option('-create, --yeoman <y>', 'Create a yeoman project')
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');
program.parse(process.argv);
const _dirPath = process.cwd();
console.log(_dirPath, __dirname, path.basename);
process.chdir(_dirPath);
// console.log(program.use);
// exit();
//创建插件
if(program.create === 'plugins') {
   process.chdir(__dirname + '/plugins/yeoman');
   Spawn.sync('pwd', [], { stdio: 'inherit' });
   Spawn.sync('npm', ['run', 'start'], { stdio: 'inherit' });
   //when done mv the dist
   Spawn.sync('mv', [__dirname + '/plugins/yeoman/dist/', _dirPath + '/first-plugins/'])

}

// process.chdir(__dirname + '/plugins/' + program.use);;
// Spawn.sync('npm', ['install'], { stdio: 'inherit' });
// Spawn.sync('npm', ['run', 'engaged'], { stdio: 'inherit' });
// fs.writeFileSync(_dirPath + '/happy.js', fs.readFileSync(path.join(__dirname, 'plugins/test/bundle.js')));
// console.log(Chalk.red.bold.bgGreenBright('Mission Done...'));


// Spawn.sync('pwd', [], { stdio: 'inherit' });

// (async () => {
//   const {stdout} = await execa('echo', ['unicorns']);
//   console.log(stdout);
//   //=> 'unicorns'
// })();
 
// if (program.debug) console.log(chalk.red.bold.bgGreenBright(program.pizzaType));
//   console.log('pizza details:', program.yeoman);
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);


