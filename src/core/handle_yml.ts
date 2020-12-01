import { promisify } from "util";
import fs from "fs";
import osenv from "osenv";
import path from "path";
import yaml from 'js-yaml';
import { OrdersType, OrderItem, BaseOrder } from "../types/types";

const stat = promisify(fs.stat);
const write = promisify(fs.writeFile);
const read = promisify(fs.readFile);
const reddir = promisify(fs.readdir);

export default class Yml {

    path: string = path.join(osenv.home(), '.puppy/', '.puppy.yml');

    rawJson: any = {};

    constructor () {
        // this.checkIfYmlExist().then(err => {
        //     if(err) {
        //         this.rawJson = this.initialYml();
        //     }
        //     read(this.path, 'utf-8').then(res => {
        //         this.rawJson = yaml.safeLoad(res);
        //     });
        // }).catch(ex => console.log)
        
    }

    private async getRawJson(): Promise<BaseOrder> {
        const rawJsonInitialed = Object.keys(this.rawJson).length > 0;
        if(rawJsonInitialed) {
            return this.rawJson;
        }
        const Exist = await this.checkIfYmlExist();
        if(Exist) {
            this.rawJson = await this.initialYml();
        } else {
            const yml =  await read(this.path, {encoding: 'utf-8'});
            this.rawJson = yaml.safeLoad(yml);
        }
        return this.rawJson;        
    }

    //
    private checkIfYmlExist(): Promise<fs.Stats> {
        return stat(this.path);
    }

    private parseJsonToYml(): Promise<boolean> {
        const ymlJSON = yaml.dump(this.rawJson);
        return write(this.path, ymlJSON).then(res => {
            if(typeof res === "string") {
                return false;
            }
            return true;
        });
    }

    private initialYml() {
        this.rawJson = {
            source: {
                native: {

                },
                custom:{

                }
            },
            version: 1
        };

        reddir(this.path).then((res: string[]) => {
           res.forEach(item => {
               const name = item.replace(/\.[tj]s$/, '') as OrdersType;
               this.rawJson.source.native[name] = 
                {
                    path: path.resolve(name),
                    type: 'native',
                    abbreviation: `-${name[0]}`,
                    description: ''
                }
            });
            this.parseJsonToYml();
        });
    }

    public async appendToYml(cmd: OrderItem): Promise<boolean> {
        let json = await this.getRawJson();
        json.source.custom[cmd.name] = cmd;
        return this.parseJsonToYml();
        
    }

    public checkCmdFromYml(cmd: string): string | false {

        const native = this.rawJson.source.native;
        const custom = this.rawJson.source.custom;

        if(native[cmd]) {
            return native[cmd].path;
        }
        if(custom[cmd]) {
            return custom[cmd].path;
        }
        return false;
    }  



}