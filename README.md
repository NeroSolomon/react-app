# This project is for studying react-create-app.

## 前期准备
[Website](https://facebook.github.io/create-react-app/docs/getting-started)

## 目录规范
|- public             静态资源
|- src                开发目录
|----containers       容器累组件
|----App.js           外层组件
|----index.js         入口文件
|- package.json       项目元数据

## 构建命令
```
npm run start         开发构建
npm run build         生产构建
npm run test          测试
npm run eject         暴露项目配置，用于自定义
```

## 项目规范
[在项目中使用eslint检查](https://facebook.github.io/create-react-app/docs/setting-up-your-editor#displaying-lint-output-in-the-editor)<br>
[使用prettierrc规范](https://prettier.io/docs/en/configuration.html)

## 路由设置
[路由笔记](./notes/react的路由设置.md)

## redux
[redux笔记](./notes/如何在项目中使用redux并采用其的逻辑规范.md)

## 国际化
[在项目中配置多语言](./notes/配置多语言.md)

## 暴露配置
运行以下命令将脚手架隐藏的设置(webpack，Babel...)暴露出来
```
npm run eject
```

由于做这个操作的公司项目，所以不方便公开细节，所以将笔记记录到这里吧<br>
跑完eject命令后，执行npm run start报：Cannot find module '@babel/plugin-transform-react-jsx-source'<br>
解决方法：
```
rm -rf node_modules
npm install // 不要使用yarn
npm run start
```
