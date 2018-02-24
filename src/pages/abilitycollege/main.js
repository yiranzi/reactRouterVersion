import React from 'react'
import Layout from '../../components/layout'
import Footer from '../../components/footer'
import {
  Swiper,
  Flex,
  FlexItem,
  LoadMore
} from 'react-weui'
import AxiosUtil from '../../util/axios'
import Slider from 'react-slick'
// import HelpPopFunc from '../../containers/abilitycollege/buygether/helpPopFunc'
// import GiftPop from '../../containers/abilitycollege/main/giftPop'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      demoIndex: 0,
      topBanner: null,
      courseType2List: null,
      courseType3List: null,
      courseType4List: null,
      feedbackBanner: null,
      advBanner: null
    }
  }

  settings = {
    className: 'center slider-banner',
    mobileFirst: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: '15px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    adaptiveHeight: false,
    touchMove: true,
    touchThreshold: 999999999
  }

  componentDidMount = async () => {
    this.loadTopBannerData()
    this.loadCourseTypeList()
  }

  loadTopBannerData = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/10/1`).then(function (res) {
        _this.setState({
          topBanner: res
        })

        _this.loadOtherBannerData()
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadOtherBannerData = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/11/1`).then(function (res) {
        _this.setState({
          feedbackBanner: res
        })
      })
      AxiosUtil.get(`/api/adv/getAdvByTypeAndObjId/12/1`).then(function (res) {
        _this.setState({
          advBanner: res
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadCourseTypeList = async () => {
    try {
      const _this = this
      AxiosUtil.get(`/api/learning/courseList/2`).then(function (res) {
        _this.setState({
          courseType2List: res
        })
        _this.loadOtherCourseTypeList()
      })
    } catch (e) {
      console.error(e)
    }
  }

  loadOtherCourseTypeList = async () => {
    try {
      const _this = this
      await AxiosUtil.get(`/api/learning/courseList/3`).then(function (res) {
        _this.setState({
          courseType3List: res
        })
      })
      await AxiosUtil.get(`/api/learning/courseList/4`).then(function (res) {
        _this.setState({
          courseType4List: res
        })
      })
    } catch (e) {
      console.error(e)
    }
  }

  renderTopBanner () {
    const {topBanner} = this.state
    if (topBanner) {
      const bannerElements = topBanner.map(function (item, index) {
        return (<div key={index}>
          <a href={item.url ? item.url : 'javascript:;'}>
            <img className='banner-img block-radius' src={item.img} /></a>
        </div>)
      })

      return (<div className='block'>
        <Swiper className='top-banner block-radius' onChange={(prev, next) => this.setState({demoIndex: next})} >
          {bannerElements}
        </Swiper>
        <style global jsx>{`
          .top-banner {
            overflow: hidden;
            box-shadow: 2px 2px 54px 10px #f0f0f0;
          }
          .top-banner .react-weui-swiper__wrapper {
            height: auto !important;
          }
          .top-banner .react-weui-swiper__item {
            border-radius: 8px;
            overflow: hidden;
            height: auto !important;
            line-height: 1px;
          }
          .top-banner .banner-img {
            height: auto;
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderNavbar () {
    return (<div className='college-nav-bar block'>
      <Flex>
        <FlexItem>
          <div className='item'>
            <a href='#course4'>
              <img src='/static/img/icon/course_type44.png' /><br /><label>线上学徒项目</label>
            </a>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item'>
            <a href='#course3'>
              <img src='/static/img/icon/course_type33.png' /><br /><label>精品课程</label>
            </a>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item'>
            <a href='#course2'>
              <img src='/static/img/icon/course_type22.png' /><br /><label>限时免费</label>
            </a>
          </div>
        </FlexItem>
        <FlexItem>
          <div className='item' >
            <img src='/static/img/icon/course_contact11.png' /><br /><label>在线咨询</label>
          </div>
        </FlexItem>
        <style global jsx>{`
          .college-nav-bar {

          }
          .college-nav-bar .weui-flex {
            margin: auto -15px;
          }
          .college-nav-bar img {
            width: 50px;
          }
          .college-nav-bar .item {
            text-align: center;
            font-size: 0.7rem;
          }
          .college-nav-bar .item label {
            color: gray;
          }
        `}</style>
      </Flex>
    </div>)
  }

  renderCourseType2 () {
    const {courseType2List} = this.state
    if (courseType2List) {
      const col = 2
      let courseLineArray = []
      for (let i = 0; i < courseType2List.length; i += col) {
        let lineArray = courseType2List.slice(i, i + col)
        if (lineArray.length < col) {
          lineArray = lineArray.concat([col - lineArray.length])
        }
        courseLineArray.push(lineArray)
      }
      let courseElements = courseLineArray.map(function (item, index) {
        return (<Flex key={index}>
          {
            item.map(function (item2, index2) {
              return (<FlexItem key={index2}>
                {item2.cover && <div className='item block-radius'>
                  <a href={item2.path ? item2.path : 'javascript:;'}>
                    <div className='img-block'><img className='img' src={item2.cover} /></div>
                    <div className='info-block'>
                      <p className='name wx-line-clamp2'>{item2.name}</p>
                      <p className='info wx-clearfix'><span className='buy-count wx-pull-left'>{item2.buyCount}人学习</span><span className='course-tag wx-pull-right'>限时免费</span></p>
                    </div>
                  </a>
                </div>}
              </FlexItem>)
            })
          }
        </Flex>)
      })

      return (<div className='course-type2 block'>
        <h3 id='course2' className='block-title'>限时免费</h3>
        {courseElements}
        <style global jsx>{`
          .course-type2 {

          }
          .course-type2 .weui-flex {
            margin: 0 -8px;
          }
          .course-type2 .item {
            box-shadow: 2px 2px 54px 10px #f0f0f0;
            background-color: #fff;
            overflow: hidden;
            margin: 8px;
          }
          .course-type2 .item .img-block {
            max-height: 140px;
            overflow: hidden;
            line-height: 1px;
          }
          .course-type2 .item .img {
            width: 100%;
          }
          .course-type2 .item .info-block {
            padding: 5px 0;
          }
          .course-type2 .item .name {
            font-size: 0.9rem;
            font-weight: 600;
            height: 44px;
          }
          .course-type2 .item .name,
          .course-type2 .item .info {
            padding: 0 12px;
            margin: 3px 0;
            line-height: 22px;
          }
          .course-type2 .buy-count {
            font-size: 0.7rem;
            color: gray;
          }
          .course-type2 .course-tag {
            font-size: 0.7rem;
            color: #fa7f5c;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderCourseType3 () {
    const {courseType3List} = this.state
    if (courseType3List) {
      let courseElements = courseType3List.map(function (item, index) {
        return (<div className='item block-radius' key={index}>
          <a href={item.path ? item.path : 'javascript:;'}>
            <div className='img-block'><img className='img' src={item.cover} /></div>
            <div className='info-block'>
              <p className='info'><span className='buy-count'>{item.buyCount} 人学习</span>
                <span className='course-price'><small>&yen;</small> {item.price / 100}</span></p>
            </div>
          </a>
        </div>)
      })

      return (<div className='course-type3 block'>
        <h3 id='course3' className='block-title'>精品课程</h3>
        {courseElements}
        <p className='wx-text-center block-tips'><small>更多课程持续更新中</small></p>
        <style global jsx>{`
          .course-type3 {

          }
          .course-type3 .item {
            overflow: hidden;
            position: relative;
          }
          .course-type3 .item .img-block {

          }
          .course-type3 .item .img {
            width: 100%;
          }
          .course-type3 .item .info-block {
            padding: 15px 0;
            position: absolute;
            bottom: 0;
            width: 100%;
          }
          .course-type3 .item .name,
          .course-type3 .item .info {
            padding: 0 20px;
            margin: 5px 0;
            line-height: 20px;
            height: 20px;
            color: #fff;
          }
          .course-type3 .buy-count {
            font-size: 0.8rem;
          }
          .course-type3 .course-price {
            margin-left: 30px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderCourseType4 () {
    const {courseType4List} = this.state
    if (courseType4List) {
      let courseElements = courseType4List.map(function (item, index) {
        return (<div className='item' key={index}>
          <a href={item.path ? item.path : 'javascript:;'}>
            <div className='img-block block-radius'><img className='img' src={item.cover} /></div>
            {item.name &&
            <div className='info-block'>
              <h4 className='name wx-line-clamp'>{item.name}</h4>
            </div>
            }
          </a>
        </div>)
      })

      return (<div className='block'>
        <h3 id='course4' className='block-title'>线上学徒项目</h3>
        <div className='course-type4 block-radius'>
          {courseElements}
        </div>
        {courseType4List[0].name &&
        <p className='wx-text-center block-tips'><small>更多课程持续更新中</small></p>
        }
        <style global jsx>{`
          .course-type4 {
            background-color: #f0f0f0;
            padding: 15px;
          }
          .course-type4 .item {

          }
          .course-type4 .item .img-block {
            line-height: 1px;
            overflow: hidden;
          }
          .course-type4 .item .img {
            width: 100%;
          }
          .course-type4 .item .info-block {

          }
          .course-type4 .item .name,
          .course-type4 .item .info {
            margin: 5px 0;
            line-height: 20px;
            height: 20px;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderFeedbackBanner () {
    const {feedbackBanner} = this.state
    if (feedbackBanner) {
      const bannerElements = feedbackBanner.map(function (item, index) {
        return (<div key={index}>
          <a className='block-a' href={item.url ? item.url : 'javascript:;'}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })
      return (<div className='block'>
        <h3 className='block-title'>学员反馈</h3>
        <Slider {...this.settings}>
          {bannerElements}
        </Slider>
        <style global jsx>{`
          .slider-banner {
            margin: 0 -15px;
          }
          .slider-banner .block-a {
            display: inline-block;
            padding: 0 5px;
          }
          .slider-banner .banner-img {
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  renderAdvBanner () {
    const {advBanner} = this.state
    if (advBanner) {
      const bannerElements = advBanner.map(function (item, index) {
        return (<div key={index}>
          <a className='block-a' href={item.url ? item.url : 'javascript:;'}>
            <img className='banner-img' src={item.img} /></a>
        </div>)
      })

      return (<div className='block'>
        <h3 className='block-title'>小灶优势</h3>
        <img className='pic' src='/upload/ueditor/image/20171227/946008909712330752.png' style={{height: '40px', marginBottom: '5px'}} />
        <Slider {...this.settings}>
          {bannerElements}
        </Slider>
        <div style={{margin: '0 -12px'}}>
          <img className='pic' src=' /upload/ueditor/image/20171227/946009474399866880.png' style={{width: '100%', margin: '25px 0'}} />
        </div>
        <style global jsx>{`
          .slider-banner {
            margin: 0 -15px;
          }
          .slider-banner .block-a {
            display: inline-block;
            padding: 0 5px;
          }
          .slider-banner .banner-img {
            width: 100%;
          }
        `}</style>
      </div>)
    } else {
      return (<div className='block' style={{height: '150px'}}><LoadMore loading>Loading</LoadMore></div>)
    }
  }

  render () {
    const {topBanner, courseType2List} = this.state
    return (
      <Layout>
        {(!topBanner || !courseType2List) &&
        <div className='wrapper'>
          <div className='loading'>
            <LoadMore loading> 加载中...</LoadMore>
          </div>
        </div>
        }
        <link rel='stylesheet' type='text/css' href='/static/plugin/slick.min.css' />
        <link rel='stylesheet' type='text/css' href='/static/plugin/slick-theme.min.css' />
        {topBanner && courseType2List &&
        <div className='main'>
          <div className='content'>
            {this.renderTopBanner()}
            {this.renderNavbar()}
            {this.renderCourseType4()}
            {this.renderCourseType3()}
            {this.renderCourseType2()}
            {this.renderFeedbackBanner()}
            {this.renderAdvBanner()}
            {/*<GiftPop />*/}
          </div>
          <Footer type='college' />
        </div>
        }
        <style jsx>{`
          .content {
            padding: 0 15px 2rem 15px;
          }
          .wrapper {
            display: table;
            height: 100vh;
            width: 100%;
          }
          .loading {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
          }
          .loading-img {
            width: 100px;
          }
        `}</style>
        <style global jsx>{`
          .block {
            padding: 15px 0;
          }
          .block-title {
            margin: 0 0 15px 0;
          }
          .block-radius {
            border-radius: 8px;
          }
          .block-tips {
            margin: 5px 0;
          }
          a {
            color: initial;
          }
          .weui-loading {
            width: 25px !important;
            height: 25px !important;
          }
        `}</style>
      </Layout>
    )
  }
}
