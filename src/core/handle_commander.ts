import fs from "fs";
import path from "path";
import osenv from 'osenv';
import yaml from 'js-yaml';
import Chalk from 'chalk';
import commander, { Command } from "commander";
import {
    BaseOrder,
    OrderList,
    OrdersType,
    RegisterFn,
    NativeFunc,
    CustomFunc,
    ComParams
} from '../types/types';

const program = new Command();
const home = path.join(osenv.home(), '.puppy/.puppy.yml');

export default class CommanderProxy {

    baseCommander: OrderList | null = null;

    conf: BaseOrder;

    args: string[] = [];

    storeCmd: BaseOrder;

    constructor() {
        //命令转换器
        this.storeCmd = this.conf = this.transformYaml();
        //初始化命令
        this.initialCommanders();

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
        const localConfigurations = fs.readFileSync(path.join(__dirname, '../../config/commanders.config.json'), {encoding: 'utf-8'}); 
        this.storeCmd = JSON.parse(localConfigurations) as BaseOrder;
        const ymlJSON = yaml.dump(this.storeCmd);
        //window mac linux consideration!--
        fs.writeFileSync(home, ymlJSON);
        return this.storeCmd;
    }

    // inital all native commander
    private initialCommanders(): void {
        const allCommands = { 
            ...this.conf.source.native,
            ...this.conf.source.custom
        };
        for (let key in allCommands) {
            if (allCommands.hasOwnProperty(key)) {
                const orderItem = allCommands[key as OrdersType];
                const {params, description, path} = orderItem;
                const cur:commander.Command = program
                            .version("0.0.1")
                            .command(key);
                this.addParams(params, orderItem.description, cur);
                cur.action(cmd => {
                    const args = this.handleVariousParams(params, cmd);
                    console.log(
                        "commander:",cmd._name,'\n',
                        "module path:", path,'\n',
                        "desc:", description,'\n',
                        "params", args
                    )
                    //single params to do let it mutiple
                    // const arg = cmd[params[0].name.replace('--', '')];
                    const func = require(path);
                    if(this.getCmdType(cmd._name) === "native") {// 本地命令
                        (func as NativeFunc).apply(this, args).then((res: boolean) => {
                            console.log(
                                Chalk.underline.bold.bgGray(cmd._name, 'excution stat:', res ? 'success': 'failed')
                            );
                        });
                    } else { //自定义命令
                        // 第二次执行函数体，第一次执行的是命令写入 TODO: child_process.exec("xxxxxx.index")
                        const register : RegisterFn = (cmdNotUse, modules, descNotUse) => {
                            modules.apply(this, args);
                        }
                        (func as CustomFunc).call(this, register);
                    }
                });
                
            }}
    }

    private addParams(params: ComParams[], desc:string, cur: commander.Command): void {
        params.forEach((element: ComParams) => {
            cur.option(
                `${element.abbr}, ${element.name} [name]`, 
                desc
            )
        });
    }

    private handleVariousParams(params: ComParams[], source: commander.Command): string[] {
        if(params.length === 0) {
            return source.args;
        } else {
            return params.map(v => {
                if(v.name)
                    return source[v.name?.replace(/-/g, '')]
                else
                    return null
            });
        }
    }

    // get the cmd stdin console panel
    private getCmdType(cmd: string): 'native' | 'custom' {
        if(OrdersType.indexOf(cmd) >= 0) {
            return "native";
        }
        return 'custom';
    }

    // start to excute your command
    public excuteCommander(): void {
        // 开始执行命令
        program.parse(process.argv);
    }
}

// export { initialOrders, register, getCommanderFunc };