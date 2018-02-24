import AxiosUtil from '../util/axios'

class wxApi {
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
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice'
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
          })
        })
        .catch((error) => {
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
        if (success) { success() }
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

  startRecord () {
    // eslint-disable-next-line
    wx.startRecord()
  }
  stopRecord () {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      wx.stopRecord({
        success: (res) => {
          resolve(res.localId)
        },
        fail: (res) => {
          reject(res)
        }
      })
      // 录音时间超过一分钟没有停止，会自动执行compelte
      // eslint-disable-next-line
      wx.onVoiceRecordEnd({
        complete: (res) => {
          resolve(res.localId)
        }
      })
    })
  }
  playVoice (localId) {
    // eslint-disable-next-line
    wx.playVoice({
      localId: localId
    })
  }
  pauseVoice (localId) {
    // eslint-disable-next-line
    wx.pauseVoice({
      localId: localId
    })
  }
  uploadVoice (localId) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line
      wx.uploadVoice({
        localId: localId,
        isShowProgressTips: 1,
        success: (res) => {
          resolve(res.serverId)
        },
        fail: (res) => {
          reject(res)
        }
      })
    })
  }
}

export default wxApi
