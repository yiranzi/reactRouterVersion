import React from 'react'
import WxShare from '../../xz-components/newWxShare'
import ModalboxControlled from '../../xz-components/modalboxControlled'
import {ModalBoxPopFunc} from '../../xz-components/modalbox'
import Router from 'next/router'
import {Alert} from 'xz-components/alert'

import AxiosUtil from '../../util/axios'
// import ToolsUtil from '../../util/tools'

export default class extends React.Component {
  shareConfig = new WxShare() // 分享初始化
  constructor (props) {
    super(props)
    this.state = {
      close: false
    }
  }

  componentWillMount = async () => {
    let _this = this
    if (sessionStorage.getItem(`finishShare${this.props.lessonId}pop`)) {
      this.setState({
        close: true
      })
    }
    this.shareConfig.init().then(() => {
      _this.setShare()
    })
  }

  onSuccess (msg) {
    if (msg === 'onMenuShareTimeline') {
      let prop = {
        innerDiv: <img style={{width: '80%'}} src={'/static/img/businessReading/share/english_after_share.png'} />,
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        cancelCallBack: () => {}
      }
      ModalBoxPopFunc({...prop})
      AxiosUtil.get(`/api/business-english/shareByLessonId/${this.props.lessonId}`)
    }
  }

  setShare = async () => {
    let {shareId: userId, shareKey, sharePic, shareInfo} = this.props.shareInfo
    let addParam = `/shareview?lessonId=${this.props.lessonId}&userId=${userId}&shareKey=${shareKey}`
    let shareUrl
    let pos = window.location.href.indexOf('/finish')
    if (pos !== -1) {
      shareUrl = window.location.href.slice(0, pos)
    }
    shareUrl += addParam
    // alert(shareUrl)
    let shareProp = {
      title: shareInfo,
      desc: '提升商业英文和商业知识一举两得',
      link: shareUrl,
      imgUrl: sharePic,
      success: (msg) => { this.onSuccess(msg) }
    }
    // 小程序待议
    // if (this.state.environment === 'little') {
    //   window.history.replaceState(null, '', location.href)
    // }
    this.shareConfig.setShareConfig(shareProp)
  }

  componentWillUnmount () {
    this.close()
  }

  close () {
    sessionStorage.setItem(`finishShare${this.props.lessonId}pop`, true)
    this.setState({
      close: true
    })
  }

  render () {
    if (this.state.close) {
      return null
    }
    let outDivStyle = {
      backgroundColor: 'rgba(0, 10, 49, 0.3)',
      justifyContent: 'flex-start'
    }
    let innerDivStyle = {
      width: '80%'
    }
    let cancelDivStyle = {
      position: 'absolute',
      zIndex: '100',
      top: '0px',
      left: '0px',
      width: '100%',
      height: '100%'
    }
    // display: 'none'为了提前加载后续图片 无用可以删除
    let dom = <div>
      <img style={{display: 'none'}} src={'/static/img/businessReading/share/english_after_share.png'} />
      <div className='wx-text-right'><img className='arrow' src='/static/img/businessReading/share_arrow.png' /></div>
      <img className='content-img' src='/static/img/businessReading/share.png' />
      <style jsx>{`
        .arrow {
          max-width: 40%;
        }
        .content-img {
          width: 100%;
        }
    `}</style>
    </div>
    return (
      <ModalboxControlled
        cancelClick={() => { this.close() }}
        cancelDivStyle={cancelDivStyle}
        outDivStyle={outDivStyle}
        innerDivStyle={innerDivStyle}>
        {dom}
      </ModalboxControlled>
    )
  }
}