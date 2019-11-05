## 二次封装axios
```javascript
import axios from 'axios';
import qs from 'qs';
import { browserHistory } from 'react-router';
import { Modal, message } from 'antd';
import {
  API_CONFIG
} from './../config/api.js';
// 允许跨域请求带上cookie
axios.defaults.withCredentials = true;

// request config
let defaultHeaders, defaultParams, expired;
configRequest();

// 设置默认header和params
export function configRequest() {
  defaultHeaders = {};
  defaultParams = {};
}


export function cfetch(urlKey, options, jsonFormat) {
  let { method, headers, params, sourceSet } = options || {};

  method = method || 'GET';
  headers = Object.assign({}, headers, defaultHeaders);
  const opts = { method, headers };
  const data = Object.assign({}, params, defaultParams);

  // add query params to url when method is GET
  if ('POST' == method) {
    if (jsonFormat) {
      // 以json格式上传
      opts.headers['Content-Type'] = 'application/json; charset=utf-8';
      opts.data = JSON.stringify(data);
    } else {
      // 普痛form表单上传
      opts.headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=utf-8';
      opts.data = qs.stringify(data);
    }
  } else if ('GET' == method) {
    opts.params = data;
  }

  return axios(API_CONFIG[urlKey], opts)
    .then(parseJson)
    .then(checkAccessError)
    .catch(error => {
      let oErr = {};
      console.log('Request Failed', error); // eslint-disable-line  no-console
      if (undefined == error.status && 'Network Error' == error.message) {
        // network error
        oErr = {
          jsonResult: {
            code: 502,
            message: 'Network error'
          }
        };
      } else if (!error.response) {
        // 针对取消请求的情况
        oErr = {
          jsonResult: {
            code: -1,
            message: error
          }
        };
      } else {
        // 针对返回错误
        oErr = {
          jsonResult: {
            code: 500,
            message: error.response.statusText || error.response.data
          }
        };
      }

      return oErr;
    });
}

// 处理返回数据
function parseJson(res) {
  return {
    jsonResult: res.data,
    status: res.status,
    statusText: res.statusText,
    url: res.config.url
  };
}

// 处理返回错误
function checkAccessError(res) {
  let {
    status,
    url,
    jsonResult: { code, field }
  } = res;
  if (404 == status) {
    return Promise.reject(`${res.status} ${res.statusText}`);
  } else if (200 == status) {
    if (
      // 当接口返回成功但后端写但code不是200且这个接口是auth接口
      (200 != code && url.match(API_CONFIG.auth))
    ) {
      if (!expired) {
        expired = true;
        Modal.error({
          title: '请重新登录',
          content: '请重新登录',
          onOk: () => {
            browserHistory.push('/user/login');
          }
        });
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  } else {
    // network error
    message.error('网络错误');
    return Promise.reject(`${res.status} ${res.statusText}`);
  }

  return res;
}

```