import Chalk from 'chalk';
const help = (name: string) => {

const helpInfo = Chalk.bold(`
Welcome to ${Chalk.red('puppy-cli')}, we provide native commanders below:
    - list:
        list all commander and how to use them;
    - create:
        create a project react, vue or angluar;
    - help:
        help commander is default and show message like this;

for more infomations, please checkout documents on github.
`)

console.log(helpInfo);
}

module.exports = help;