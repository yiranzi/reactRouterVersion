import {ModalBoxPopFunc} from '../../../xz-components/modalbox'
import React from 'react'

export default function (ele) {
  let leftHour = 23
  let leftMinute = 59
  if (ele) {
    ({leftHour, leftMinute} = ele)
  }
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let randomSecond = parseInt(60 * Math.random())
  let dom = <div className='main-content'>
    <img className='img-style' src='/static/img/buygether/shareArrow.png' />
    <h2 className='course-title'>《线上学徒项目-商业分析方向》</h2>
    <p className='title'>只需6周！带你获得能进滴滴、阿里、百度、四大的能力！</p>
    <p className='time-div'>剩余<span className='time-content'>{leftHour}时{leftMinute}分{randomSecond}秒</span>结束</p>
    <p className='title'>还差<strong className='strong'> 1 </strong>人，邀请好友拼团</p>
    <p className='title'>每人可减1000元哦！</p>
    <style jsx>{`
      .main-content {
        position: relative;
        top: -90px;
        background-color: #3e84e0;
        border-radius: 30px;
        padding: 10px;
        width: 80%;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .course-title {
        font-size: 20px;
      }
      .strong {
        font-size:28px;
        font-weight: bold;
        color: red;
      }
      .img-style {
        position: absolute;
        top: -100px;
        right: 50px;
        width: 100px;
        height: 100px;
      }
      .time-div {
        margin: 10px auto;
      }
      .time-content{
        margin: auto 5px;
        border-radius: 30px;
        height: 30px;
        line-height: 30px;
        background-color: white;
        color: red;
        padding: 5px 15px;
      }
    `}</style>
  </div>
  let prop = {
    innerDiv: dom,
    style: defaultStyle
  }
  ModalBoxPopFunc({...prop})
}
