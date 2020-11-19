"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var help = function (name) {
    var helpInfo = chalk_1.default.bold("\nWelcome to " + chalk_1.default.red('puppy-cli') + ", we provide native commanders below:\n    - list:\n        list all commander and how to use them;\n    - create:\n        create a project react, vue or angluar;\n    - help:\n        help commander is default and show message like this;\n\nfor more infomations, please checkout documents on github.\n");
    console.log(helpInfo);
};
module.exports = help;
//# sourceMappingURL=help.js.map