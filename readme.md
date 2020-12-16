<font size=2>

#### PUPPY-CLI说明文档
puppy-cli 为cli(commander line interact)工程化工具。指在为提高工作效率，减少人工介入操作流程。帮助开发工程师专注于自己的具体业务。puppy-cli的内核功能非常少，但是可扩展性确很高。主要通过开发者自定义插件系统来丰富它的功能，做到即插即用。

##### 安装
```bash
    npm install puppy-cli -g
```


##### 命令
```bash
    # 创建本地插件模板
    puppy create -p puppy-plugins-test
    # 安装相关的插件
    puppy install xxx
    # 列出所有的本地命令列表详细信息
    puppy list 
    #查看所有的命令以及描述
    puppy help
```


##### 插件体系

puppy-cli 本身只有极少的命令，通过插件和组件拼装的方式来实现各个功能。开发者可以自己编写自己的插件和生成器脚手架来方便自己的构建流程。你可以在[这里](https://www.baidu.com)看到目前开发者开放的插件以及它们相关的文档；

- 使用cli生成开发插件模版
  ``` bash
  #生成插件
  puppy create plugins

  ```

- 开始开发你的插件
    ```ts
    type Cms = {
      [k in 'abbreviation' | 'params' | 'description']: string
    }
    type CmdDesctions = {
        name: string
    } & Partial<Cms>;

    // write your cmd configrations here:
    const CmdDesctions:CmdDesctions = {
        name: '', // command name
        abbreviation: '', // first params abbreviation
        params: '', // fisrt params name
    };
    const happy = (register: any):void => {
        console.log('happy plugins loaded...');
        register(CmdDesctions, (log: string) => {
            // write or import modules or logic here
            console.log(log);
        }, 'write your plugins descriptions or specification here');
    };

    module.exports = happy;
    ```
- 发布你的插件
    ```bash
        npm publish
    ```

- 安装插件
  发布插件到npm上之后，你可以通过以下命令，将插件集成到cli中使用。
  ```bash
    puppy install -p puppy-plugins-xxxx
  ```
安装好插件以后，你可以阅读插件文档，了解通过何种命令来启动插件。

-  使用插件
  ```bash
    puppy yourcmds -p xxxx
  ```
<font>