import runGen from '../run_generator';

type NameList = 'plugins' | 'generator' | 'test';
const PREFIX = 'puppy-plugins-';
const create = (projectName: NameList) => {
    // console.log('your cmd is now runing:', cmd, PREFIX + projectName);
    //检查命令模块是否存在先
    runGen(projectName);
}

module.exports = create;

