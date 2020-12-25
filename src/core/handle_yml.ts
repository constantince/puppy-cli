import { promisify } from "util";
import fs from "fs";
import osenv from "osenv";
import path from "path";
import yaml from 'js-yaml';
import { OrdersType, CmdDesctions, BaseOrder, OrderList } from "../types/types";

const stat = promisify(fs.stat);
const write = promisify(fs.writeFile);
const read = promisify(fs.readFile);
const reddir = promisify(fs.readdir);

type HandlBaseOrder = BaseOrder<OrderList>

export default class Yml {

    path: string = path.join(osenv.home(), '.puppy/', '.puppy.yml');

    rawJson: HandlBaseOrder;

    constructor () {
        
    }

    public async getRawJson(): Promise<HandlBaseOrder> {
        const rawJsonInitialed = typeof this.rawJson !== "undefined";
        if(rawJsonInitialed) {
            return this.rawJson;
        }
        const Exist = await this.checkIfYmlExist();
        if(Exist) {
            const yml = await read(this.path, {encoding: 'utf-8'});
            this.rawJson = yaml.safeLoad(yml) as HandlBaseOrder;
        } else {
            this.rawJson = await this.initialYml();
        }
        return this.rawJson;        
    }

    //
    private checkIfYmlExist(): Promise<fs.Stats> {
        return stat(this.path);
    }

    private parseJsonToYml(): Promise<HandlBaseOrder> {
        const ymlJSON = yaml.dump(this.rawJson);
        // TODO: appendFile
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
                description: '',
                params: []
            }
        }
        return this.parseJsonToYml();
    }

    public async appendToYml(cmd: CmdDesctions): Promise<boolean> {
        if(this.checkCmdFromYml(cmd.name)) {
            return true;
        }
        let json = await this.getRawJson();
        json.source.custom[cmd.name] = cmd;
        return !!this.parseJsonToYml();
        
    }

    public checkCmdFromYml(cmd: string): boolean {
        const {native, custom} = this.rawJson.source;
        if(native[cmd as OrdersType]  || custom[cmd]) {
            return true;
        }
        return false;
    }  



}