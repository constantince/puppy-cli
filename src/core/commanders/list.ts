import Yml from "../handle_yml";
import Chalk from 'chalk';
import { OrderItem, OrderList, OrdersType } from "../../types/types";
//list local and remote list commanders
type NativeCommandFunctions = {
    (params: string) : Promise<boolean>
}

const list: NativeCommandFunctions = async params => {
    const yml = new Yml();
    const json = await yml.getRawJson();
    let t_native = [];
    for(let i in json.source.native) {
        let { description, type, params} = json.source.native[i as OrdersType];
        let obj = {
            name: i, description, type, params: params.map(v => v.name).join(','),
            source: 'local'
        }
        t_native.push(obj);
    }
    let t_custom:any = [];
    for(let i in json.source.custom) {
        let { description, type, params} = json.source.custom[i];
        let obj = {
            name: i, description, type, params,
            source: 'local'
        }
        t_custom.push(obj);
    }

    const all_commands = t_native.concat(t_custom);
    console.table(all_commands);

    return true;
}

module.exports = list;