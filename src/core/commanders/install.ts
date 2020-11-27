import { CheckoutPlugin } from "../check_modules";
import { CreateCmdList } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
//generator-puppy-react
const PREFIX = 'puppy-plugins-';

//puppy -i install react

const install = (pluginName: string): void => {
    console.log(`${pluginName}`, 'pluginType');
    CheckoutPlugin(`${pluginName}`).then((exist: boolean) => {
        if(exist) {
            return console.log('Module has been installed.')
        }
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });


        //write cmd .yml

        const module = require(path.join(osenv.home(), '.puppy/', 'node_modules', pluginName, 'index.js'));

        module.call(null);

    })
}

module.exports = install;