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
//创建React项目
var excute = function (generator, commander) {
    var tarGenerator = path_1.default.join(osenv_1.default.home(), '.puppy/node_modules', generator + "/generators/app", commander + ".index.js");
    var doExist = isExist(tarGenerator);
    if (doExist === false) {
        process.chdir(path_1.default.join(osenv_1.default.home(), '.puppy/'));
        cross_spawn_1.default.sync('cnpm', ['install', generator, '-D'], { stdio: 'inherit' });
    }
    // console.log('module is ', tarGenerator);
    env.register(require.resolve(tarGenerator), "npm:" + commander);
    env.run("npm:" + commander, { 'skip-install': true }, function (err) {
        console.log('done');
    });
};
exports.default = excute;
//# sourceMappingURL=run_generator.js.map