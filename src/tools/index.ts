
import execa from 'execa';
import pEachSeries from 'p-each-series';
import {checkoutPackageManageTools} from '../core/checker';
import { PackageManageTool } from '../types/types';

type Commanders = {
    cmd: string,
    args: string[],
    cwd?: string
}

export const excution = async (args: Iterable<Commanders>) => {
    return pEachSeries(args, async ({cmd, args, cwd}: Commanders) => {
        const _c = await checkoutPackageManageTools();
        //前面有判断，到了这一步，一定会有值的。
        return execa(_c as PackageManageTool, args, {cwd})
    })
}