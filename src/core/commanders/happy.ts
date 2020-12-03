type Cms = {
    [k in 'abbreviation' | 'params' | 'description']: string
}
type CmdDesctions = {
    name: string
} & Partial<Cms>;

//write your cmd here:
const CmdDesctions:CmdDesctions = {
    name: 'happy',
    abbreviation: '-n',
    params: 'p'
}
const happy = (register: any) => {
    console.log("happy plugins loaded...");


    register(CmdDesctions, (log: string) => {
        console.log(log);
    }, "log your logger");
}

module.exports = happy;