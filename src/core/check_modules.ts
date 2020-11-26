import { CreateCmdList } from "../types/types";
import fs from "fs";
import osenv from "osenv";
import path from "path";

const CheckoutPlugin = (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(osenv.home(), `.puppy/node_modules/${name}`), (err, stat) => {
            if(err) {
                resolve(false);
            }
            resolve(true);
        })
    });
};


export { CheckoutPlugin };