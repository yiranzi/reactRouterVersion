import React from 'react'
import Button from '../../../xz-components/button'

export default class Modal extends React.Component {
  renderTitle (title) {
    let group = title.split('：')
    return (
      <div className='sub-title'>
        <div>{group[0]}：</div><div>{group[1]}</div>
        <style jsx>{`
          .sub-title {
            font-size: 22px;
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const {data} = this.props
    return (
      <div>
        <div className='modal-wrapper'>
          <div className='header'>
            {this.renderTitle(data.subTitle)}
            <div className='group'>
              <div className='need-card'><img src='/static/img/abilitycollege/card.png' />{data.cardCount}张能力卡兑换</div>
              <div className='price'>
                <div className='before'>￥{data.twoPrice}</div>
                <div className='now'>￥{data.onePrice}</div>
              </div>
            </div>
          </div>
          <div className='sub-content'>
            <div className='main'><strong>核心内容</strong>：{data.oneContent}</div>
            <div className='get'><strong>你的收获</strong>：{data.twoContent}</div>
            <div className='publish-date'>课程预计上线时间：{data.publishDate}</div>
          </div>
          <div className='need-card-line'>该课程可使用{data.cardCount}张能力卡兑换</div>
        </div>
        <div className='button-group'>
          <a href='/payment/buygether' style={{display: 'inline-block', width: '100%'}}>
            <Button style={{backgroundColor: '#c41616', fontSize: '1rem'}}>
              <img src='/static/img/abilitycollege/fire.png' />能力卡火热拼团中 <strong style={{marginLeft: '0.5rem'}}>立即获取</strong>
            </Button>
          </a>
        </div>
        <style jsx>{`
          /* header 样式 */
          .header .group {
            margin-top: 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header .group .need-card {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .header .group .need-card img {
            margin-right: 0.5rem;
            width: 2rem;
          }
          .header .group .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header .group .price .before {
            position: relative;
          }

          .header .group .price .before::before {
            content: '';
            background-color: red;
            font-size: 14px;
            position: absolute;
            width: 40px;
            height: 1px;
            top: 15px;
            transform: rotate(-15deg);
          }
          .header .group .price .now {
            font-size: 1.25rem;
            margin-left: 0.5rem;
          }
          /* ------------ */
          /* content 样式 */
          .sub-content .main,
          .sub-content .get {
            padding-top: 1rem;
            line-height: 180%;
          }
          .sub-content .publish-date {
            margin-top: 1rem;
            position: relative;
            padding-left: 1.5rem;
          }
          .sub-content .publish-date::before {
            content: '';
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            background-color: #c41616;
            position: absolute;
            left: 0;
            top: 0.3rem
          }
          .need-card-line {
            color: #c41616;
            text-align: center;
            margin: 2rem 0;
          }
          .button-group {
            position: fixed;
            bottom: 20px;
            left: 0;
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
            box-sizing: border-box;
          }
          .button-group img {
            width: 1.25rem;
            margin-right: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .xz-modal-wrap button {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
