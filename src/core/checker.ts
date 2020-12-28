import { CreateItemsOptions } from "../types/types";
import fs from "fs";
import osenv from "osenv";
import path from "path";
import spawn from "cross-spawn";

type PackageManageTool  = "npm" | "cnpm" | "yarn" | "tnpm" | "pnpm";
const PackageManageTools = ["cnpm", "npm", "pnpm", "tnpm", "yarn"];

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

const checkoutPackageManageTools = async () : Promise<PackageManageTool | undefined> => {
    const tools = PackageManageTools.filter(async _t => {
        const result = await spawn.sync(_t, ["-v"], {stdio: "ignore"});
        return result.status === 0;
    });
    return (tools as PackageManageTool[])[0];
}


export { checkoutPlugin, checkoutPackageManageTools };