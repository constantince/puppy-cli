
import execa from 'execa';
import pEachSeries from 'p-each-series';

type Commanders = {
    cmd: string,
    args: string[],
    cwd: string
}

export const excution = async (args: Iterable<Commanders>) => {
    return pEachSeries(args, async ({cmd, args, cwd}: Commanders) => {
        return execa(cmd, args, {cwd})
    })
}