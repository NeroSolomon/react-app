import axios from 'axios'

let defaultHeaders = {}

export function cfetch(urlKey, options, jsonFormat) {
  let { methods, headers, params } = options || {}
  methods = methods || 'GET'
  headers = Object.assign({}, headers, defaultHeaders)
  const opts = { methods, headers }
  const data = Object.assign({}, params)

  if ('POST' === methods) {
    if (jsonFormat) {
      opts.headers['Content-Type'] = 'application/json; charset=utf-8'
      opts.data = JSON.stringify(data)
    } else {
      opts.headers['Content-Type'] =
        'application/x-www-form-urlencoded; charset=utf-8'
      opts.data = data
    }
  } else if ('GET' === methods) {
    opts.params = data
  }

  return axios(urlKey, opts)
    .then(parseJson)
    .then(checkAccessError)
    .catch(error => {
      let onErr = {}
      if (undefined === error.status && 'Network Error' === error.msg) {
        // network error
        onErr = {
          jsonResult: {
            code: 'common.network.error'
          }
        }
      } else if (!error.response) {
        // 针对取消请求的情况
        onErr = {
          jsonResult: {
            code: -1,
            message: error
          }
        }
      } else {
        // 针对返回错误
        onErr = {
          jsonResult: {
            code: -2,
            message: error.response.statusText || error.response.data
          }
        }
      }

      return onErr
    })
}

function parseJson(res) {
  return {
    jsonResult: res.data,
    status: res.status,
    statusText: res.statusText,
    url: res.config.url
  }
}

function checkAccessError(res) {
  let { status } = res
  if (404 === status) {
    return Promise.reject(`${res.status} ${res.statusText}`)
  } else if (200 === status) {
    return res
  } else {
    return Promise.reject(`${res.status} ${res.statusText}`)
  }
}

// TO DO
// eslint autofix
// fetch mock api
