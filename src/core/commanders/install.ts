import { CheckoutPlugin } from "../check_modules";
import { CreateCmdList, RegisterFn } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
import YML from "../handle_yml";
//generator-puppy-react
const PREFIX = 'puppy-plugins-';

//puppy -i install react
const yml = new YML();
const install = (pluginName: string): void => {
    CheckoutPlugin(`${pluginName}`).then((exist: boolean) => {
        if(exist) {
            return console.log('Module has been installed.')
        }
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });
        //引入模块
        const modulePath = path.join(osenv.home(), '.puppy/', 'node_modules', pluginName, 'index.js');
        const module = require(modulePath);
        //第一次执行的是命令写入 第二次执行再函数体，
        const register:RegisterFn = (cmd, module, desc) => {
            yml.appendToYml({
                name: cmd,
                abbreviation: '-ha',
                description: desc,
                path: modulePath,
                type: 'custom',
                params: 'params'
            }).then(res => {
                if(res === true) {
                    console.log("successed....")
                } else {
                    console.log("error:", res)
                }
            });
        };

        module.call(this, register)
       
    })
}

module.exports = install;