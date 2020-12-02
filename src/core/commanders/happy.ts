const happy = (register: any) => {



    console.log("happy plugins loaded...");


    register(["log"], (...log: string[]) => {
        console.log(log);
    }, "log your logger");
}

module.exports = happy;