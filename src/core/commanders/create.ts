import runGen from '../run_generator';

type NameList = 'plugins' | 'generator' | 'test';

const create = (cmd: NameList, projectName: string) => {
    console.log('your cmd is now runing:', cmd, projectName);
    // runGen('generator-puppy', name);;
}

module.exports = create;

