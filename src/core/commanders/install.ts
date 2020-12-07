import { CheckoutPlugin } from "../check_modules";
import { CreateCmdList, RegisterFn, InstallModuleType } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
import YML from "../handle_yml";
import { promisify } from "util";
import fs from "fs";
type InstallLike<T = boolean> = {
    (plugins: string): Promise<T>
}
const exists = promisify(fs.exists);

const yml = new YML();

const install:InstallLike<string> = async (pluginName) => {
    const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', pluginName, 'lib/index.js');
    const exist = await exists(tarGenPath);
    if(exist) {
        return "exit";
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
const after_install:InstallLike = (modulePath) => {
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
           ...cmd,
           ...defaults
        });
    };
    return new Promise((resolve, reject) => {
        module.call(this, register);
        return true;
    })
    

}
// install plugins
const installPlugins:InstallLike = async (pluginsName) => {
    const installResult = await install(pluginsName);
    if(installResult === "exit") {
        return false;
    }
    const registerResult = await after_install(installResult);
    return registerResult;
}

const checkModuleType = (mdName:string): Promise<boolean> => {
    /**
    puppy install puppy-plugins-xxxx
    puppy install generator-puppy-xxx
    puppy install puppy-tester-xxxx
     */

    // if(/generator-puppy/.test(mdName)) {
        return installPlugins(mdName);
    // }

    // if(/puppy-test/.test(mdName)) {
    //     return InstallModuleType[1];
    // }

    // if(/puppy-tester/.test(mdName)) {
    //     return InstallModuleType[2];
    // }


}


//返回一个promise 安装成功和失败
module.exports = function(params: string):Promise<boolean> {
    return checkModuleType.call(null, params);
};