import runGen from '../run_generator';

const create = (name: string) => {
    runGen(name, name);
}

export default create;

