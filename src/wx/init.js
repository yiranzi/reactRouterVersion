import AxiosUtil from "../util/axios";

const init = async () => {
  return new Promise(async (resolve, reject) => {
    const url = `/api/wxconfig/getWXConfig?url=${encodeURIComponent(window.location.href.split('#')[0])}`
    let wxConfig = await AxiosUtil.get(url)
    console.log(wxConfig)
    // wxConfig.debug = true
    wxConfig.jsApiList = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
    // eslint-disable-next-line
    wx.config(wxConfig)
    // eslint-disable-next-line
    wx.ready(function () {
      console.log('微信认证成功')
      resolve()
    })
    // eslint-disable-next-line
    wx.error(function (res) {
      console.log('微信认证失败')
      console.log(res)
      reject()
    })
  })
}


export default init