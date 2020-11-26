"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yeoman_environment_1 = __importDefault(require("yeoman-environment"));
var path_1 = __importDefault(require("path"));
var osenv_1 = __importDefault(require("osenv"));
var fs_1 = __importDefault(require("fs"));
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var check_modules_1 = require("./check_modules");
// const home = path.join(osenv.home(), '.puppy/.puppy.yml');
var env = yeoman_environment_1.default.createEnv();
// const tarGenerator = path.join(__dirname, '../../node_modules', 'generator-puppy/generators/app', 'react.index.js');
//env.register(require.resolve('./generators/app/index.js'), 'npm:index');
//env.register(require.resolve('./generators/app/plugins.index.js'), 'npm:plugins');
// env.register(require.resolve('./generators/app/seed.index.js'), 'npm:seed');
// env.register(require.resolve(tarGenerator), 'npm:react');
//判断模块以来是否存在
var isExist = function (addr) {
    var fileExist = fs_1.default.existsSync(addr);
    return fileExist;
};
//建立模板项目
var _create = function (pluginName) {
    //传教模板的generator为官方模板
    // const generator = 'generator-puppy';
    // 查找是官方模板是否存在
    // const tarGenerator = path.join(osenv.home(), '.puppy/node_modules', `generator-puppy-${generator}`);
    // const doExist = isExist(tarGenerator);
    var tarGenPath = path_1.default.join(osenv_1.default.home(), '.puppy/node_modules', "generator-puppy-" + pluginName, 'generators/app/index.js');
    check_modules_1.CheckoutPlugin("generator-puppy-" + pluginName).then(function (exist) {
        if (!exist) {
            console.log('plugins downloading...');
            process.chdir(path_1.default.join(osenv_1.default.home(), '.puppy/'));
            cross_spawn_1.default.sync('npm', ['install', "generator-puppy-" + pluginName, '-D'], { stdio: 'inherit' });
            // return console.log('Module is not installed.')
        }
        // const tarGenPath = path.join(osenv.home(), '.puppy/node_modules', `generator-puppy-${pluginName}`);
        // process.chdir(tarGenPath);
        // console.log(process.cwd());
        env.register(require.resolve(tarGenPath), "create");
        env.run("create", { 'skip-install': true }, function (err) {
            if (err) {
                return console.log('opps! occured something wrong!!');
            }
            console.log('done');
        });
        return;
    });
    // if(doExist === false) {
    //     // process.chdir(path.join(osenv.home(), '.puppy/'));
    //     // Spawn.sync('cnpm', ['install', generator, '-D'], { stdio: 'inherit' });
    //     console.log('Can\'t fint this module, please install first.');
    //     return;
    // }
    // console.log('module is ', tarGenerator);
    // env.register(require.resolve(tarGenerator), `create:${commander}`);
    // env.run(`create:${commander}`, { 'skip-install': true }, function (err) {
    //     if(err) {
    //         return console.log('opps! occured something wrong!!')
    //     }
    //     console.log('done');
    // });
};
//使用插件
//使用generator
//
var excute = function (pluginName) {
    _create(pluginName);
};
exports.default = excute;
//# sourceMappingURL=run_generator.js.map