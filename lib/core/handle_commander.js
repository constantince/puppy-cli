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
exports.getCommanderFunc = exports.register = exports.initialOrders = void 0;
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
// console.log(myConf);
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
    // const orderItem: OrderItem = baseCommaner[commander];
    // const _m = ['-' + orderItem.abbreviation, `--${commander} <params>`, orderItem.description];
    // program.option(_m.join(','));;
    var baseCommaner = myConf.source.native;
    console.log('base is', baseCommaner);
    var keys = Object.keys(baseCommaner);
    console.log(keys);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (baseCommaner.hasOwnProperty(key)) {
            var orderItem = baseCommaner[key];
            var _m = [orderItem.abbreviation, " --" + key + " <params>"];
            console.log(_m.join(','));
            program.option(_m.join(','), orderItem.description);
        }
    }
    return program.parse(process.argv);
};
exports.initialOrders = initialOrders;
// const getCurrentCommander = (commander: Command.Command) => {
// }
var calculateWitchCommander = function () {
    var p = initialOrders();
    var cur = p.options;
    console.log(cur, p);
    var _c = cur.find(function (v) { return p[v.long.replace(/-/g, '')]; });
    return _c.long.replace(/-/g, '');
};
var getCommanderFunc = function () {
    var curname = calculateWitchCommander();
    console.log('curname is' + curname);
    var baseCommaner = myConf.source.native;
    var calculate = baseCommaner[curname].path;
    console.log(calculate);
    var func = require(calculate);
    console.log(func, program.args);
    func.call.apply(func, __spreadArrays([_this], program.args));
    // const p =  <any>myConf[calculateWitchCommander].path;
    // const func = require(p);
    // func.call(this, ...arg)
};
exports.getCommanderFunc = getCommanderFunc;
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
var CommanderProxy = /** @class */ (function () {
    function CommanderProxy() {
        var _this = this;
        this.baseCommander = null;
        this.conf = null;
        this.findCommander = function () {
            var cur = _this.ctx.options;
            var longCommander = cur.find(function (v) { return cur[v.long.replace(/-/g, '')]; });
            return longCommander.long.replace(/-/g, '');
        };
        this.transformYaml();
        this.ctx = this.initialCommanders();
    }
    CommanderProxy.prototype.transformYaml = function () {
        var home = path_1.default.join(osenv_1.default.home(), '.puppy/.puppy.yml');
        var ymlConfigurations = fs_1.default.readFileSync(home, { encoding: 'utf-8' });
        if (ymlConfigurations) {
            this.conf = js_yaml_1.default.safeLoad(ymlConfigurations);
        }
    };
    CommanderProxy.prototype.initialCommanders = function () {
        this.baseCommander = this.conf.source.native;
        var keys = Object.keys(this.baseCommander);
        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
            var key = keys_2[_i];
            if (this.baseCommander.hasOwnProperty(key)) {
                var orderItem = this.baseCommander[key];
                var _m = [orderItem.abbreviation, " --" + key + " <params>"];
                console.log(_m.join(','));
                program.option(_m.join(','), orderItem.description);
            }
        }
        return program.parse(process.argv);
    };
    CommanderProxy.prototype.register = function () {
    };
    CommanderProxy.prototype.getCommanderFunc = function () {
        var curname = this.findCommander(true);
        // console.log('curname is' + curname)
        var baseCommaner = myConf.source.native;
        var calculate = this.ctx[curname].path;
        // console.log(calculate)
        var func = require(calculate);
        // console.log(func, program.args);
        func.call.apply(func, __spreadArrays([this], program.args));
    };
    CommanderProxy.prototype.pickUpCommander = function () {
    };
    return CommanderProxy;
}());
exports.default = CommanderProxy;
