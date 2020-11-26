"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var run_generator_1 = __importDefault(require("../run_generator"));
var PREFIX = 'puppy-plugins-';
var create = function (projectName) {
    // console.log('your cmd is now runing:', cmd, PREFIX + projectName);
    //检查命令模块是否存在先
    run_generator_1.default(projectName);
};
module.exports = create;
//# sourceMappingURL=create.js.map