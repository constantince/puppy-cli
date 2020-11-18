import runGen from '../run_generator';

const create = (name: string) => {
    // console.log('run create name is', name);
    runGen('generator-puppy', name);
}

module.exports = create;

