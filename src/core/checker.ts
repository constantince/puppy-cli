import { CreateItemsOptions, PackageManageTool } from "../types/types";
import fs from "fs";
import osenv from "osenv";
import path from "path";
import execa from 'execa';

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
            const u: PackageManageTool = PackageManageTool[v] as PackageManageTool;
            const re = await execa(u, ['-v']).then(res => !res.failed).catch(res => false)
            return re ? u : false;
        }
        return false;
    }
    return PACKAGEMANAGER;
}


export { checkoutPlugin, checkoutPackageManageTools };