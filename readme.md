<font size=2>

#### PUPPY-CLI说明文档
puppy-cli 为cli工程化工具。指在为提高工作效率，减少人工介入操作流程。帮助开发工程师专注于自己的具体业务。
##### 安装

```bash
    npm install puppy-cli -g
```


##### 命令
```bash

    puppy -i install xxx # 安装相关的插件

    puppy -h help # 列出所有的本地命令列表

    puppy -c template plugins puppy-plugins-mypluginname # 创建插件模版

    puppy -c template generator puppy-generator-mygeneratorname # 传教脚手架模板

    puppy -c template generator-test-mytesttaskname


```


##### 插件体系

puppy-cli 本身只有极少的命令，通过插件和组件拼装的方式来实现各个功能。开发者可以自己编写自己的插件和生成器脚手架来方便自己的构建流程。
- 使用cli生成开发插件模版
  ``` bash
  puppy -c create plugins
  ```
- 开始开发你的插件
    ```ts
    const YourPluginName = function(ctx) {
        console.log('hello puppy plugins world');
        ctx.commander.register('-xxx, xxxx <params>', (...args) => {
            //实际插件函数执行主体
            console.log('hi, i am new plugins', ...args)
        })
    }

    module.exports = YourPluginName;
    ```
- 发布你的插件
    ```bash
    npm publish
    ```

- 安装插件
  
  ```bash
    puppu -i install puppy-plugins-xxxx
  ```
安装好插件以后，你可以阅读插件文档，了解通过何种命令来启动插件。

-  使用插件
  ```bash
    puppy -x xxxx
  ```
<font>