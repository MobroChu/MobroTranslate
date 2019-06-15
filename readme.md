### MoborTranslate

#### 项目用途
谷歌翻译插件有许多，为什么要造这么个轮子呢？
+ 【降低性能】穷人，电脑性能跟不上，平时开发简单用一个翻译功能即可。
+ 【巩固学习】自从使用了各种脚手架工具，对 webpack 的配置问题越来越生疏，借此机会再学习一下 webpack 多入口配置问题；熟悉谷歌插件插件开发；

#### 项目运行
```bash
# 查看本地环境
webpack --version && node --version

# 全局安装 webpack webpack-cli
npm i -g webpack webpack-cli

# 开发环境
npm i
npm run dev

# 生产环境
npm i
npm run build
```

#### 运行环境
```js
node >= 12.3.1
webpack >= 4.34.0
```
