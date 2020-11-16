"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var osenv_1 = __importDefault(require("osenv"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var commander_1 = require("commander");
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path_1.default.resolve('./'));
var home = path_1.default.join(osenv_1.default.home(), '.puppy/.puppy.yml');
var ymlConfigurations = fs_1.default.readFileSync(home, { encoding: 'utf-8' });
var myConf;
if (ymlConfigurations) {
    myConf = js_yaml_1.default.safeLoad(ymlConfigurations);
}
var program = new commander_1.Command();
var initialOrders = function () {
    var baseCommaner = myConf.native;
    var keys = Object.keys(baseCommaner);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (baseCommaner.hasOwnProperty(key)) {
            var orderItem = baseCommaner[key];
            var _m = ['-' + orderItem.abbreviation, "--" + key + " <params>", orderItem.description];
            program.option(_m.join(','));
        }
    }
    program.parse(process.argv);
};
//
var register = function (commander, configrations, excute) {
    var _a;
    var result = fs_1.default.readFileSync(path_1.default.join(process.cwd(), '/config/commanders.config.json'));
    var newCommander = (_a = {},
        _a[commander] = configrations,
        _a);
    var json = JSON.parse(result.toString());
    json = JSON.stringify(__assign(__assign({}, json), newCommander), undefined, 4);
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '/config/commanders.config.json'), json);
    //开始注册
    excute();
};
exports.default = { initialOrders: initialOrders, register: register };
