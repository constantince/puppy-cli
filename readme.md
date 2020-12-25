<font size=2>

#### puppy-cli说明文档
<code>puppy-cli</code> 为cli(commander line interact)工程化工具。指在为提高工作效率，减少人工介入操作流程。帮助开发工程师专注于自己的具体业务。<code>puppy-cli</code>的内核功能非常少，但是可扩展性确很高。主要通过开发者自定义插件系统来丰富它的功能，做到即插即用。

##### 安装
```bash
    #通过全局包安装的方式来安装puppy模块
    npm install puppy-cli -g
```


##### 命令
- create
<code>create</code>命令用来创建各种初始化模板，如果一个新的react项目，或者npm package，又或者我们经常用到的第三方非标。create命令通过yoman脚手架的api提供控制台选项可视化操作，快速完成项目的创建。你可以在顺易通私有仓库看到以generator-puppy-开头的模块，后面的名字就是create参数的命令字符。例如你可以通过下面的方式来创建一个新的非标项目。
```bash
    # 创建本地插件模板
    puppy create -p third-pay
```
<code>puppy-cli</code>会去私有仓库中查找是否存在<code>generator-puppy-third-pay</code>的package，并且下载到你本地运行。第一次下载可能需要点时间，后续操作会非常快速便捷。你可以在每个package的文档中查看各个配置的说明，原则是，说明文档会被作者与插件一起上传到私有的库上。

- install
<code>install</code>命令是用来安装私有库的package的，仓库中很多同时开发了新的插件，这些插件或许会对你的开发也有用，那么你可以通过下面的方式，把插件集成安装到<code>puppy-cli</code>中去，这个是本工具最开放的地方，利用群众的力量。首先你去仓库中查找相关的模块，这些模块必须以puppy-plugins-开头，然后安装它们：

```bash
   #安装本地插件
   puppy install -p puppy-plugins-test
```
<code>puppy-cli</code>会把命令自动注册到本地命令列表中，你只需使用<font color=red>puppy list</font>来查看新加入的插件命令。create 命令会帮助你生成插件的模板，你只需要编写配置项和业务代码，即可快速实现插件开发。请注意编写好详细的插件文档，方便开发这查阅。

- help
<code>help</code>命令帮助你生成一些本地的命令信息以及描述。只需执行以下命令即可：

```bash
  puppy help
```

- list
<code>list</code>命令名称和参数列表，你可以经常查看，以便开发过程中查阅。

```bash
  puppy list
```

##### 插件体系

<code>puppy-cli</code> 本身只有极少的命令，通过插件和组件拼装的方式来实现各个功能。开发者可以自己编写自己的插件和生成器脚手架来方便自己的构建流程。你可以在[这里](http://10.10.204.38:4873/)看到目前开发者开放的插件以及它们相关的文档；

- 使用cli生成开发插件模版
  ``` bash
  #生成插件
  puppy create plugins
  ```

- 开始开发你的插件
    ```ts
    type Cms = {[ k in 'name' | 'abbr' | 'desc'] : string};

    type CmdDesctions = {
        name: string,
        abbr: string,
        description: string,
        params: Cms[]        
    }

    // write your cmd configrations here:
    const CmdDesctions:CmdDesctions = {
        name: 'hello', // command name
        type: 'custoom', // plugins type default custom
        description: 'xxxxxx', // command description
        params: [{ // commander paramters
          "name": "--project", //commander name
          "abbr": "-p", // commander abbreviation
          "desc": "project name" // desction for cmd
        }], // params name
    };


    const happy = (register: any):void => {
        console.log('happy plugins loaded...');
        register(CmdDesctions, (log: Cms) => {
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
-  使用插件
  ```bash
    puppy your-cmds -p xxxx
  ```
<font>