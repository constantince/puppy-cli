import yeoman from 'yeoman-environment';
import path from 'path';
import osenv from 'osenv';
import fs from 'fs';
// import Spawn from 'cross-spawn';
// import execa from 'execa';
import ora from 'ora';
// import pEachSeries from 'p-each-series';
import { promisify } from 'util';
import { mutiProcess } from '../tools/index';
const env = yeoman.createEnv();
const exists = promisify(fs.exists);
// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');

//建立模板项目
const _createTemplate = async function (type: string): Promise<boolean> {
    // 官方自带创建脚手架
    const generator = `generator-puppy-${type}`;
    const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', generator, 'generators/app/index.js');
    // 查找是官方模板是否存在
    const exit = await exists(tarGenPath);
    if (!exit) { //未下载，下载官方模板
        // console.log('Generators will be downloaded only once, waiting...');
        // process.chdir(path.join(osenv.home(), '.puppy/'));
        // await Spawn.sync('npm', ['install', '--registry', 'http://10.10.204.38:4873', generator, '-D'], { stdio: 'inherit' });
        const Dependencies = [
            {
                cmd: 'npm',
                args: ['install', '--registry', 'http://10.10.204.38:4873', generator, '-D'],
                cwd: path.join(osenv.home(), '.puppy/'), generator
            }
        ]

        const rootP = mutiProcess(Dependencies);
        ora.promise(rootP, `Generators will be downloaded only once, waiting...`);
        await rootP;

    }
    //已下载，开始运行模板文件
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

const excute = function (pluginName: string): Promise<boolean> {
    return _createTemplate(pluginName);
};


export default excute;
