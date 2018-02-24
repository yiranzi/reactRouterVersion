import React from 'react'
import {ModalBoxPopFunc} from '../../../xz-components/modalbox'

export default function (path) {
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let wxType
  if (window) {
    if (window.__wxjs_environment === 'miniprogram') {
      wxType = 'little'
    } else {
      wxType = 'wx'
      // 如果当前微信环境 并且有跳转链接
      if (path) {
        window.location.href = path
        return
      }
    }
  }
  let content = wxType === 'little' ? '保存相册后，扫码加我好友' : '长按扫码，加我微信'
  let dom = <div className='pop-bg'>
    <div className='pop-top'>
      <img src='/static/img/buygether/headImg_help.png' />
      <div>
        <p className='pop-title'>小灶能力顾问Harry</p>
        <p className='pop-title'>我可以为你解答课程、分期等疑问哦</p>
      </div>
    </div>
    <div className='pop-bottom'>
      <h2 style={{color: 'black', fontSize: '18px'}}>搜索微信ID：xiaozao025</h2>
      <h2 style={{color: 'black', fontSize: '18px'}}>{content}</h2>
      <img className='img-style' src='/static/img/buygether/qrcode.png' />
      <div className='pay-ad-div'>
        <p style={{color: '#8c8c8c'}}>小灶支持</p>
        <img src={'/static/img/buygether/payIcon_1.png'} />
        <img src={'/static/img/buygether/payIcon_2.png'} />
        <img src={'/static/img/buygether/payIcon_3.png'} />
      </div>
    </div>
    <style jsx>{`
        .pop-bg {
          background-color: #ffffff;
          border-radius: 15px;
          font-size: 14px;
        }
        .pop-top {
          padding: 10px;
          background-color: #3e84e0;
          border-radius: 15px 15px 0px 0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .pop-top img {
          width: 45px;
          height: 45px;
          margin: 5px;
          border-radius: 50%;
        }
        .pop-bottom {
          padding: 10px 10px;
        }
        .pop-title {
          font-weight: bold;
        }
        .strong {
          font-size:28px;
          font-weight: bold;
          color: red;
        }
        .img-style {
          width: 100px;
        }
        .pay-ad-div {
          border-top: 1px solid #8c8c8c;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 10px;
          margin: auto -5px;
        }
        .pay-ad-div img {
          height: 24px;
        }
    `}</style>
  </div>
  let prop = {
    innerDiv: dom,
    style: defaultStyle,
    cancelCallBack: () => {}
  }
  ModalBoxPopFunc({...prop})
}
