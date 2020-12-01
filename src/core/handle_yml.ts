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

    rawJson: BaseOrder;

    constructor () {
        this.rawJson = {
            source: {
                native: {},
                custom:{}
            },
            version: '1'
        };
        
    }

    private async getRawJson(): Promise<BaseOrder> {
        const rawJsonInitialed = Object.keys(this.rawJson.source.native).length > 0;
        if(rawJsonInitialed) {
            return this.rawJson;
        }
        const Exist = await this.checkIfYmlExist();
        if(Exist) {
            const yml = await read(this.path, {encoding: 'utf-8'});
            this.rawJson = yaml.safeLoad(yml) as BaseOrder;
        } else {
            this.rawJson = await this.initialYml();
        }
        return this.rawJson;        
    }

    //
    private checkIfYmlExist(): Promise<fs.Stats> {
        return stat(this.path);
    }

    private parseJsonToYml(): Promise<BaseOrder> {
        const ymlJSON = yaml.dump(this.rawJson);
        return write(this.path, ymlJSON).then(res => {
            return this.rawJson;
        });
    }

    private async initialYml() {
        const dir = await reddir(this.path);
        
        for(let i=0; i<dir.length; i++) {
            const name = dir[i].replace(/\.[tj]s$/, '') as OrdersType;
            this.rawJson.source.native[name] = 
            {
                path: path.resolve(name),
                type: 'native',
                abbreviation: `-${name[0]}`,
                description: ''
            }
        }
        return this.parseJsonToYml();
    }

    public async appendToYml(cmd: OrderItem): Promise<boolean> {
        if(this.checkCmdFromYml(cmd.name)) {
            return true;
        }
        let json = await this.getRawJson();
        json.source.custom[cmd.name] = cmd;
        return !!this.parseJsonToYml();
        
    }

    public checkCmdFromYml(cmd: string): boolean {

        const native = this.rawJson.source.native;
        const custom = this.rawJson.source.custom;
        if(native[cmd as OrdersType]) {
            return true;
        }
        if(custom[cmd]) {
            return true;
        }
        return false;
    }  



}