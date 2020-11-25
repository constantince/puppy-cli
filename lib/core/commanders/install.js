"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var check_modules_1 = require("../check_modules");
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var path_1 = __importDefault(require("path"));
var osenv_1 = __importDefault(require("osenv"));
var PREFIX = 'puppy-plugins-';
var install = function (pluginType, pluginName) {
    console.log("puppy-plugins-" + pluginName, pluginType);
    check_modules_1.CheckoutMoudles(pluginType, "puppy-plugins-" + pluginName).then(function (exist) {
        if (exist) {
            return 'Module has been installed.';
        }
        process.chdir(path_1.default.join(osenv_1.default.home(), '.puppy/'));
        cross_spawn_1.default.sync('npm', ['install', "puppy-plugins-" + pluginName, '-D'], { stdio: 'inherit' });
        console.log("Module puppy-plugins-" + pluginName + " installed.");
    });
};
module.exports = install;
//# sourceMappingURL=install.js.map