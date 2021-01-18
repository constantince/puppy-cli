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
    ComParams,
    PackageManageTool
} from '../types/types';

import { promisify } from 'util';
import { checkoutPackageManageTools } from './checker';

const mkdir = promisify(fs.mkdir);
const isExist = promisify(fs.exists);
const read = promisify(fs.readFile);

const program = new Command();
const home = path.join(osenv.home(), '.puppy/.puppy.yml');
export default class CommanderProxy {

    baseCommander: OrderList | null = null;

    conf: BaseOrder;

    args: string[] = [];

    storeCmd: BaseOrder;

    pm:PackageManageTool = "cnpm";

    constructor() {
        
        //命令转换器
        Promise.all([checkoutPackageManageTools(),  this.transformYaml()])
        .then(([p, y]) => {
            if(typeof p === "boolean") {
                return console.log("You shoud install a package manager first!");
            }
            //优先包管理器
            this.pm = p;
            //ymal文件转化后的json对象
            this.conf = y;
            //初始化命令
            this.initialCommanders();
            //start commander
            this.excuteCommander();
        })
    }
    // yaml file transter to json object
    private async transformYaml(): Promise<BaseOrder> {
        const root = path.join(osenv.home(), '.puppy');
        const yml = path.join(root, '.puppy.yml')
        const rootStat = await isExist(root);
        if(rootStat === false) {
            await mkdir(root)
        }
        const ymlStat = await isExist(yml);
        if (ymlStat) {
            const ymlConfigurations = await read(yml, { encoding: 'utf-8' });
            return yaml.safeLoad(ymlConfigurations) as BaseOrder;
        } else {
            return this.writeJsonToYml();
        }

    }

    // parse configration in local
    private writeJsonToYml(): BaseOrder {
        const localConfigurations = fs.readFileSync(path.join(__dirname, '../../config/commanders.config.json'), {encoding: 'utf-8'}); 
        const cmds = JSON.parse(localConfigurations) as BaseOrder;
        console.log("cmds", cmds);
        this.addPathToYml(cmds.source.native);
        const ymlJSON = yaml.dump(cmds);
        //window mac linux consideration!--
        fs.writeFileSync(home, ymlJSON);
        return cmds;
    }

    //set native path to yml file
    private addPathToYml(nativeCmds: BaseOrder['source']['native']) {
        for(let i in nativeCmds) {
            const sig = nativeCmds[i as OrdersType];
            sig.path = path.join(__dirname, sig.path);
        }
    }

    // inital all native commander
    private initialCommanders(): void {
        const allCommands = { 
            ...this.conf.source.native,
            ...this.conf.source.custom
        };
        console.log("come in")
        for (let key in allCommands) {
            if (allCommands.hasOwnProperty(key)) {
                const orderItem = allCommands[key as OrdersType];
                const {params, description, path} = orderItem;
                const cur:commander.Command = program.version("0.0.1").command(key);
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
            if(element.name) {
                cur.option(
                    `${element.abbr}, ${element.name} [name]`, 
                    desc
                )
            }
                
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