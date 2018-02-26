import React from 'react'
import PropTypes from 'prop-types'
import {ChooseBar, ChooseItem} from '../../../xz-components/choosebar'

export default class extends React.Component {
  // newGroupDiscount = 10 // 开团立减
  // coupon = 0.9 // 折扣
  static propTypes = {
    dataInfo: PropTypes.array,
    buyButtonCallBack: PropTypes.func,
    cancelCallBack: PropTypes.func,
    joinInfo: PropTypes.object
  }

  static defaultProps = {
    dataInfo: [], // 购买回调
    buyButtonCallBack: function () {}, // 购买回调
    cancelCallBack: function () {}, // 取消购买回调
    joinInfo: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: 0,
      render: true
    }
    this.onChange = this.onChange.bind(this)
    this.buyButtonClick = this.buyButtonClick.bind(this)
  }

  renderTitle () {
    if (this.props.joinInfo && this.props.joinInfo.id) {
      let {headimgurl, nickname} = this.props.joinInfo
      return (<div className='title'>
        <div className='content title-font'>
          <span>正在参加</span>
          <div><img className='head-img' src={headimgurl} /></div>
          <span>{nickname}的团</span>
        </div>
        <p className='title-font'>
          选择你想参团的课程
        </p>
        <style jsx>{`
          .title {
            text-align: center;
            padding: 10px 10px 0px 10px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
          }
          .head-img {
            margin: 0 10px;
            vertical-align: middle;
            border-radius: 50%;
            width: 40px;
            height: 40px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='title'>
        <p style={{textAlign: 'center'}} className='title-font'>拼团流程</p>
        <div className='content'>
          <span className='content-color'>1.购买开团</span>
          <hr className='my-line' />
          <span className='content-color'>2.邀请参团</span>
          <hr className='my-line' />
          <span className='content-color'>3.人满成团</span>
        </div>
        <br />
        <style jsx>{`
          .title {
            text-align: left;
            padding: 10px 10px 0px 10px;
          }
          .title-font {
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            margin: 10px 10px;
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            line-height: 20px;
          }
          .my-line {
            {/*width:20px;*/}
            flex: 1 1 auto;
            height:1px;
            border:none;
            border-top:1px solid  #e5e5e5;
          }
          .content-color {
            padding: 0 5px;
            border-radius: 20px;
            background-color: #f0f2f6;
          }
        `}</style>
      </div>)
    }
  }

  renderList () {
    let {dataInfo} = this.props
    let chooseBar = {
      margin: '10px auto'
    }
    let chooseStyle = {
      color: 'white',
      backgroundColor: '#ef4645',
      borderColor: '#ef4645'
    }
    let barStyle = {
      padding: '5px 10px 5px 20px'
    }
    return (
      <ChooseBar style={chooseBar}
        defaultActiveKey={this.state.currentSelect}
        onChange={this.onChange}
        chooseStyle={chooseStyle}>
        {dataInfo.map((ele, index) => {
          return (<ChooseItem key={index} style={barStyle}>
            {this.renderInnerContent(ele, index)}
          </ChooseItem>)
        })}
      </ChooseBar>
    )
  }

  renderInnerContent (ele, index) {
    let choose = {
      backgroundColor: 'white',
      color: '#ef4645'
    }
    let normal = {
      backgroundColor: '#241d66',
      color: 'white'
    }
    let style = (index === this.state.currentSelect) ? choose : normal
    return (
      <div className='line'>
        <div className='card-name'>{ele.name}</div>
        <span className='price'>{`拼团价 ￥`}<strong>{`${this.calcPrice(ele, 'now')}`}</strong></span>
        <style jsx>{`
            .line {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }
            .card-name {
              flex: 4;
              margin-right: 10px;
              display: flex;
              align-items: center;
            }
            .price {
              text-align: right;
              flex: 3
            }
            .price strong {
              font-size: 16px;
            }
          `}</style>
      </div>
    )
  }

  calcPrice (priceInfo, type) {
    let value = 100
    let isCoupon = this.props.couponInfo
    let {showPrice, price} = priceInfo
    let couponPrice = price
    if (isCoupon) {
      couponPrice = couponPrice * this.coupon
    }
    let calcPrice
    switch (type) {
      case 'origin':
        calcPrice = showPrice
        break
      case 'now':
        calcPrice = price
        break
      case 'finalPrice':
        calcPrice = couponPrice
        break
      case 'discount':
        calcPrice = (showPrice - couponPrice)
        break
    }
    return (parseInt(calcPrice / value))
  }

  renderBottom () {
    if (this.props.dataInfo && this.props.dataInfo.length > 0) {
      let priceInfo = this.props.dataInfo[this.state.currentSelect]
      return (
        <div className='bottom-line'>
          <div className='button left-button'>{`原价￥${this.calcPrice(priceInfo, 'origin')}`}</div>
          <div onClick={this.buyButtonClick} className='button rigth-button'>支付{`￥${this.calcPrice(priceInfo, 'finalPrice')}`}</div>
          <style jsx>{`
          .bottom-line{
            position: relative;
            border-top: 1px solid #ef4645;
            display: flex;
            height: 50px;
            line-height: 50px;
          }
          .bottom-line > div {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .tag {
            position: absolute;
            right: 100px;
            top: -30px;
            width: 80px;
            height: 40px;
          }
          .button {
            height: 100%;
          }
          .left-button {
            background-color: white;
            color: #ef4645;
            flex: 3;
          }
          .rigth-button {
            background-color: #ef4645;
            color: white;
            flex: 5;
          }
        `}</style>
        </div>
      )
    }
  }

  buyButtonClick () {
    let typeId = this.props.dataInfo[this.state.currentSelect].id
    let groupId = this.props.joinInfo.id
    this.props.buyButtonCallBack(typeId, groupId)
  }

  // renderCoupon () {
  //   if (this.props.couponInfo) {
  //     let {nickname} = this.props.couponInfo
  //     return (<div className='coupon-div'>
  //       <p> ◉ 已使用{nickname}赠送的优惠券，享9折优惠！</p>
  //       <p>报名后你的好友{nickname}将免费获得一张能力卡</p>
  //       <style jsx>{`
  //       .coupon-div {
  //         margin-bottom: 10px;
  //         padding: 0px 10px;
  //       }
  //     `}</style>
  //     </div>)
  //   }
  // }

  render () {
    if (this.state.render) {
      return (
        <div className='buy-pop-bg' onClick={() => { this.props.cancelCallBack() }}>
          <div className='buy-pop-div' onClick={(e) => { e.stopPropagation() }}>
            {this.renderTitle()}
            {this.renderList()}
            {/*{this.renderCoupon()}*/}
            {this.renderBottom()}
          </div>
          <style jsx>{`
          .buy-pop-bg {
            background-color: rgba(35,24,21,0.5);
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            font-size: 14px;
            z-index: 700;
          }
          .buy-pop-div {
            background-color: white;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            font-size: 14px;
          }
        `}</style>
        </div>
      )
    } else {
      return null
    }
  }

  // change
  onChange (index) {
    this.setState({
      currentSelect: index
    })
  }
}
