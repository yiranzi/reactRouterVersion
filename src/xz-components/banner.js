import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bannerList: null,
      swiper: null
    }
  }

  componentDidMount () {

  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      bannerList: nextProps.bannerList
    })
  }

  /*
   * 由于数据是异步，所以组件二次更新渲染后调用初始化swiper
   */
  componentDidUpdate () {
    this.renderEvent()
  }

  renderEvent () {
    if (!this.state.swiper && this.state.bannerList) { // 只渲染一次swiper
      this.state.swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        }
      })
    }
  }

  render () {
    let bannerElement = null
    if (this.state.bannerList) {
      bannerElement = this.state.bannerList.map((item, index) => {
        return <div className='swiper-slide' key={index}>
          <a href={item.url}>
            <img className='banner-img' src={item.img} /></a>
          <style jsx>{`
            .banner-img {
              width: 100%;
              height: 100%;
            }
          `}</style>
        </div>
      })
    } else {
      bannerElement = <div className='swiper-slide'>
        <img className='banner-img' src='/static/img/common/login_text.png' />
        <style jsx>{`
          .banner-img {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    }

    return (<div className='banner-box'>
      <link rel='stylesheet' href='/static/plugin/swiper/dist/css/swiper.min.css' />
      <script src='/static/plugin/swiper/dist/js/swiper.min.js' />
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          {bannerElement}
        </div>
        <div className='swiper-pagination' />
      </div>
      <style jsx>{`
        .banner-box {
          height: 160px;
        }
        .swiper-container {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }
      `}</style>
    </div>
    )
  }
}
