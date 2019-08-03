## 采用插件
[react-router-dom](https://reacttraining.com/react-router/web/example/basic)

## 用法
1. 在最外层组件（本项目为App.js中引入）react-router-dom
```
import { BrowserRouter as Router } from 'react-router-dom'
```

2. 在Router标签中嵌套Route，指向确定的路由，本项目为了结构分离，代码维护更清晰，将route独立成routes.js维护
首先引入插件
```
import React from 'react'
import { Route } from 'react-router-dom'
```

然后引入不同路由对应的组件
```
import Home from './../containers/Home.js'
import Test from './../containers/Test.js'
```

将组件对应路由， exact属性为精确匹配
```
<Route exact path="/" component={Home} />
<Route path="/test" component={Test} />
```

将设置暴露
```
export default (<div><Route .../></div>)
```

在App.js中引入并潜逃在Router标签中
```
import routes from './config/routes.js'
...
<Router>{routes}</Router>
...
```