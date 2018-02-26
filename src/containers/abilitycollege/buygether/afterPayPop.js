import React from 'react'
import {ModalBoxPopFunc} from '../../../xz-components/modalbox'
import {Link} from 'react-router-dom'

export default function (props) {
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let wxType
  if (window) {
    if (window.__wxjs_environment === 'miniprogram') {
      wxType = 'little'
    } else {
      wxType = 'wx'
    }
  }
  // let content = wxType === 'little' ? '保存相册后，扫码加我好友' : '长按扫码，加我微信'
  let content = wxType === 'little' ? '保存相册后，扫码添加' : '长按扫码'
  let dom = <div className='pop-bg'>
    <div className='pop-top'>
      <div>
        <p className='pop-title'>成功报名课程</p>
        <p className='pop-title'>关注小灶能力派服务号，接收课程提醒。</p>
      </div>
    </div>
    <div className='pop-bottom'>
      {/*<h2 style={{color: 'black', fontSize: '18px'}}>微信搜索: zhujiao902</h2>*/}
      <h2 style={{color: 'black', fontSize: '18px'}}>{content}</h2>
      <img className='img-style' src='/static/img/qrCode.jpg' />
      <div className='pay-ad-div'>
        {/*<Link to={`/learn/course/info?courseId=${props}`}>*/}
          <a>前往我的教室学习</a>
        {/*</Link>*/}
      </div>
    </div>
    <style jsx>{`
        .pay-ad-div a {
          font-size: 16px;
        }
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
          justify-content: center;
          align-items: center;
          padding-top: 10px;
          margin: auto -5px;
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
