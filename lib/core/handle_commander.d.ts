import commander, { Command } from "commander";
import { BaseOrder, OrderList } from '../types/types';
interface Re {
    abbreviation: string;
    description: string;
    path: string;
    core: boolean;
}
declare type Register<T> = {
    (commander: string, config: T, excute: () => void): void;
};
declare const initialOrders: () => commander.Command;
declare const getCommanderFunc: () => void;
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
declare const register: Register<Re>;
export default class CommanderProxy {
    ctx: commander.Command;
    baseCommander: OrderList | null;
    conf: BaseOrder | null;
    constructor();
    private transformYaml;
    private initialCommanders;
    register(): void;
    private findCommander;
    getCommanderFunc(): void;
    pickUpCommander(): void;
}
export { initialOrders, register, getCommanderFunc };
