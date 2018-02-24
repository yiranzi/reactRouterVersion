import AxiosUtil from '../util/axios'

class WxShare {
  init () {
    return new Promise((resolve, reject) => {
      AxiosUtil.get(`/api/wxconfig/getWXConfig?url=${encodeURIComponent(location.href.split('#')[0])}`)
        .then((wxConfig) => {
          wxConfig.jsApiList = [
            'showAllNonBaseMenuItem',
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
          })
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  closeShare () {
    // eslint-disable-next-line
    wx.hideAllNonBaseMenuItem()
  }

  openShare () {
    // eslint-disable-next-line
    wx.showAllNonBaseMenuItem()
  }
}

export default WxShare
