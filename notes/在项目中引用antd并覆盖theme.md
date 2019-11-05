## 如何在create-react-app中使用antd

### 在yarn eject前的方法，注意这里有个坑，下面会说到
[方法](https://ant.design/docs/react/use-with-create-react-app-cn)

### 在yarn eject之后，因为目录和config文件都变了，所以我们需要自己来修改配置

### 首先不需要按照官网教程下载react-app-rewired customize-cra因为我们已经不用这个来跑命令了

### 下载按需加载插件babel-plugin-import

### 在根目录中新建.babelc，这样在打包的时侯就会去找antd
```json
{
  "presets": [
    "react-app"
  ],
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "lib",
      "style": true // 写css的话，读的是antd的css文件，true为less
    }]
  ]
}
```

### 下载less less-loader 

### 在webpack.config.js中添加less的配置
```javascript
// 引入自定义的theme.js
const antdTheme = require('./antd-theme');

// 正则
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// 拷贝一份sass的loader配置
// Opt-in support for LESS.
// By default we support LESS Modules with the
// extensions .module.less or .module.less
{
  test: lessRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
    },
    'less-loader'
  ),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
// Adds support for CSS Modules, but using LESS
// using the extension .module.less or .module.less
{
  test: lessModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 2,
      sourceMap: isEnvProduction && shouldUseSourceMap,
      modules: true,
      getLocalIdent: getCSSModuleLocalIdent,
    },
    'less-loader'
  ),
}

// 修改getStyleLoaders的设置
if (preProcessor) {
  if (preProcessor === 'less-loader') {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: isEnvProduction && shouldUseSourceMap,
        // 引入antdTheme
        modifyVars: antdTheme,
        javascriptEnabled: true
      }
    })
  } else {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
}
```

### 在antd-theme.js中写入自己的样式
```javascript
module.exports = {
  'input-height-base': '40px',
  'card-radius': '@border-radius-base',
  'btn-height-base': '40px',
  'form-item-margin-bottom': '19px'
}
```

### 注意这里有个问题，因为在官网中提示需要我们在css文件中手动引入antd.css文件和antd组件，但这个css文件是按默认主题编译出来的，引入的话就会覆盖我们主题的样式，所以我们不需要引入antd.css，只需要引入组件就好
