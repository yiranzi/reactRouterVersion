import React from 'react'
/**
 * 优惠券信息
 * 点击事件为使用优惠券
 */
export default class extends React.Component {
  render () {
    let {couponInfo} = this.props
    console.log(couponInfo)
    if (couponInfo) {
      let couponType
      switch (couponInfo.name) {
        case '通用券':
          couponType = 0
          break
        case '闺蜜券':
          couponType = 1
          break
        case '基友券':
          couponType = 2
          break
        case '校友券':
          couponType = 3
          break
      }
      let {nickname} = couponInfo
      return (<div className='coupon'>
        <h1>我获得的优惠券</h1>
        <img onClick={() => { this.props.buyMyGroup() }} src={`/static/img/buygether/coupon_card_${couponType}.png`} />
        <p>* {nickname} 赠送，报名后你的好友 {nickname} 将免费获得一张能力卡</p>
        <style jsx>{`
          .coupon {
            padding: 10px 0px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
            text-align: left
          }
          img {
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return null
    }
  }
}


