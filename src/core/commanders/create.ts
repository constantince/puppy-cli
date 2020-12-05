import runGen from '../run_generator';
import { NativeFunc } from '../../types/types';

type NameList = 'plugins' | 'generator' | 'test';
// const PREFIX = 'puppy-plugins-';
const create = (projectName: NameList): Promise<boolean> => {
    // console.log('your cmd is now runing:', cmd, PREFIX + projectName);
    //检查命令模块是否存在先
    return runGen(projectName);
}

module.exports = create;

