"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yeoman_environment_1 = __importDefault(require("yeoman-environment"));
var path_1 = __importDefault(require("path"));
var env = yeoman_environment_1.default.createEnv();
var tarGenerator = path_1.default.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');
//env.register(require.resolve('./generators/app/index.js'), 'npm:index');
//env.register(require.resolve('./generators/app/plugins.index.js'), 'npm:plugins');
// env.register(require.resolve('./generators/app/seed.index.js'), 'npm:seed');
env.register(require.resolve(tarGenerator), 'npm:react');
//创建React项目
var excute = function () {
    env.run('npm:react', { 'skip-install': true }, function (err) {
        console.log('done');
    });
};
exports.default = excute;
