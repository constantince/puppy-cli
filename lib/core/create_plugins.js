"use strict";
var CreatePlugins = /** @class */ (function () {
    //创建插件命令
    function CreatePlugins(name, version) {
        this.name = name;
    }
    CreatePlugins.prototype.entre = function () {
        //进入插件目录
        process.chdir(__dirname + '/plugins/' + this.name);
        //检查版本
        var isLatest = this.checkOutVersion();
        if (isLatest === false) {
            this.upgradePlugins();
        }
        //执行命令
        this.executeCommander();
    };
    //检查版本
    CreatePlugins.prototype.checkOutVersion = function () {
        return false;
    };
    //更新组件
    CreatePlugins.prototype.upgradePlugins = function () {
    };
    //执行命令
    CreatePlugins.prototype.executeCommander = function () {
    };
    return CreatePlugins;
}());
