import runGen from '../run_generator';

type NameList = 'plugins' | 'generator' | 'test';
const PREFIX = 'puppy-plugins-';
const create = (cmd: NameList, projectName: string) => {
    console.log('your cmd is now runing:', cmd, PREFIX + projectName);
    // runGen('generator-puppy', name);;
}

module.exports = create;

