# 博客园-Mac 客户端 
博客园客户端，使用electron。

# 未提交内容
- app/webapi/oauthWebApi.js   其中包含账号等敏感信息
- app/build   内容由各个文件生成
- node_modules    内容是第三方组件

# 编译方法
## 1 安装node_modules下的第三方组件
切换到项目根目录下
执行  npm install
## 2 编译build下js文件
切换到app目录下
执行  babel --presets react slide blogs webapi kbArticles news --watch --out-dir build
## 3 打包安装文件
切换到项目根目录下
执行  npm run-script package


# 引入第三方
- https://github.com/lmaccherone/node-localstorage