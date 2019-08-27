## 安装插件
```
yarn add redux
yarn add react-redux
```

## 快速理解redux
[阮一锋的redux博客](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

## 官方文档
[redux的官方文档](https://www.redux.org.cn/docs/introduction/Motivation.html)

## 简单使用
1.为了文件结构更清晰，本项目中所有reducer都放在reducers文件夹中
引入插件方法
```
import { combineReducers } from 'redux'
```

定义store，注意这里的函数名对应的就是state中的属性名
```
const user = function(state = { name: 'redux' }, action) {
  switch (action.type) {
    case 'CHANG_NAME':
      return {
        ...state,
        name: action.name
      }
    default:
      return {
        ...state
      }
  }
}

const project = function(state = { name: 'react' }, action) {
  switch (action.type) {
    case 'CHANGE_CLI':
      return {
        ...state,
        name: action.name
      }
    default:
      return {
        ...state
      }
  }
}
```

将所有reducer合并，并把主reducer暴露
```
const rootReducer = combineReducers({ user, project })

export default rootReducer
```

2.同样，为了代码职责单一，便于维护，我将构建store的方法写在了store文件夹中的store-config.js中
将构造store的方法暴露出去供他人调用
```
import { createStore } from 'redux'
import rootReducer from './../reducers/index.js'

let configStore = () => {
  return createStore(rootReducer)
}

export default configStore
```

在最外层组件调用此方法，并使用react-redux的Provider标签为组件注入store，注意Provider必须是最外层组件
```
import { Provider } from 'react-redux'
import configStore from './store/store-config.js'

const store = configStore()
console.log(store.getState())

function App() {
  return (
    <Provider store={store}>
      ...
    </Provider>
  )
}
```

在需要store的组件内部，我们需要获得store，这样我们就可以在组件中通过props使用store了
```
import { connect } from 'react-redux'

...
render() {
  const { user } = this.props
  return (
    <div>
      <Button onClick={this.fetchData.bind(this)}>{user.name}</Button>
    </div>
  )
}
...

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Test)
```

3.如果需要改变store，则需要通过dispatch方法
```
this.props.dispatch({
  type: 'CHANG_NAME',
  name: 'Vuex'
})
```

## 组织Reducer
[文档](https://www.redux.org.cn/docs/recipes/StructuringReducers.html)

## 在实际项目中使用redux梳理
1.首先需要一个initial-state.js管理所有state的初始状态
```
// initial-state
export default {
  userInfo: {
    isFetching: false,
    error: null
  }
}
```

2.创建一个文件管理所有action
```
// action-type.js
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';
```

3.创建一个reducer处理单个store
```
//user-info.js

import {
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAILURE
} from './../constants/action-type.js';
import initialState from './initial-state.js';

// 传入store的初始值
// 注意function的名字就是store的名字
export default function userInfo(state = initialState.userInfo, action) {
  const { code, data } = action;
  switch (action.type) {
    case USER_INFO_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        ...data
      });
    case USER_INFO_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: 200 == code ? null : code
      });
    default:
      return state;
  }
}
```

4.将所有reducer合成一个root reducer
```
// index.js
import { combineReducers } from 'redux';
// 顺便将路由的reducer也传入
import { routerReducer } from 'react-router-redux';
import userInfo from './user-info.js';

const rootReducer = combineReducers({
  routing,
  userInfo
});

export default rootReducer;
```

5.创建store-config文件暴露store配置
```
import { createStore } from 'redux';

let configStore = initialState => {
  return createStore(
    rootReducer,
    initialState
  );
};

export default configStore;
```

6.在最外层组件注入store
```
import { Provider } from 'react-redux';
import configStore from './store/store-config.js';

const store = configStore();

...
<Provider store={store}></Provider>
...
```