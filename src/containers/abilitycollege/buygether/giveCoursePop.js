import React from 'react'
import {ModalBoxPopFunc} from '../../../xz-components/modalbox'
import Link from 'next/link'

export default function (props) {
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let dom = <div className='pop-bg'>
    <img className='img-style' src='/static/img/buygether/shareArrow.png' />
    <div className='pop-top'>
      <img src={props} />
    </div>
    <div className='pop-bottom'>
      <h2 style={{color: 'black', fontSize: '20px'}}>赠课得课</h2>
      <p>点击右上角，将此课分享给好友</p>
      <p style={{color: 'gray'}}>若好友接受你的赠予</p>
      <p style={{color: 'gray'}}>你们共同获得此课程</p>
    </div>
    <style jsx>{`
      .pop-bg {
        width: 80%;
        border-radius: 15px;
      }
      .pop-bg .img-style {
        position: absolute;
        top: 10px;
        right: 60px;
        width: 100px;
        height: 100px;
      }
      .pop-top {
        border-radius: 15px 15px 0px 0px;
        padding: 20px;
        background-color: #3e84e0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pop-top img {
        width: 80%;
      }
      .pop-bottom {
        border-radius: 0px 0px 15px 15px ;
        padding: 10px 10px;
        background-color: white;
      }
      .pop-bottom p {
        font-size: 16px;
        color: black;
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
