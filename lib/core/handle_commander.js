"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.initialOrders = void 0;
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
    /**
     * jude the commaner type
     * download package
     * read the yaml file
     * gister the commander
     * get the paramers
     * excute modules
     */
    var baseCommaner = myConf.native;
    // const orderItem: OrderItem = baseCommaner[commander];
    // const _m = ['-' + orderItem.abbreviation, `--${commander} <params>`, orderItem.description];
    // program.option(_m.join(','));
    var keys = Object.keys(baseCommaner);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (baseCommaner.hasOwnProperty(key)) {
            var orderItem = baseCommaner[key];
            var _m = ['-' + orderItem.abbreviation, "--" + key + " <params>", orderItem.description];
            program.option(_m.join(','));
        }
    }
    return program.parse(process.argv);
    // return program;
};
exports.initialOrders = initialOrders;
var calculateWitchCommander = function (p) {
    return p.options[0].Option.long.replace(/-/g, '');
};
var getCommanderFunc = function (path, arg) {
    var calculateWitchCommander = require(path);
    var p = myConf[calculateWitchCommander].path;
    var func = require(p);
    func.call.apply(func, __spreadArrays([_this], arg));
};
/**
 * register("x", {
    abbreviation: xxx,
    description: xxxx is xxxx,
    path: xxxx/xxx/xxx/xxx/xxx/xxx,
    core: false
 * }, () => {
 *  yoojjpjejhsdw8u3ehh
 * })
 *
 */
//
var register = function (commander, configrations, excute) {
    /*
        1 check if exist
        2 down load package
        3 update yaml file
        4 excute plugin
    */
    //
    // const result = fs.readFileSync(path.join(process.cwd(), '/config/commanders.config.json'));
    // const newCommander = {
    //     [commander]: configrations
    // }
    // let json = JSON.parse(result.toString());
    // json = JSON.stringify({...json, ...newCommander}, undefined, 4);
    // fs.writeFileSync(path.join(process.cwd(), '/config/commanders.config.json'), json);
    //开始注册
    excute();
};
exports.register = register;
