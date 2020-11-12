import fs from "fs";
import path from "path";
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(path.resolve('./'));
interface Re {
    abbreviation: string,
    description: string,
    core: boolean
}

type Register<T> = {
    (commander: string, config: T, excute: () => void) : void
}

const register: Register<Re> = (commander, configrations, excute) => {
    const result = fs.readFileSync(path.join(process.cwd(), '/config/commanders.config.json'));
    const newCommander = {
        [commander]: configrations
    }
    let json = JSON.parse(result.toString());

    json = JSON.stringify({...json, ...newCommander}, undefined, 4);

    fs.writeFileSync(path.join(process.cwd(), '/config/commanders.config.json'), json);

    //开始注册
    excute()
}

export default register;