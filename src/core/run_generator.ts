import yeoman from 'yeoman-environment';
import path from 'path';
import osenv from 'osenv';
import fs from 'fs';
import Spawn from 'cross-spawn';
import { promisify } from 'util';
const env = yeoman.createEnv();
const exists = promisify(fs.exists);
// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');

//建立模板项目
const _createPlugins = async function (): Promise<boolean> {
    // 官方自带创建脚手架
    const generator = 'generator-puppy-plugins';
    const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', generator, 'generators/app/index.js');
    // 查找是官方模板是否存在
    const exit = await exists(tarGenPath);
    if (!exit) { //未下载，下载官方模板
        console.log('generators downloading...');
        process.chdir(path.join(osenv.home(), '.puppy/'));
        const installResult = await Spawn.sync('npm', ['install', generator, '-D'], { stdio: 'inherit' });
        return Boolean(installResult);
    } else { //已下载，开始运行模板文件
        return new Promise((resolve, reject) => {
            env.register(tarGenPath, `create`);
            env.run(`create`, { 'skip-install': true }, function (err) {
                if (err) {
                    console.log('opps! occured something wrong!!');
                    resolve(false);
                } else {
                    resolve(true);
                }

            });
        })

    }
}

const excute = function (pluginName: string): Promise<boolean> {
    if (pluginName === 'plugins') {
        return _createPlugins();
    }
    return new Promise((resolve, reject) => {
        console.log("cmd not created, please waitting....");
        resolve(false);
    })
};


export default excute;
