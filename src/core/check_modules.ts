import { CreateCmdList } from "../types/types";
import fs from "fs";
import osenv from "osenv";
import path from "path";

const CheckoutMoudles = (cmd: CreateCmdList, name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(osenv.home(), `/lib/core/commanders/${name}.js`), (err, stat) => {
            if(err) {
                resolve(false);
            }
            resolve(true);
        })
    });
};

export { CheckoutMoudles };