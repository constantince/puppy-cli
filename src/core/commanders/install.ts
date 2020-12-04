import { CheckoutPlugin } from "../check_modules";
import { CreateCmdList, RegisterFn, InstallModuleType } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
import YML from "../handle_yml";

type InstallLike<T = boolean> = {
    (plugins: string): Promise<T>
}
const yml = new YML();

const install:InstallLike<string> = (pluginName) => {
    return CheckoutPlugin(`${pluginName}`).then((exist: boolean) => {
        if(exist) {
            return "exit";
        }
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });
        //引入模块
        const modulePath = path.join(osenv.home(), '.puppy/', 'node_modules', pluginName, 'index.js');
        return modulePath;
    })
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
        const result = await yml.appendToYml({
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
    const registerResult = after_install(pluginsName);
    return registerResult;
}

const checkModuleType = (mdName:string): InstallLike => {
    /**
    puppy install puppy-plugins-xxxx
    puppy install generator-puppy-xxx
    puppy install puppy-tester-xxxx
     */

    // if(/generator-puppy/.test(mdName)) {
        return installPlugins;
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
    return checkModuleType.call(null, params)(params);
};