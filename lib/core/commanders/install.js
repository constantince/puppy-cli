"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var check_modules_1 = require("../check_modules");
var handle_yml_1 = __importDefault(require("../handle_yml"));
//generator-puppy-react
var PREFIX = 'puppy-plugins-';
//puppy -i install react
var yml = new handle_yml_1.default();
var install = function (pluginName) {
    var module = require("./happy.js");
    module.call(_this, function (str, callback, desc) {
        yml.appendToYml({
            name: "happy",
            abbreviation: '-ha',
            description: "Fro test",
            path: '/src/user/local/nginx/index.js',
            type: 'custom'
        }).then(function (res) {
            if (res === true) {
                console.log("successed....");
            }
            else {
                console.log("error:", res);
            }
        });
    });
    check_modules_1.CheckoutPlugin("" + pluginName).then(function (exist) {
        console.log('done');
        // if(exist) {
        //     return console.log('Module has been installed.')
        // }
        // process.chdir(path.join(osenv.home(), '.puppy/'));
        // Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });
        //write cmd .yml
        // const module = require(path.join(osenv.home(), '.puppy/', 'node_modules', pluginName, 'index.js'));
    });
};
module.exports = install;
//# sourceMappingURL=install.js.map