// 订单页
let payData = null

let wxPay = {}

wxPay.payInit = (payInfo) => {
  payData = payInfo
  // 2 调用微信
  if (window.__wxjs_environment === 'miniprogram') {
    let { nonceStr, paySign, timeStamp, prepayId } = payInfo
    wx.miniProgram.navigateTo({ url: `/pages/target/target?timeStamp=${timeStamp}&nonceStr=${nonceStr}&prepayId=${prepayId}&signType=MD5&paySign=${paySign}` })
    return new Promise((resolve, reject) => {
      resolve()
    })
  } else {
    return wxPay.pay()
  }
}

wxPay.pay = () => {
  if (typeof WeixinJSBridge === 'undefined') {
    // 这段代码似乎没跑过。如果跑会影响到回调。
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', wxPay.pay, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', wxPay.pay)
      document.attachEvent('onWeixinJSBridgeReady', wxPay.pay)
    }
    return new Promise((resolve, reject) => {
      resolve()
    })
  } else {
    return wxPay.onBridgeReady()
  }
}

wxPay.onBridgeReady = () => {
  return new Promise((resolve, reject) => {
    let {appId, nonceStr, paySign, timeStamp, prepayId} = payData
    // eslint-disable-next-line
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        'appId': appId,
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': `prepay_id=${prepayId}`,
        'signType': 'MD5',
        'paySign': paySign
      },
      function (res) {
        let json = {state: 'unknown', message: '未知错误'}
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          json.state = 'ok'
          json.message = '支付成功'
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          json.state = 'cancel'
          json.message = '支付取消'
        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
          json.state = 'fail'
          json.message = '支付失败'
        }
        resolve(json)
      }
    )
  })
}

module.exports = wxPay
