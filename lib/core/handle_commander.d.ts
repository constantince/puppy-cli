import commander from "commander";
import { BaseOrder, OrderList, OrdersType, Register } from '../types/types';
export default class CommanderProxy {
    ctx: commander.Command;
    baseCommander: OrderList | null;
    conf: BaseOrder;
    args: string[];
    curCmd: OrdersType;
    storeCmd: BaseOrder;
    constructor();
    private transformYaml;
    private writeJsonToYml;
    private initialCommanders;
    register: Register;
    private trimString;
    private matchCmd;
    private findCommander;
    private getCommanderFunc;
    checkCmdType(): 'native' | 'custom';
    excuteCommander(): OrdersType | void;
}
