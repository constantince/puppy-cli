"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var check_modules_1 = require("../check_modules");
var path_1 = __importDefault(require("path"));
var osenv_1 = __importDefault(require("osenv"));
var handle_yml_1 = __importDefault(require("../handle_yml"));
//generator-puppy-react
var PREFIX = 'puppy-plugins-';
//puppy -i install react
var yml = new handle_yml_1.default();
var install = function (pluginName) {
    console.log("" + pluginName, 'pluginType');
    check_modules_1.CheckoutPlugin("" + pluginName).then(function (exist) {
        // if(exist) {
        //     return console.log('Module has been installed.')
        // }
        // process.chdir(path.join(osenv.home(), '.puppy/'));
        // Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });
        //write cmd .yml
        var module = require(path_1.default.join(osenv_1.default.home(), '.puppy/', 'node_modules', pluginName, 'index.js'));
        module.call();
    });
};
module.exports = install;
//# sourceMappingURL=install.js.map