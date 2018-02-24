import React from 'react'
import AxiosUtil from '../util/axios'

/*
 直接引用 传入props完成设置 就可以在该页面使用分享 使用绝对路径设置图片、分享地址
 param:
   title: 分享标题
   desc: 描述
   link: 跳转链接
   imgUrl: 分享图片

 by yiran
 */

export default class WxShare extends React.PureComponent {
  constructor (props) {
    super(props)
    this.setShare = this.setShare.bind(this)
    this.state = {
      wxReady: false
    }
  }
  componentDidMount = async () => {
    const url = `/api/wxconfig/getWXConfig?url=${encodeURIComponent(location.href.split('#')[0])}`
    let wxConfig = await AxiosUtil.get(url)
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
    wx.ready(this.setState({
      wxReady: true
    }))
    // eslint-disable-next-line
    wx.error(function (res) {
      console.log('微信认证失败')
      console.log(res)
    })
  }

  setShare () {
    if (!this.state.wxReady) {
      return
    }
    // console.log('分享地址为' + this.props.link)
    // alert('分享地址为' + this.props.link)
    let { title, desc, link, imgUrl, success, cancel } = this.props
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
  render () {
    return <div>
      <script src='/static/js/jweixin.js' />
      {this.setShare()}
    </div>
  }
}
