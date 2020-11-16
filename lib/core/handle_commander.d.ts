import commander, { Command } from "commander";
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
export { initialOrders, register, getCommanderFunc };
