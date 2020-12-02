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
    Options,
    RegisterFn,
    Require
} from '../types/types';

const program = new Command();
const home = path.join(osenv.home(), '.puppy/.puppy.yml');

export default class CommanderProxy {

    ctx: commander.Command;

    baseCommander: OrderList | null = null;

    conf: BaseOrder;

    args: string[] = [];

    curCmd: string = "help";

    storeCmd: BaseOrder;

    constructor() {
        this.storeCmd = this.conf = this.transformYaml();
        this.ctx = this.initialCommanders();
        this.args = this.ctx.args;
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
        const localConfigurations = fs.readFileSync(path.join(__dirname, '../../../config/commanders.config.json'), {encoding: 'utf-8'}); 
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
                const orderItem = this.baseCommander[key as OrdersType];
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
    public register: RegisterFn = (cmd, excute, desc) => {
        //todo 2012 12 .01 // 注册接口
        // transfoer cmd to format standard
        if(cmd === this.args) {
            excute.call(this, this.args);
        }
        //new YML().appendToYml(commander)
        // return;
        // this.storeCmd.source.custom[commander] = config;
        // excute.call(null);
    }

    // replace symbol
    private trimString: FindOrder = (rawCommander) =>  {
        if(!rawCommander) return 'help';
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
    private getCommanderFunc(): Require | RegisterFn | false {
        const curname = this.findCommander() as OrdersType;
        let cmdConf = this.conf.source.custom[curname];
        if(this.getCmdType() === "native") {
            cmdConf = this.conf.source.native[curname];
        }
        
        if(typeof cmdConf === undefined) return false;
        // todo 20201202
        const calculate = cmdConf.path;
        return require(calculate);

    }

    public checkCmdType(): 'native' | 'custom' {
        const curname = this.findCommander() as OrdersType;
        const cmdConf = this.conf.source.native[curname];
        if(typeof cmdConf === undefined) 'custom';
        return 'native';
        
    }

    private getCmdType(): 'native' | 'custom' {
        if(['help', 'create', 'install', 'list'].indexOf(this.curCmd) >= 0) {
            return "native";
        }
        return 'custom';
    }

    public excuteCommander(): OrdersType | void | string {
        const func = this.getCommanderFunc();
        if(func === false) {
            return console.log('Can\' not find cmd, your should install plugin related to first')
        }

        const m = require("./commanders/happy");
        m.call(null, this.register);
        //native cmd
        // if(this.getCmdType() === 'native') {
        //     func.apply(null, this.args);
        // } else {
        //     func.call(null, this.register);
        // }
        // todo 20201202 
        // check cmd type
        // excute callback at the second time;
        
        return this.curCmd;
    }
}

// export { initialOrders, register, getCommanderFunc };