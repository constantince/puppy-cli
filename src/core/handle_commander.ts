import fs from "fs";
import path from "path";
import osenv from 'osenv';
import yaml from 'js-yaml'
import commander, { Command } from "commander";
import {
    BaseOrder,
    OrderItem,
    OrderList,
    OrdersType,
    Register,
    FindOrder,
    Options
} from '../types/types';

const program = new Command();
const home = path.join(osenv.home(), '.puppy/.puppy.yml');

export default class CommanderProxy {

    ctx: commander.Command;

    baseCommander: OrderList | null = null;

    conf: BaseOrder;

    args: string[] = [];

    curCmd: OrdersType = 'help';

    storeCmd: BaseOrder;

    constructor() {
        this.storeCmd = this.conf = this.transformYaml();
        this.ctx = this.initialCommanders();
        this.args = this.ctx.args;
        console.log(this.args);
    }
    // yaml file transter to json object
    private transformYaml(): BaseOrder {

        if (fs.existsSync(home)) {
            const ymlConfigurations = fs.readFileSync(home, { encoding: 'utf-8' });
            return yaml.safeLoad(ymlConfigurations) as BaseOrder;
        } else {
            return this.writeJsonToYml();
        }

    }

    // parse configration in local
    private writeJsonToYml(): BaseOrder {
<<<<<<< HEAD
        const localConfigurations = fs.readFileSync(path.join(__dirname, '../../../config/commanders.config.json'), { encoding: 'utf-8' });
=======
        const localConfigurations = fs.readFileSync(path.join(__dirname, '../../../config/commanders.config.json'), {encoding: 'utf-8'}); 
>>>>>>> 13de6da787b192885f8eb65645af21e3d3831bce
        this.storeCmd = JSON.parse(localConfigurations) as BaseOrder;
        const ymlJSON = yaml.dump(this.storeCmd);
        fs.writeFileSync(home, ymlJSON);
        return this.storeCmd;
    }

    //inital all native commander
    private initialCommanders(): commander.Command {
        this.baseCommander = this.conf.source.native;
        const keys = Object.keys(this.baseCommander);
        for (let key of keys) {
            if (this.baseCommander.hasOwnProperty(key)) {
                const orderItem: OrderItem = this.baseCommander[key as OrdersType];
                
                // program
                // .option(`-${orderItem.abbreviation}, --${key} <action> [params]`)
                // .action((options) => {
                //     console.log(options.action);
                // });
                // program.command(`${key} <source> [${orderItem.description}]`)
                const cmds = [orderItem.abbreviation, ` --${key} <params> [params2]`];
                program.option(cmds.join(','), orderItem.description);
            }
        }
        return program.parse(process.argv);
    }

    // register commander
    public register: Register = (commander: string, config: OrderItem, excute) => {
        this.storeCmd.source.plugins[commander] = config;
        excute.call(null);
    }

    // replace symbol
<<<<<<< HEAD
    private trimString: FindOrder = (rawCommander) => {
        if (!rawCommander) return 'help';
=======
    private trimString: FindOrder = (rawCommander) =>  {
        if(!rawCommander) return 'help';
>>>>>>> 13de6da787b192885f8eb65645af21e3d3831bce
        return rawCommander.replace(/^-+/g, '') as OrdersType;
    }

    private matchCmd = (cmd: string): string => {
        const re = cmd.match(/(?<=--)[^-\s]+(?=\s+)/);
        if(re === null) return 'help';
        return re[0];
    }

    // find current command in terminal bash
    private findCommander: FindOrder = () => {
        const cur: commander.Option[] = this.ctx.options;
        const longCommanderOptions = cur.find(v => this.ctx.rawArgs[2] === v.short);
        if (longCommanderOptions) {
            this.curCmd = this.trimString(longCommanderOptions.long);
        }
        return this.curCmd;
    }

    // find the module of current commander then excute
    private getCommanderFunc() {
        const curname = this.findCommander();
        const calculate = this.conf.source.native[curname].path;
        return require(calculate);

    }

    public excuteCommander(): OrdersType {
        const func = this.getCommanderFunc();
        func.apply(null, this.args);
        return this.curCmd;
    }
}

// export { initialOrders, register, getCommanderFunc };