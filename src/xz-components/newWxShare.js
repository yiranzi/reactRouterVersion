import AxiosUtil from '../util/axios'

class WxShare {
  init () {
    return new Promise((resolve, reject) => {
      AxiosUtil.get(`/api/wxconfig/getWXConfig?url=${encodeURIComponent(location.href.split('#')[0])}`)
        .then((wxConfig) => {
          wxConfig.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideAllNonBaseMenuItem'
          ]
          // eslint-disable-next-line
          wx.config(wxConfig)
          // eslint-disable-next-line
          wx.ready(function(){
            resolve()
          })
          // eslint-disable-next-line
          wx.error(function (res) {
            console.log('微信认证失败')
            console.log(res)
            alert(res)
          })
        })
        .catch((error) => {
          alert(error)
          reject(error)
        })
    })
  }
  setShareConfig (props) {
    let { title, desc, link, imgUrl, success, cancel } = props
    // eslint-disable-next-line
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        if (success) { success('onMenuShareTimeline') }
      },
      cancel: function () {
        if (cancel) { cancel() }
      }
    })
    // eslint-disable-next-line
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        if (success) { success() }
      },
      cancel: function () {
        if (cancel) { cancel() }
      }
    })
    // eslint-disable-next-line
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        if (success) { success() }
      },
      cancel: function () {
        if (cancel) { cancel() }
      }
    })
    // eslint-disable-next-line
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        if (success) { success() }
      },
      cancel: function () {
        if (cancel) { cancel() }
      }
    })
    // eslint-disable-next-line
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl, // 分享图标
      success: function () {
        if (success) { success() }
      },
      cancel: function () {
        if (cancel) { cancel() }
      }
    })
  }
}

export default WxShare
