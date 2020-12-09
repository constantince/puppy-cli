import Chalk from 'chalk';
import { NativeCommandFunctions } from "../../types/types"
const help:NativeCommandFunctions = async name => {

    console.log(Chalk.bold(`
    Welcome to ${Chalk.red('puppy-cli')}, we provide native commanders below:
        - list:
            list all commander and how to use them;
        - create:
            create a project react, vue or angluar;
        - help:
            help commander is default and show message like this;
        - install:
            install all commands from remote git repo;

    for more infomations, please checkout documents on github.
    `))

    return true;

}

module.exports = help;