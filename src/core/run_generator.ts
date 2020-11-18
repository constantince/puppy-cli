import yeoman from 'yeoman-environment';
import path from 'path';
import osenv from 'osenv';
import fs from 'fs';
import Spawn from 'cross-spawn';
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

//创建React项目
const excute = function (generator: string, commander: string): void {
    const tarGenerator = path.join(osenv.home(), '.puppy/node_modules', `${generator}/generators/app`, `${commander}.index.js`);
    const doExist = isExist(tarGenerator);
    if(doExist === false) {
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('cnpm', ['install', generator, '-D'], { stdio: 'inherit' });
    }
    // console.log('module is ', tarGenerator);
    env.register(require.resolve(tarGenerator), `npm:${commander}`);
    env.run(`npm:${commander}`, { 'skip-install': true }, function (err) {
        console.log('done');
    });
};


export default excute;
	



