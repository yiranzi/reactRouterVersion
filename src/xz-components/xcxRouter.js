import Router from 'next/router'
import {Alert} from './alert'

// 根据路径进行跳转
export function goRouterFunc (pathUrl) {
  if (window.__wxjs_environment === 'miniprogram') {
    // 判断链接是否对小程序有效
    let result = pathUrl.search(/xiaozao.org/)
    if (result && result !== -1) {
      Router.push(pathUrl)
    } else {
      Alert({ content: '课程正在报名中！获取课程详情、报名课程请联系小助手Harry ( xiaozao906 )' })
    }
  } else {
    window.location.href = pathUrl
  }
}