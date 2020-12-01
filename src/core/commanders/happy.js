const happy = (register) => {



    console.log("happy plugins loaded...");


    register(["log"], (log) => {
        console.log(log);


    }, "log your logger");
}

module.exports = happy;