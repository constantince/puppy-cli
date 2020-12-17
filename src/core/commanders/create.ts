import runGen from '../run_generator';
import { NativeFunc } from '../../types/types';

const Create_Native: NativeFunc = (projectName) => {
    // console.log('your cmd is now runing:', cmd, PREFIX + projectName);
    //检查命令模块是否存在先
    return runGen(projectName);
}

// const PREFIX = 'puppy-plugins-';
// const Create_Native

module.exports = Create_Native;

