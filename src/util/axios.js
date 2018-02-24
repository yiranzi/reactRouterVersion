// import Tips from '../xz-components/tips'
// import ToolsUtil from '../util/tools'
import axios from 'axios'
import wrapper from './axiosCache/wrapper'

let AxiosUtil = {}
let AxiosWithCache = {}

AxiosUtil.cacheInit = (reg) => {
  if (!AxiosWithCache.init) {
    // console.log('cache init!')
    AxiosWithCache = wrapper(axios, {
      maxCacheSize: 15
    })
    AxiosWithCache.init = true
  }
  // console.log('保存了缓存：' + reg)
  AxiosWithCache.__addFilter(new RegExp(reg))
}

AxiosUtil.deleteCache = function (url) {
  if (AxiosWithCache) {
    // console.log('删除了缓存：' + url)
    AxiosWithCache.__deleteCache(url)
  }
}

function request (param) {
  let http = AxiosWithCache.init ? AxiosWithCache : axios
  return new Promise((resolve, reject) => {
    http(param).then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.response)
      } else {
        const {data} = res
        // 接口返回错误
        const json = {
          status: data.status,
          message: data.message,
          url: param.url
        }
        // 默认不显示错误
        if (param.isShowError) {
          // Tips.info({
          //   children: data.message
          // })
        }
        reject(json)
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        // if (!ToolsUtil.isDev()) {
        //   location.reload(true)
        // } else {
        //   Tips.info({
        //     children: error.message
        //   })
        // }
      }
    })
  })
}

AxiosUtil.get = function (url, cache, isShowError = false) {
  if (cache) {
    let afterFixUrl = url.replace(/\?/, `\\?`)
    AxiosUtil.cacheInit(afterFixUrl)
  }
  const param = {
    method: 'get',
    url: url,
    isShowError: isShowError
  }
  return request(param)
}

AxiosUtil.post = function (url, data, isShowError = false) {
  const param = {
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    url: url,
    data: data,
    isShowError: isShowError
  }
  return request(param)
}

export default AxiosUtil
