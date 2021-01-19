
import execa from 'execa';
import pEachSeries from 'p-each-series';
import {checkoutPackageManageTools} from '../core/checker';
import { PackageManageTool } from '../types/types';

type Commanders = {
    cmd?: string,
    args: string[],
    cwd?: string
}

interface mutiProcess<T> {
    (c: Iterable<T>): Promise<Iterable<T>>
}

type Excution = (c: Commanders) => execa.ExecaChildProcess

export const mutiProcess: mutiProcess<Commanders> = async c => {
    const cmd = await pEachSeries(c, async ({cmd, args, cwd}: Commanders) => {
        execa(cmd as PackageManageTool, args, {cwd});
    });
    return cmd;
}

// export const excutions: Excution = async (c) => {
    // const stdout = await execa(c.cmd as PackageManageTool, c.args, {cwd: c.cwd});
    // return stdout;


    // const _c = cmd || await checkoutPackageManageTools();
    //     //前面有判断，到了这一步，一定会有值的。
    //     const x = await execa(_c as PackageManageTool, args, {cwd});
    //     return x;
// }