import Yml from "../handle_yml";
//list local and remote list commanders
type NativeCommandFunctions = {
    (params: string) : Promise<boolean>
}

const list: NativeCommandFunctions = async params => {
    const yml = new Yml();
    const json = await yml.getRawJson();
    console.log(json);




    return true;
}

module.exports = list;