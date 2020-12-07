import yeoman from 'yeoman-environment';
import path from 'path';
import osenv from 'osenv';
import fs from 'fs';
import Spawn from 'cross-spawn';
import { promisify } from 'util';
import { CreateCmdList, NativeFunc } from '../types/types';
import { CheckoutPlugin } from './check_modules';
// const home = path.join(osenv.home(), '.puppy/.puppy.yml');
const env = yeoman.createEnv();
const stat = promisify(fs.stat);
// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');

//env.register(require.resolve('./generators/app/index.js'), 'npm:index');
//env.register(require.resolve('./generators/app/plugins.index.js'), 'npm:plugins');
// env.register(require.resolve('./generators/app/seed.index.js'), 'npm:seed');
// env.register(require.resolve(tarGenerator), 'npm:react');
//判断模块以来是否存在
const isExist = function (addr: string): boolean {
    const fileExist = fs.existsSync(addr);
    return fileExist;
}


//建立模板项目
const _createPlugins = async function (): Promise<boolean> {
    // 官方自带创建脚手架
    const generator = 'generator-puppy-plugins';
    const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', generator, 'generators/app/index.js');
    // 查找是官方模板是否存在
    const exit = await stat(tarGenPath);
    if (!exit) { //未下载，下载官方模板
        console.log('plugins downloading...');
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
