"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPlugin = void 0;
var fs_1 = __importDefault(require("fs"));
var osenv_1 = __importDefault(require("osenv"));
var path_1 = __importDefault(require("path"));
var CheckoutPlugin = function (name) {
    return new Promise(function (resolve, reject) {
        fs_1.default.stat(path_1.default.join(osenv_1.default.home(), ".puppy/node_modules/" + name), function (err, stat) {
            if (err) {
                resolve(false);
            }
            resolve(true);
        });
    });
};
exports.CheckoutPlugin = CheckoutPlugin;
//# sourceMappingURL=check_modules.js.map