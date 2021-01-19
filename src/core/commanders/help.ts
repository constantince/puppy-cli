import Chalk from 'chalk';
import { NativeCommandFunctions } from "../../types/types";
// import { excution } from '../../tools/';
import execa from 'execa';
// chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
const help:NativeCommandFunctions = async name => {

    const version  = await execa("npm", ["info", "puppy-cli"]);
    console.log(
        Chalk.bold(
            "version current:",
            Chalk.underline.yellowBright("1.1.6"),
            "avaiable:",
            Chalk.underline.green("1.2.0")
            )
        );
    return true;
}

module.exports = help;