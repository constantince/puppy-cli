import fs from "fs";
import path from "path";
import osenv from 'osenv';
import yaml from 'js-yaml'
import {Command} from "commander";
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
const initialOrders = () => {
    const baseCommaner = myConf.native;
    const keys = Object.keys(baseCommaner);
    for(let key of keys) {
        if(baseCommaner.hasOwnProperty(key)) {
            const orderItem: OrderItem = baseCommaner[key as OrdersType];
            const _m = ['-' + orderItem.abbreviation, `--${key} <params>`, orderItem.description];
            program.option(_m.join(','));
        }
    }
    program.parse(process.argv);
}

//
const register: Register<Re> = (commander, configrations, excute) => {
    const result = fs.readFileSync(path.join(process.cwd(), '/config/commanders.config.json'));
    const newCommander = {
        [commander]: configrations
    }
    let json = JSON.parse(result.toString());

    json = JSON.stringify({...json, ...newCommander}, undefined, 4);

    fs.writeFileSync(path.join(process.cwd(), '/config/commanders.config.json'), json);

    //开始注册
    excute()
}

export default { initialOrders, register };