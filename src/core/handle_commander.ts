import fs from "fs";
import path from "path";
import osenv from 'osenv';
import yaml from 'js-yaml'
import commander, {Command} from "commander";
import { BaseOrder, OrderItem, OrderList, OrdersType, Find } from '../types/types';
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
interface Re {
    abbreviation: string,
    description: string,
    path: string,
    core: boolean
}

type Register<T> = {
    (commander: string, config: T, excute: () => void) : void
}

const home = path.join(osenv.home(), '.puppy/.puppy.yml');
const ymlConfigurations = fs.readFileSync(home, {encoding: 'utf-8'});
let myConf:BaseOrder;
if(ymlConfigurations) {
    myConf = yaml.safeLoad(ymlConfigurations) as BaseOrder;
}

// console.log(myConf);
const program = new Command();
const initialOrders = (): commander.Command => {
    /**
     * jude the commaner type
     * download package
     * read the yaml file
     * gister the commander
     * get the paramers
     * excute modules
     */
   
    // const orderItem: OrderItem = baseCommaner[commander];
    // const _m = ['-' + orderItem.abbreviation, `--${commander} <params>`, orderItem.description];
    // program.option(_m.join(','));;
    const baseCommaner = myConf.source.native;
    console.log('base is', baseCommaner);
    const keys = Object.keys(baseCommaner);
    console.log(keys)
    for(let key of keys) {
        if(baseCommaner.hasOwnProperty(key)) {
            const orderItem: OrderItem = baseCommaner[key as OrdersType];
            const _m = [orderItem.abbreviation, ` --${key} <params>`];
            console.log(_m.join(','))
            program.option(_m.join(','), orderItem.description);
        }
    }
    return program.parse(process.argv);
}

// const getCurrentCommander = (commander: Command.Command) => {

// }


const calculateWitchCommander = (): OrdersType => {
    const p = initialOrders()
    const cur =  p.options;
    console.log(cur, p);
    const _c = cur.find((v: any) => p[v.long.replace(/-/g, '')]);
    return _c.long.replace(/-/g, '');
}


const getCommanderFunc = () => {
    const curname = calculateWitchCommander();
    console.log('curname is' + curname)
    const baseCommaner = myConf.source.native;
    const calculate = baseCommaner[curname].path;
    console.log(calculate)
    const func = require(calculate);
    console.log(func, program.args);
    func.call(this, ...program.args);
    // const p =  <any>myConf[calculateWitchCommander].path;
    // const func = require(p);
    // func.call(this, ...arg)
}

/**
 * register("x", {
    abbreviation: xxx,
    description: xxxx is xxxx,
    path: xxxx/xxx/xxx/xxx/xxx/xxx,
    core: false
 * }, () => {
 *  yoojjpjejhsdw8u3ehh
 * })
 * 
 */
//
const register: Register<Re> = (commander, configrations, excute) => {

/*
    1 check if exist
    2 down load package
    3 update yaml file
    4 excute plugin
*/


    // const result = fs.readFileSync(path.join(process.cwd(), '/config/commanders.config.json'));
    // const newCommander = {
    //     [commander]: configrations
    // }
    // let json = JSON.parse(result.toString());

    // json = JSON.stringify({...json, ...newCommander}, undefined, 4);

    // fs.writeFileSync(path.join(process.cwd(), '/config/commanders.config.json'), json);

    //开始注册
    excute()
}

export default class CommanderProxy {

    ctx: commander.Command;

    baseCommander: OrderList | null = null;

    conf: BaseOrder | null = null;

    constructor() {
        this.transformYaml();
        this.ctx = this.initialCommanders();
    }

    private transformYaml() {
        const home = path.join(osenv.home(), '.puppy/.puppy.yml');
        const ymlConfigurations = fs.readFileSync(home, {encoding: 'utf-8'});
        if(ymlConfigurations) {
            this.conf = yaml.safeLoad(ymlConfigurations) as BaseOrder;
        }
    }

    private initialCommanders(): commander.Command {
        this.baseCommander = (<BaseOrder>this.conf).source.native;
        const keys = Object.keys(this.baseCommander);
        for(let key of keys) {
            if(this.baseCommander.hasOwnProperty(key)) {
                const orderItem: OrderItem = this.baseCommander[key as OrdersType];
                const _m = [orderItem.abbreviation, ` --${key} <params>`];
                console.log(_m.join(','))
                program.option(_m.join(','), orderItem.description);
            }
        }
        return program.parse(process.argv);
    }

    public register() {

    }

    private findCommander : Find<boolean> = () => {
        const cur =  this.ctx.options;
        const longCommander = cur.find((v: any) => cur[v.long.replace(/-/g, '')]);
        return longCommander.long.replace(/-/g, '');
    }

    public getCommanderFunc() {
        const curname = this.findCommander(true);
        // console.log('curname is' + curname)
        const baseCommaner = myConf.source.native;
        const calculate = this.ctx[curname].path;
        // console.log(calculate)
        const func = require(calculate);
        // console.log(func, program.args);
        func.call(this, ...program.args);
    }

    public pickUpCommander() {

    }


}

export { initialOrders, register, getCommanderFunc };