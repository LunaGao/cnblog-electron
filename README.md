# 博客园-Mac 客户端 
博客园客户端，使用electron。

# 说明
根据博客园要求，将不会公开网络连接的账号信息，所以源码中对于账号信息将处于屏蔽状态，由此造成了缺少文件进而项目无法运行，希望大家谅解。

# 未提交内容
- 其中包含账号等敏感信息（由于此造成项目无法正常运行）
- app/build   （内容由各个文件生成）
- node_modules    （内容是第三方组件）

# 编译方法
## 1 安装node_modules下的第三方组件
切换到项目根目录下执行
> $ npm install

## 2 编译build下js文件
切换到app目录下执行
> $ babel --presets react slide blogs webapi kbArticles news user statuses search common bookmarks --out-dir build

## 3 打包安装文件
切换到项目根目录下
> - Mac版本执行 $ npm run-script package-mac
> - linux64版本执行 $ npm run-script package-linux64
> - linux32版本执行 $ npm run-script package-linux32
> - win64版本执行 $ npm run-script package-win64
> - win32版本执行 $ npm run-script package-win32

# 开发过程中的项目实时编译
切换到app目录下执行 
> $ babel --presets react slide blogs webapi kbArticles news user statuses search common bookmarks --watch --out-dir build

# 引入第三方
- _（数据存储） https://github.com/lmaccherone/node-localstorage_
- _（ssh中的rsa加密） https://github.com/travist/jsencrypt_
