import { CreateItemsOptions, PackageManageTool } from "../types/types";
import fs from "fs";
import osenv from "osenv";
import path from "path";
import { excution } from '../tools/index';

let PACKAGEMANAGER: null | PackageManageTool = null;

const checkoutPlugin = (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(osenv.home(), `.puppy/node_modules/${name}`), (err, stat) => {
            if(err) {
                resolve(false);
            }
            resolve(true);
        })
    });
};

const checkoutPackageManageTools = async () : Promise<PackageManageTool | boolean> => {
    if(PACKAGEMANAGER === null) {
        for ( let v in PackageManageTool) {
            const re = await excution([{
                cmd: PackageManageTool[v],
                args: ['-v']
            }]).catch(rex => false);
            if(typeof re === "boolean") continue;
            return re[0].cmd as PackageManageTool;
        }
        return false
    } 
    return PACKAGEMANAGER;
}


export { checkoutPlugin, checkoutPackageManageTools };