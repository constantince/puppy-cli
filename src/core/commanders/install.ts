import { CheckoutPlugin } from "../check_modules";
import { CreateCmdList } from "../../types/types";
import Spawn from "cross-spawn";
import path from "path";
import osenv from "osenv";
import YML from "../handle_yml";
//generator-puppy-react
const PREFIX = 'puppy-plugins-';

//puppy -i install react
const yml = new YML();
const install = (pluginName: string): void => {
    const module = require("./happy.js");
    module.call(this, function(str: string[], callback: any, desc: string){
        
        yml.appendToYml({
            name: "happy",
            abbreviation: '-ha',
            description: "Fro test",
            path: '/src/user/local/nginx/index.js',
            type: 'custom'
        }).then(res => {
            if(res === true) {
                console.log("successed....")
            } else {
                console.log("error:", res)
            }
        });
    });


    

    CheckoutPlugin(`${pluginName}`).then((exist: boolean) => {
        console.log('done');
        // if(exist) {
        //     return console.log('Module has been installed.')
        // }
        // process.chdir(path.join(osenv.home(), '.puppy/'));
        // Spawn.sync('npm', ['install', `${pluginName}`, '-D'], { stdio: 'inherit' });


        //write cmd .yml

        
        // const module = require(path.join(osenv.home(), '.puppy/', 'node_modules', pluginName, 'index.js'));
       

    });
}

module.exports = install;