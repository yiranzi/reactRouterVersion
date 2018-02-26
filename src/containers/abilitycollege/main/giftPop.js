import React from 'react'
import AxiosUtil from '../../../util/axios'
import ModalboxControlled from '../../../xz-components/modalboxControlled'
import {ChooseBar, ChooseItem} from '../../../xz-components/choosebar'
import {Alert} from '../../../xz-components/alert'
import Router from 'next/router'

export default class extends React.Component {
  staticContent = [
    {
      title: '90%面试题都可以套用的【三三原则】',
      imgUrl: 'https://xiaozaoresource.xiaozao.org/learning/cover/%E4%B8%89%E4%B8%89%E5%8E%9F%E5%88%99.png',
      packageId: 99,
      peopleCount: 19154
    },
    {
      title: '小白必看，四大会计师事务所认知课',
      imgUrl: 'https://xiaozaoresource.xiaozao.org/learning/cover/%E5%9B%9B%E5%A4%A7.png',
      packageId: 499,
      peopleCount: 3068
    },
    {
      title: '人力资源管理咨询认知课',
      imgUrl: 'https://xiaozaoresource.xiaozao.org/learning/cover/%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86%E5%92%A8%E8%AF%A2.png',
      packageId: 2283,
      peopleCount: 793
    }
  ]

  constructor (props) {
    super(props)
    this.state = {
      hideInConer: true,
      currentChoose: undefined,
      showPopType: 'notGetPop',
      getGiftInfo: undefined,
      finalChoose: undefined
    }
    this.getButton = this.getButton.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount = async () => {
    this.updataStatus()
  }

  updataStatus = async (type) => {
    let getGiftInfo = await AxiosUtil.get(`/api/gift/getGift`)
    if (getGiftInfo) {
      // 设置当前的选中。
      let index = this.staticContent.findIndex((ele, index) => {
        return (ele.packageId === getGiftInfo.packageId)
      })
      if (index !== -1) {
        this.setState({
          finalChoose: index,
          getGiftInfo: getGiftInfo
        })
      } else {
        this.setState({
          getGiftInfo: getGiftInfo
        })
      }
      if (type) {
        this.setState({
          hideInConer: false,
          showPopType: 'haveGetPop'
        })
      } else {
        this.setState({
          hideInConer: true,
          showPopType: 'haveGetPop'
        })
      }
    } else {
      this.setState({
        hideInConer: false,
        showPopType: 'notGetPop'
      })
    }
  }

  renderLine (index) {
    let ele = this.staticContent[index]
    return (
      <div className='course-view-line'>
        <div className='course-img' >
          <img src={ele.imgUrl} />
        </div>
        <div className='course-info' >
          <div>
            <p className='course-info-title'>{ele.title}</p>
          </div>
          <div className='more-info'>
            <span>已有{this.staticContent[index].peopleCount}人学习</span>
          </div>
        </div>
        <style jsx>{`
          .course-view-line {
            border: 1px solid gray;
            border-radius: 5px;
            height: 60px;
            font-size: 14px;
            display: flex;
            background-color: white;
            color: black;
            padding: 3px;
          }
          .course-img {
            flex: 1;
          }
          .course-img img {
            width: 100%;
            height: 100%;
          }
          .course-info {
            padding-left: 5px;
            flex: 2;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            line-height: 14px;
          }
          .course-info > div {
            width: 100%;
            text-align: left;
          }
          .course-info-title {
            font-size: 14px;
            font-weight: normal;
          }
          .more-info {
          line-height: 10px
            display: flex;
            justify-content: space-between;
          }
          .more-info span {
            font-size: 10px !important;
          }
        `}</style>
      </div>
    )
  }

  getButton = async () => {
    let {currentChoose} = this.state
    if (currentChoose !== undefined) {
      try {
        await AxiosUtil.get(` /api/gift/receive/${this.staticContent[currentChoose].packageId}`)
        this.updataStatus(true)
      } catch (e) {
        Alert({
          content: e.message
        })
      }
    } else {
      Alert({
        content: '点击选择一个免费课程吧！'
      })
    }
  }

  onChange (index) {
    this.setState({currentChoose: index})
  }

  getDiv (type) {
    switch (type) {
      case 'cancel':
        return (
          <div className={'close-button'} >
            X
            <style jsx>{`
          .close-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border: 1px solid white;
            border-radius: 50%;
            color: white;
          }
        `}</style>
          </div>
        )
      case 'goRouter':
        return (
          <div className={'get-button'} >
            <a>前往我的教室学习</a>
            <style jsx>{`
          .get-button {
            margin: auto;
            width: 90%;
            margin-top: 10px;
            font-size: 16px;
            background-color: #ef4645;
            border-radius: 20px;
          }
          .get-button a {
            color: white !important;
          }
        `}</style>
          </div>
        )
      case 'chooseOne':
        return (
          <div className={'get-button'} >
            <a>{this.state.currentChoose === undefined ? '选择一个' : '立即领取 >>'}</a>
            <style jsx>{`
          .get-button {
            margin: auto;
            width: 90%;
            margin-top: 10px;
            font-size: 16px;
            background-color: #ef4645;
            border-radius: 20px;
          }
          .get-button a {
            color: white !important;
          }
        `}</style>
          </div>
        )
    }
  }

  getStyle (type) {
    switch (type) {
      case 'cancel':
        return ({
          width: '90px',
          height: '90px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: '0px',
          right: '-20px',
          zIndex: '99999'
        })
      default:
        return ({
          position: 'absolute',
          width: '100%',
          bottom: '60px',
          left: '0',
          zIndex: '100'
        })
    }
  }

  swarpper (props) {
    return (
      <div>
        <img className={'top-img'} src='/static/img/abilitycollege/giftIcon.png' />
        {props}
        <style global jsx>{`
          .top-img {
            position: relative;
            z-index: 1;
            width: 70%;
          }
          .pop-bottom {
            padding: 40px 10px 40px 10px;
            text-align: center;
            background-color: #ffffff;
            border-radius: 15px;
            font-size: 14px;
            color: black;
            position: relative;
            bottom: 50px;
          }
          .pop-bottom h1 {
            margin: 0px auto 10px auto;
            font-size: 18px;
          }
          .pop-bottom h2 {
            font-size: 16px;
            font-weight: normal;
          }
          .more-tips {
            margin-top: 10px;
          }
      `}</style>
      </div>
    )
  }

  HelpPopFunc2 () {
    let dom = this.swarpper(
      <div className='pop-bottom'>
        <h1>领取成功！</h1>
        {this.state.finalChoose !== undefined && this.renderLine(this.state.finalChoose)}
        <div className={'more-tips'}>
          <p>没听过瘾？更多免费课在</p>
          <p>首页下方的<strong>"限时免费"</strong>领取哦！</p>
        </div>
      </div>)
    return (
      <ModalboxControlled
        sureDiv={this.getDiv('goRouter')}
        sureDivStyle={this.getStyle()}
        sureClick={() => { Router.push(`/learn/course/info?courseId=${this.state.getGiftInfo.courseId}`) }}
        cancelDiv={this.getDiv('cancel')}
        cancelDivStyle={this.getStyle('cancel')}
        cancelClick={() => { this.setState({hideInConer: true}) }}
        innerDivStyle={{width: '80%'}}
        outDivStyle={{backgroundColor: 'rgba(0, 10, 49, 0.5)'}}>
        {dom}
      </ModalboxControlled>
    )
  }

  HelpPopFunc1 () {
    let dom = this.swarpper(
      <div className='pop-bottom'>
        <h1>小灶能力学院 新人专属礼包</h1>
        <h2>选择一个课程免费领取！</h2>
        <ChooseBar type onChange={(index) => { this.onChange(index) }}>
          <ChooseItem>{this.renderLine(0)}</ChooseItem>
          <ChooseItem>{this.renderLine(1)}</ChooseItem>
          <ChooseItem>{this.renderLine(2)}</ChooseItem>
        </ChooseBar>
      </div>
    )
    return (
      <ModalboxControlled
        sureDiv={this.getDiv('chooseOne')}
        sureDivStyle={this.getStyle()}
        sureClick={() => { this.getButton() }}
        cancelDiv={this.getDiv('cancel')}
        cancelDivStyle={this.getStyle('cancel')}
        cancelClick={() => { this.setState({hideInConer: true}) }}
        innerDivStyle={{width: '80%'}}
        outDivStyle={{backgroundColor: 'rgba(0, 10, 49, 0.5)'}}>
        {dom}
      </ModalboxControlled>
    )
  }

  renderConerIcon () {
    let style = {
      position: 'fixed',
      right: '0',
      bottom: '60px',
      fontSize: '40px',
      zIndex: '9999',
      width: '100px'
    }
    return (
      <img style={style} src={'/static/img/abilitycollege/giftIcon.png'}
        onClick={() => {
          this.setState({
            currentChoose: undefined,
            hideInConer: false
          })
        }} />
    )
  }

  render () {
    let {hideInConer, showPopType} = this.state
    if (hideInConer) {
      return (
        this.renderConerIcon()
      )
    } else {
      if (showPopType === 'haveGetPop') {
        return this.HelpPopFunc2()
      } else {
        return this.HelpPopFunc1()
      }
    }
  }
}
