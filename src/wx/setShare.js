/* eslint-disable */
const setShare = (obj={}) => {
  let {title, desc, link, imgUrl, success, cancel} = obj
  if (!link) {
    link = window.location.href
  }
  wx.onMenuShareTimeline({
    title: title,
    link: link,
    imgUrl: imgUrl, // 分享图标
    success: function () {
      if (success) { alert('success') }
    },
    cancel: function () {
      if (cancel) { alert('cancel') }
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
export default setShare