import { CreatePromiseLike, CreateItemsOptions, RegisterFn, NativeCommandFunctions, CustomFunc } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
import YML from "../handle_yml";
import { promisify } from "util";
import fs from "fs";
import { triggerAsyncId } from "async_hooks";

type InstallLike<T = boolean|string> = CreatePromiseLike<string, T>;
type InstallResult = InstallLike<boolean>;

const exists = promisify(fs.exists);

const yml = new YML();

//返回插件
const install:InstallLike = async (pluginName) => {
    const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', pluginName, 'lib/index.js');
    const exist = await exists(tarGenPath);
    if(exist) {
        return false;
    }
    process.chdir(path.join(osenv.home(), '.puppy/'));
    Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });
    //返回
    return tarGenPath;
}

const install_tester = (modules: string) => {
    console.log('tester installed...');
}

const install_generator = (modulePath: string) => {
    console.log('generator installed');
}

// 插件安装之后 更新配置文件
const after_install:InstallLike<boolean> = (modulePath) => {
    const module = require(modulePath);
    //第一次执行的是命令写入 第二次执行再函数体，
    const register:RegisterFn = async (cmd, module, desc) => {
        const defaults = {
            abbreviation: '',
            description: desc,
            path: modulePath,
            type: 'custom',
            params: 'params'
        }
        await yml.appendToYml({
           ...defaults,
           ...cmd
        });
    };
    return new Promise((resolve, reject) => {
        module.call(this, register);
        return true;
    })
    

}
// install plugins
const installPlugins:InstallResult = async (pluginsName) => {
    const installResult = await install(pluginsName);
    if(typeof installResult === "boolean") return false;
    return await after_install(installResult);
}

const checkModuleType: InstallLike<boolean> = (mdName) => {
    /**
    puppy install puppy-plugins-xxxx
    puppy install generator-puppy-xxx
    puppy install puppy-tester-xxxx
     */

    if(/puppy-plugins/.test(mdName)) {
        return installPlugins(mdName);
    }

    if(/generator-puppy/.test(mdName)) {
        return installPlugins(mdName);
    }

    // if(/puppy-test/.test(mdName)) {
    //     return InstallModuleType[1];
    // }

    // if(/puppy-tester/.test(mdName)) {
    //     return InstallModuleType[2];
    // }

    return installPlugins(mdName);
}

const installKind: NativeCommandFunctions = function(params) {
    return checkModuleType.call(null, params);
};

//返回一个promise 安装成功和失败
module.exports = installKind;