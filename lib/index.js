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
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var path_1 = __importDefault(require("path"));
// console.log('take me home country home!！！！');
// cosnt execa = require("execa");;
// const Spawn = require("cross-spawn")
// console.log(chalk.red.bold.bgWhite('Hello World'));
var program = new commander_1.Command();
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
var _dirPath = process.cwd();
console.log(_dirPath, __dirname, path_1.default.basename);
process.chdir(_dirPath);
// console.log(program.use);
// exit();
//创建插件
if (program.create === 'plugins') {
    process.chdir(__dirname + '/plugins/yeoman');
    cross_spawn_1.default.sync('pwd', [], { stdio: 'inherit' });
    cross_spawn_1.default.sync('npm', ['run', 'start'], { stdio: 'inherit' });
    //when done mv the dist
    cross_spawn_1.default.sync('mv', [__dirname + '/plugins/yeoman/dist/', _dirPath + '/first-plugins/']);
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
