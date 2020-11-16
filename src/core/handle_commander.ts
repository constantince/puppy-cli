import fs from "fs";
import path from "path";
import osenv from 'osenv';
import yaml from 'js-yaml'
import commander, {Command} from "commander";
import { BaseOrder, OrderItem, OrderList, OrdersType } from '../types/types';
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
    const baseCommaner = myConf.native;
    // const orderItem: OrderItem = baseCommaner[commander];
    // const _m = ['-' + orderItem.abbreviation, `--${commander} <params>`, orderItem.description];
    // program.option(_m.join(','));
    const keys = Object.keys(baseCommaner);
    for(let key of keys) {
        if(baseCommaner.hasOwnProperty(key)) {
            const orderItem: OrderItem = baseCommaner[key as OrdersType];
            const _m = ['-' + orderItem.abbreviation, `--${key} <params>`, orderItem.description];
            program.option(_m.join(','));
        }
    }
    return program.parse(process.argv);
    // return program;
}


const calculateWitchCommander = (p: commander.Command) => {
    return p.options[0].Option.long.replace(/-/g, '');
}


const getCommanderFunc = (path: string, arg) => {
    const calculateWitchCommander = require(path);
    const p =  <any>myConf[calculateWitchCommander].path;
    const func = require(p);
    func.call(this, ...arg)
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
    //
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

export { initialOrders, register };