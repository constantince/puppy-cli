"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var osenv_1 = __importDefault(require("osenv"));
var js_yaml_1 = __importDefault(require("js-yaml"));
var commander_1 = require("commander");
var program = new commander_1.Command();
var home = path_1.default.join(osenv_1.default.home(), '.puppy/.puppy.yml');
var CommanderProxy = /** @class */ (function () {
    function CommanderProxy() {
        var _this = this;
        this.baseCommander = null;
        this.args = [];
        this.curCmd = 'help';
        // register commander
        this.register = function (commander, config, desc) {
            //todo 2012 12 .01 // 注册接口
            return;
            // this.storeCmd.source.custom[commander] = config;
            // excute.call(null);
        };
        // replace symbol
        this.trimString = function (rawCommander) {
            if (!rawCommander)
                return 'help';
            return rawCommander.replace(/^-+/g, '');
        };
        this.matchCmd = function (cmd) {
            var re = cmd.match(/(?<=--)[^-\s]+(?=\s+)/);
            if (re === null)
                return 'help';
            return re[0];
        };
        // find current command in terminal bash
        this.findCommander = function () {
            var cur = _this.ctx.options;
            var longCommanderOptions = cur.find(function (v) { return _this.ctx.rawArgs[2] === v.short; });
            if (longCommanderOptions) {
                _this.curCmd = _this.trimString(longCommanderOptions.long);
            }
            return _this.curCmd;
        };
        this.storeCmd = this.conf = this.transformYaml();
        this.ctx = this.initialCommanders();
        this.args = this.ctx.args;
    }
    // yaml file transter to json object
    CommanderProxy.prototype.transformYaml = function () {
        if (fs_1.default.existsSync(home)) {
            var ymlConfigurations = fs_1.default.readFileSync(home, { encoding: 'utf-8' });
            return js_yaml_1.default.safeLoad(ymlConfigurations);
        }
        else {
            return this.writeJsonToYml();
        }
    };
    // parse configration in local
    CommanderProxy.prototype.writeJsonToYml = function () {
        var localConfigurations = fs_1.default.readFileSync(path_1.default.join(__dirname, '../../../config/commanders.config.json'), { encoding: 'utf-8' });
        this.storeCmd = JSON.parse(localConfigurations);
        var ymlJSON = js_yaml_1.default.dump(this.storeCmd);
        fs_1.default.writeFileSync(home, ymlJSON);
        return this.storeCmd;
    };
    //inital all native commander
    CommanderProxy.prototype.initialCommanders = function () {
        this.baseCommander = this.conf.source.native;
        var keys = Object.keys(this.baseCommander);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (this.baseCommander.hasOwnProperty(key)) {
                var orderItem = this.baseCommander[key];
                // program
                // .option(`-${orderItem.abbreviation}, --${key} <action> [params]`)
                // .action((options) => {
                //     console.log(options.action);
                // });
                // program.command(`${key} <source> [${orderItem.description}]`)
                var cmds = [orderItem.abbreviation, " --" + key + " <params> [params2]"];
                program.option(cmds.join(','), orderItem.description);
            }
        }
        return program.parse(process.argv);
    };
    // find the module of current commander then excute
    CommanderProxy.prototype.getCommanderFunc = function () {
        var curname = this.findCommander();
        var cmdConf = this.conf.source.native[curname];
        if (typeof cmdConf === undefined)
            return false;
        var calculate = this.conf.source.native[curname].path;
        return require(calculate);
    };
    CommanderProxy.prototype.checkCmdType = function () {
        var curname = this.findCommander();
        var cmdConf = this.conf.source.native[curname];
        if (typeof cmdConf === undefined)
            'custom';
        return 'native';
    };
    CommanderProxy.prototype.excuteCommander = function () {
        var func = this.getCommanderFunc();
        if (func === false) {
            return console.log('Can\' not find cmd, your should install plugin related to first');
        }
        // console.log(this.args);
        func.apply(null, this.args);
        return this.curCmd;
    };
    return CommanderProxy;
}());
exports.default = CommanderProxy;
// export { initialOrders, register, getCommanderFunc };
//# sourceMappingURL=handle_commander.js.map