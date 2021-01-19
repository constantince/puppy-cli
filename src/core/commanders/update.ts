import ora from 'ora';
import { mutiProcess } from '../../tools/index';
import path from 'path';
import osenv from 'osenv';

const update = async (generator: string) => {
    if(generator) {
        const Dependencies = [
            {
                args: ['install', '--registry', 'http://10.10.204.38:4873', generator+'@latest', '-D'],
                cwd: path.join(osenv.home(), '.puppy/')
            }
        ]
        const rootP = mutiProcess(Dependencies);
        ora.promise(rootP, `Upgrading...`);
        await rootP;
        return true
    } else {
        return false;
    }
}

module.exports = update;