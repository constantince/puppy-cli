import yeoman from 'yeoman-environment';
import path from 'path';
import osenv from 'osenv';
import fs from 'fs';
import Spawn from 'cross-spawn';
import {CreateCmdList} from '../types/types';
// const home = path.join(osenv.home(), '.puppy/.puppy.yml');
const env = yeoman.createEnv();

// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');

//env.register(require.resolve('./generators/app/index.js'), 'npm:index');
//env.register(require.resolve('./generators/app/plugins.index.js'), 'npm:plugins');
// env.register(require.resolve('./generators/app/seed.index.js'), 'npm:seed');
// env.register(require.resolve(tarGenerator), 'npm:react');
//判断模块以来是否存在
const isExist = function(addr: string): boolean {
    const fileExist = fs.existsSync(addr);
    return fileExist;
}


//建立模板项目
const _create = function(commander: CreateCmdList): void {
    //传教模板的generator为官方模板
    const generator = 'generator-puppy';
    // 查找是官方模板是否存在
    const tarGenerator = path.join(osenv.home(), '.puppy/node_modules', `${generator}`);
    const doExist = isExist(tarGenerator);
    if(doExist === false) {
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('cnpm', ['install', generator, '-D'], { stdio: 'inherit' });
    }
    // console.log('module is ', tarGenerator);
    env.register(require.resolve(tarGenerator), `create:${commander}`);
    env.run(`create:${commander}`, { 'skip-install': true }, function (err) {
        if(err) {
            return console.log('opps! occured something wrong!!')
        }
        console.log('done');
    });
}

//使用插件


//使用generator

//
const excute = function (commander: CreateCmdList, args: string | string[]): void {
    _create(commander)
};


export default excute;
	



