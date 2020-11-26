import { CheckoutMoudles } from "../check_modules";
import { CreateCmdList } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";

const PREFIX = 'puppy-plugins-';


const install = (pluginType: CreateCmdList, pluginName: string): void => {
    console.log(`puppy-plugins-${pluginName}`, pluginType);
    CheckoutMoudles(pluginType, `puppy-plugins-${pluginName}`, ).then((exist: boolean) => {
        if(exist) {
            return console.log('Module has been installed.')
        }
        process.chdir(path.join(osenv.home(), '.puppy/'));
        Spawn.sync('npm', ['install', `puppy-plugins-${pluginName}`, '-D'], { stdio: 'inherit' });
        console.log(`Module puppy-plugins-${pluginName} installed.`)
    })
}

module.exports = install;