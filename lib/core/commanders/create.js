"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var run_generator_1 = __importDefault(require("../run_generator"));
var create = function (name) {
    run_generator_1.default(name, name);
};
exports.default = create;
