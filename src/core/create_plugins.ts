class CreatePlugins {

    name: string;

    //创建插件命令
    constructor(name: string, version?: string) {
        this.name = name;
    }

   
    entre() {
         //进入插件目录
        process.chdir(__dirname + '/plugins/' + this.name);
        //检查版本
        const isLatest = this.checkOutVersion();

        if(isLatest === false) {
            this.upgradePlugins();
        }

        //执行命令
        this.executeCommander();

    }
    //检查版本
    checkOutVersion(): boolean {
        return false;
    }

    //更新组件
    upgradePlugins() {

    }

    //执行命令
    executeCommander() {

    }
}