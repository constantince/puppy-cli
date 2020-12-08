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
    /**\
     * local:
     * name  type   abbr  params  desc 
     * 
     */
    let t_native = [];
    for(let i in json.source.native) {
        let {name, abbreviation, description, type, params} = json.source.native[i as OrdersType];
        let obj = {
            name, abbreviation, description, type, params,
            source: 'local'
        }
        t_native.push(obj);
    }
    let t_custom = [];
    for(let i in json.source.custom) {
        let {name, abbreviation, description, type, params} = json.source.custom[i];
        let obj = {
            name, abbreviation, description, type, params,
            source: 'local'
        }
        t_custom.push(obj);
    }

    const all_commands = t_native.concat(t_custom);
    console.table(all_commands);

    // console.log(json);
    // console.table(json);




    return true;
}

module.exports = list;