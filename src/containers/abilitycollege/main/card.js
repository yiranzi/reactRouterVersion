import React from 'react'
import Slider from 'react-slick'
import {Modal} from '../../../xz-components/modal'
import ModalContent from './modal'
import ThemeConfig from '../../../config/theme'

export default class extends React.Component {
  openModal (item) {
    Modal({children: <ModalContent data={item} />})
  }
  renderItem (detail, bg, showTitle) {
    return (
      <div className='card' onClick={() => this.openModal(detail)}>
        <div className='header' style={{backgroundColor: bg}}>
          <div className='sub-title'>{detail.subTitle}</div>
          <div className='group'>
            <div className='need-card'><img src='/static/img/abilitycollege/card-intro.png' />{detail.cardCount}张能力卡兑换</div>
            <div className='price'>
              <div className='before'>￥{detail.twoPrice}</div>
              <div className='now'>￥{detail.onePrice}</div>
            </div>
          </div>
        </div>
        <div className='sub-content'>
          <div className='main'>核心内容：{detail.oneContent}</div>
          <div className='get'>你的收获：{detail.twoContent}</div>
          <div className='publish-date'>课程预计上线时间：{detail.publishDate}</div>
        </div>
      </div>
    )
  }
  renderSlider (detail, bg, showTitle) {
    let settings = {
      mobileFirst: true,
      arrows: false,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '10px',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      adaptiveHeight: false
    }
    let style = {
      padding: '1rem',
      background: `url(/static/img/abilitycollege/bg${bg}.png)`,
      backgroundSize: '100%',
      height: '100%',
      borderRadius: '0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      boxSizing: 'border-box'
    }
    let groupStyle = {
      borderBottom: '1px solid #e5e5e5',
      paddingTop: '1rem',
      paddingBottom: '0.5rem'
    }
    return (
      <Slider {...settings}>
        {detail.content.map((item, index) => {
          return (
            <div ref='card' key={index} className='card' onClick={() => this.openModal(item)}>
              <div className='header' style={style}>
                <div className='sub-title' style={{whiteSpace: 'normal', width: '100%'}}>{item.subTitle}</div>
                <div className='group' style={groupStyle}>
                  <div className='need-card'><img src='/static/img/abilitycollege/card-intro.png' />{item.cardCount}张能力卡兑换</div>
                  <div className='price'>
                    <div className='before'>￥{item.twoPrice}</div>
                    <div className='now'>￥{item.onePrice}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
    )
  }
  render () {
    const {detail, bg, showTitle} = this.props
    if (!detail) return null
    return (
      <div className='wrapper'>
        {showTitle && <div className='title'>{detail.title}</div>}
        <div className='content'>
          {Array.isArray(detail.content) ? this.renderSlider(detail, bg, showTitle) : this.renderItem(detail, bg)}
        </div>
        <style global jsx>{`
          .wrapper {
            max-width: 640px;
            overflow-x: hidden;
          }
          .wrapper .title {
            font-size: 1rem;
            margin: 0.5rem 1rem 1rem 1.5rem;
          }
          .wrapper .card {
            padding: 0 0.5rem;
            box-sizing: border-box;
            border-radius: 10px;
          }
          /* header 样式 */
          .wrapper .card .header {
            color: #fff;
            padding: 0.5rem 1rem;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .wrapper .card .header .sub-title {
            width: 80%;
            font-family: 'SimSun';
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .wrapper .card .header .group {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .wrapper .card .header .group .need-card {
            font-size: 0.85rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .wrapper .card .header .group .need-card img {
            margin-right: 0.5rem;
            width: 1.5rem;
          }
          .wrapper .card .header .group .price {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .wrapper .card .header .group .price .before {
            position: relative;
            font-size: 0.85rem;
          }
          .wrapper .card .header .group .price .before :: before {
            content: '';
            background-color: #c41616;
            font-size: 14px;
            position: absolute;
            width: 38px;
            height: 1px;
            top: 10px;
            transform: rotate(-15deg);
          }

          .wrapper .card .header .group .price .now {
            margin-left: 0.5rem;
          }
          /* ------------ */
          /* content 样式 */
          .wrapper .card .sub-content {
            background: url('/static/img/abilitycollege/shadow.png');
            background-size: 100% 100%;
            font-size: 14px;
            color: ${ThemeConfig.color.content};
            padding: 0 1rem 1rem 1rem;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .wrapper .card .sub-content .main,
          .wrapper .card .sub-content .get {
            font-size: 0.75rem;
            line-height: 150%;
            padding-top: 0.5rem;
            overflow:hidden; 
            text-overflow:ellipsis;
            display:-webkit-box; 
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
          }
          .wrapper .card .sub-content .publish-date {
            color: ${ThemeConfig.color.red};
            margin-top: 0.75rem;
            font-size: 0.75rem;
            position: relative;
            padding-left: 1rem;
            font-size: 14px;
          }
          .wrapper .card .sub-content .publish-date::before {
            content: '';
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 1rem;
            background-color: #c41616;
            position: absolute;
            left: 0;
            top: 4pt;
          }
        `}</style>
      </div>
    )
  }
}
