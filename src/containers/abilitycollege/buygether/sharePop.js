import React from 'react'
import {ModalBoxPopFunc} from '../../../xz-components/modalbox'
/**
 * 分享弹窗
 * 传入时间，加上随机的秒
 * 如果是没有时间，就默认最大。（只有刚开团的自动弹窗没有设置时间）
 */
export default function (title, ele) {
  let leftHour = 23
  let leftMinute = 59
  if (ele) {
    ({leftHour, leftMinute} = ele)
  }
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let randomSecond = parseInt(60 * Math.random())
  let dom = <div className='pop-bg'>
    <img className='img-style' src='/static/img/buygether/shareArrow.png' />
    <div className='pop-top'>
      <div>
        <h1 className='pop-title'>开团成功！</h1>
        <p>——立即邀请好友拼团——</p>
        <p className='title'>剩余<strong>{leftHour}:{leftMinute}:{randomSecond}</strong>结束</p>
      </div>
    </div>
    <div className='pop-bottom'>
      {title && <p className='title'>《{title}》</p>}
      <p className='title'>还差<strong className='strong'> 1 </strong>人，赶紧邀请好友来拼团吧~</p>
    </div>
    <style jsx>{`
        .pop-bg {
          background-color: #3e84e0;
          border-radius: 15px;
          font-size: 14px;
          color: black;
        }
        .pop-bg .img-style {
          position: absolute;
          top: 10px;
          right: 60px;
          width: 100px;
          height: 100px;
        }
        .pop-top {
          padding: 10px;
          background-color: #ffffff;
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
        .pop-top .title strong {
          color: red;
          font-size: 22px;
          margin: 10px;
        }
        .pop-bottom {
          padding: 10px 10px;
          color: white;
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
        .pop-bottom .title {
          font-size: 20px;
        }
    `}</style>
  </div>
  let prop = {
    innerDiv: dom,
    style: defaultStyle
  }
  ModalBoxPopFunc({...prop})
}


