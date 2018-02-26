// 库
import React from 'react'
import {Redirect} from 'react-router-dom'
// 工具
import wxPay from '../../util/wxPay'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import setShare from '../../wx/setShare'
// 全局基础组件
import Layout from '../../components/layout'
import Button from '../../xz-components/button'
import LoadingIcon from '../../xz-components/loadingicon'
import {Alert} from '../../xz-components/alert'
import VedioWithImg from '../../xz-components/vedioWithImg'
import Fixfooter from '../../xz-components/fixfooter'
import {Confirm} from '../../xz-components/confirm'
// 特性业务组件
import BuyPop from '../../containers/abilitycollege/buygether/buypop' // 点击购买弹窗
import SharePop from '../../containers/abilitycollege/buygether/sharePop' // 开团分享弹窗
import AfterPayPop from '../../containers/abilitycollege/buygether/afterPayPop' // 付款成功弹窗
import MoreCourseIcon from '../../containers/abilitycollege/buygether/moreCourseIcon' // 更多课程跳转按钮
import GroupCard from '../../containers/abilitycollege/buygether/groupcard' // 渲染团购的成团信息卡片
// 公用业务组件
import AutoShowHelpPop from '../../containers/abilitycollege/buygether/helpInfo' // 左下角滑动出来的帮助
import CourseInfoNavBar from '../../containers/abilitycollege/buygether/courseInfoNavBar' // 渲染tabbar和对应的富文本内容
import HelpPopFunc from '../../containers/abilitycollege/buygether/helpPopFunc' // 咨询弹窗二维码

export default class extends React.Component {
  groupLength = 4 // 列表长度
  changeInterval = 4000 // 切换间隔
  nickname // 分享昵称
  headimgurl // 分享头像

  buttonStyle = {
    backgroundColor: '#c41616',
    color: 'white',
    fontSize: '14px'
  }


  constructor (props) {
    super(props)
    this.state = {
      courseId: undefined,
      showPop: false, // 购买弹窗
      myGroup: [], // 我的团信息
      otherGroup: undefined, // 其他团信息
      couponInfo: undefined, // 优惠券信息（我自己持有的）
      myGroupingId: undefined, // 我正在开团的id
      currentJoinInfo: {}, // 参团信息
      packageList: undefined, // 套餐信息
      littleRender: false, // 小程序完成跳转可以渲染
      myGroupTimeInfo: undefined // 为了记录倒计时信息
    }
    this.showBuyMyGroupPop = this.showBuyMyGroupPop.bind(this)
    this.showBuyOtherPop = this.showBuyOtherPop.bind(this)
    this.buyButtonCallBack = this.buyButtonCallBack.bind(this)
    this.updateInfo = this.updateInfo.bind(this)
  }

  componentWillMount = async () => {
    // 获取courseId
    let {courseId} = this.props.match.params
    await this.setState({
      courseId: courseId
    })
    await this.updateInfo()
    // 拉取封面（不需要缓存这个接口）
    let courseInfo = await AxiosUtil.get(`/api/learning/courseDetail/${courseId}`)
    this.setState({
      bgCover: courseInfo.cover
    })
  }

  // 拉取基本数据
  updateInfo = async () => {
    let {courseId} = this.state
    let buyDetail = await AxiosUtil.get(`/api/group-course-buy/buyDetail/${courseId}`)
    let {myGroup, otherGroup, learningCoursePackageList: packageList, detailList} = buyDetail
    await this.setState({
      myGroup: myGroup,
      otherGroup: otherGroup,
      packageList: packageList,
      detailList: detailList
    })
    // 设置其他的团
    this.setRenderOtherGroupInterval()
    // 设置我的团状态
    await this.setGroupStatus(myGroup)
    // 调用分享函数
    let _this = this
    if (window.__wxjs_environment === 'miniprogram') {
      this.setShareLittle()
    } else {
      this.setShareWx()
    }
    // 根据不同状态弹出唯一弹窗
    this.popByDiffStatus()
  }

  // 根据信息设置开团状态
  setGroupStatus = async (myGroup) => {
    let myGroupingId = null
    let result
    if (myGroup && myGroup.length > 0) {
      // 查找 正在开团？
      result = myGroup.find((ele, index) => {
        return (ele.status === false)
      })
      if (result) {
        // 1 保存分享信息
        let userInfo = await AxiosUtil.get('/api/user', true)
        let {nickname, headimgurl} = userInfo
        this.nickname = nickname
        this.headimgurl = headimgurl
        // 1 设置正在团 状态
        myGroupingId = result.id
      }
    }
    await this.setState({
      myGroupingId: myGroupingId,
      myGroupTimeInfo: result
    })
  }

  popByDiffStatus () {
    // 三种弹框只谈一种
    if (this.state.myGroupingId) {
      // 如果自己正在开团。弹框
      SharePop(this.state.packageList[0].name, this.state.myGroupTimeInfo)
    } else {
      // 如果自己已经成团。
      let {courseId, myGroup} = this.state
      let result
      if (myGroup && myGroup.length > 0) {
        // 查找 正在开团？
        result = myGroup.find((ele, index) => {
          return (ele.status === true)
        })
      }
      if (result) {
        AfterPayPop(courseId)
      } else {
        // 如果是下线进入开的团 判定弹出购买框
        this.joinGroupFromShare()
      }
    }
  }

  // 根据链接 弹出购买框
  joinGroupFromShare () {
    let groupId = ToolsUtil.getQueryString('groupId')
    if (groupId) {
      let nickname = ToolsUtil.getQueryString('nickname')
      let headimgurl = ToolsUtil.getQueryString('headimgurl')
      nickname = decodeURI(decodeURI(nickname))
      headimgurl = decodeURI(headimgurl)
      let currentJoinInfo = {
        nickname: nickname,
        headimgurl: headimgurl,
        id: groupId
      }
      this.showBuyOtherPop(currentJoinInfo)
    }
  }

  setShareLittle () {
    // 如果没有设置过。
    if (!sessionStorage.getItem(`reloadTagLittle${this.state.courseId}`)) {
      // 如果正在开团
      if (this.state.myGroupingId) {
        let nickname = encodeURI(encodeURI(this.nickname))
        let headimgurl = encodeURI(this.headimgurl)
        let addParam = `&groupId=${this.state.myGroupingId}&headimgurl=${headimgurl}&nickname=${nickname}&category=invite`
        let finalUrl = this.originUrl + addParam
        window.history.replaceState(null, '', finalUrl)
        sessionStorage.setItem(`reloadTagLittle${this.state.courseId}`, true)
        window.history.go(0)
      } else {
        // 下线进入后 不需要主动设置分享。 保持原始链接就够了
        // alert('share2')
        // alert(location.href)
        // 默认分享设置
        // let finalUrl = this.originUrl
        // window.history.replaceState(null, '', finalUrl)
        // sessionStorage.setItem(`reloadTagLittle${this.state.courseId}`, true)
        // history.go(0)
        this.setState({
          littleRender: true
        })
      }
    } else {
      this.setState({
        littleRender: true
      })
    }
  }

  componentWillUnmount () {
    sessionStorage.removeItem(`reloadTagLittle${this.state.courseId}`)
  }

  setShareWx () {
    let shareProp = {
      title: `我正在参加${this.state.packageList[0].name}`,
      desc: '和我一起来提升自我吧！',
      link: window.location.href,
      imgUrl: this.state.bgCover
    }
    if (this.state.myGroupingId) {
      let nickname = encodeURI(encodeURI(this.nickname))
      let headimgurl = encodeURI(this.headimgurl)
      shareProp.title = this.nickname + shareProp.title
      let addParam = `&groupId=${this.state.myGroupingId}&headimgurl=${headimgurl}&nickname=${nickname}&category=invite`
      shareProp.link += addParam
    }
    setShare(shareProp)
  }

  // otherGroup 列表自动刷新
  setRenderOtherGroupInterval () {
    let _this = this
    // 如果可供参团大于一次展示的数量
    if (_this.state.otherGroup && _this.state.otherGroup.length > _this.groupLength) {
      _this.window.setInterval(() => {
        let {otherGroup} = _this.state
        // 将前面的移动到最后
        let popArr = otherGroup.splice(0, _this.groupLength)
        otherGroup = otherGroup.concat(popArr)
        _this.setState({
          otherGroup: otherGroup
        })
      }, _this.changeInterval)
    }
  }

  // 立即邀请好友 弹窗 正在开团的line
  // 邀请好友，再得卡 跳转 已成团的line
  renderMyGroup () {
    const {myGroup} = this.state
    if (myGroup && myGroup.length > 0) {
      let arr = myGroup.map((ele, index) => {
        // 要根据这个团的不同情况进行渲染
        if (ele.status === true) {
          // 历史团
          return (<GroupCard key={ele.id} groupInfo={ele}
                             button={<Button style={this.buttonStyle} onClick={() => { AfterPayPop(this.state.courseId) }}>添加小助手</Button>} />)
        } else {
          return (<GroupCard key={ele.id} groupInfo={ele}
                             button={<Button style={this.buttonStyle} onClick={() => { SharePop(this.state.packageList[0].name, ele) }}>立即邀请好友</Button>} />)
        }
      })
      return (<div className='div-with-bottom'>
        <h1 className={'my-title-h1'}>我的团</h1>
        {arr}
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
          }
        `}</style>
      </div>)
    }
  }

  renderOtherGroup () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      const perLength = this.groupLength
      let groupingArr = []
      let buttonStyle = {
        backgroundColor: '#F9F9F9',
        color: '#c41616',
        border: '1px solid #c41616',
        fontSize: '14px',
        width: '60px'
      }
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        groupingArr = otherGroup.slice(0, perLength).map((ele, index) => {
          return (<GroupCard key={ele.id} groupInfo={ele}
                             button={<Button style={buttonStyle} onClick={() => { this.showBuyOtherPop(ele) }}>参团</Button>} />)
        })
      } else if (otherGroup.length > 0) {
        // 如果人数不足4个
        groupingArr = otherGroup.map((ele, index) => {
          return (<GroupCard key={ele.id} groupInfo={ele}
                             button={<Button style={buttonStyle} onClick={() => { this.showBuyOtherPop(ele) }}>参团</Button>} />)
        })
      } else {
        // 如果无人
        groupingArr = <img style={{width: '60%'}} src='/static/img/buygether/no_group.png' />
      }
      return (<div className='div-with-bottom'>
        <h1 className={'my-title-h1'}>拼团进行中</h1>
        {groupingArr}
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            {/*border-bottom: 1px solid #e5e5e5;*/}
          }
        `}</style>
      </div>)
    }
  }

  // 点击购买按钮后的回调触发
  buyButtonCallBack = async (typeId, groupId) => {
    try {
      let payInfo
      // 判断是否是小程序
      let isMiniProgram = window.__wxjs_environment === 'miniprogram'
      // 获取订单。
      if (groupId) {
        payInfo = await AxiosUtil.get(`/api/group-course-buy/buyTogether/${groupId}/${typeId}/${isMiniProgram}`)
      } else {
        payInfo = await AxiosUtil.get(`/api/group-course-buy/buy/${this.state.courseId}/${typeId}/${isMiniProgram}`)
      }
      if (isMiniProgram) {
        // 1 调用小程序支付
        wxPay.payInit(payInfo)
        // 2 显示弹窗 等待完成 确保这个弹窗还有
        this.openConfirm(typeId, groupId, payInfo)
      } else {
        wxPay.payInit(payInfo).then(() => { this.afterPayFinish(typeId, groupId, false) })
      }
    } catch (e) {
      Alert({
        content: e.message
      })
    }
  }

  // 小程序打开弹窗
  openConfirm (typeId, groupId, payInfo) {
    const _this = this
    Confirm({
      content: '付款成功？',
      okText: '成功',
      cancelText: '失败',
      ok: () => { _this.afterPayFinish(typeId, groupId, true) },
      cancel: () => {
        this.updateInfo()
        Alert({ content: '如果付款失败，微信添加小助手xiaozao025获得帮助' })
      }
    })
  }

  // 购买后刷新页面 isLittle true 是小程序。
  afterPayFinish = async (typeId, groupId, isLittle) => {
    // 关闭弹窗
    this.setState({
      showPop: false
    })
    // 准备刷新
    sessionStorage.removeItem(`reloadTagLittle${this.state.courseId}`)
    // sessionStorage.clear()
    // 刷新数据
    await this.updateInfo()
  }

  // 点击打开开团弹窗
  showBuyMyGroupPop = () => {
    if (this.state.myGroupingId == null) {
      // 设置当前选中的套餐
      this.setState({
        currentJoinInfo: {},
        showPop: true
      })
    } else {
      Alert({
        content: '您正在拼团，无法同时参加2个团哦，快邀请好友帮你完成拼团吧！'
      })
    }
  }

  // 点击打开参团弹窗
  showBuyOtherPop = (ele) => {
    if (this.state.myGroupingId == null) {
      // 设置当前选中的套餐
      this.setState({
        currentJoinInfo: ele,
        showPop: true
      })
    } else {
      Alert({
        content: '您正在拼团，无法同时参加2个团哦，快邀请好友帮你完成拼团吧！'
      })
    }
  }

  renderFooter () {
    if (this.state.packageList && this.state.packageList.length > 0) {
      let {price, showPrice} = this.state.packageList[0]
      return (<Fixfooter>
        <div className='fix-foot'>
          <div className='left' onClick={() => { HelpPopFunc() }}>
            <img src='/static/img/buygether/ask.png' />
            <span>在线咨询</span>
          </div>
          <div className='right' onClick={() => { this.showBuyMyGroupPop() }}>
            <div className='single-price'>
              <span style={{fontSize: '16px'}}>￥{parseInt(showPrice / 100)}</span>
              <p>原价购买</p>
            </div>
            <div className='group-price'>
              <img style={{height: '35px'}} src='/static/img/buygether/buy.png' />
              <div>
                <span style={{fontSize: '16px'}}>￥{parseInt(price / 100)}</span>
                <p>特惠开团</p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
       .fix-foot {
          margin: -16px;
          display: flex;
          font-size: 14px;
          color: white;
          height: 50px;
          line-height: 50px;
        }
        .left {
          flex: 1;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
        }
        .left img {
          width: 25px;
          margin-right: 5px;
        }
        .right {
          flex: 3;
          display: flex;
          justify-content: space-around;
        }
        .single-price {
          flex: 1;
          height: 100%;
          line-height: 25px;
          background-color: #ffc581;
          text-align: center;
        }
        .group-price {
          background-color: #ef4645;
          flex: 1;
          height: 100%;
          line-height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .group-price div {
          display: flex;
          width: 70px;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
      </Fixfooter>)
    }
  }

  renderTopImg (bgCover) {
    let XueTuCourse = 99
    return (
      <div>
        {this.state.courseId === XueTuCourse ? <VedioWithImg /> : <img src={bgCover} />}
        <style jsx>{`
          img {
            width: 100%;
            height: 150px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    if (this.state.packageList) {
      if (window.__wxjs_environment === 'miniprogram' && !this.state.littleRender) {
        // 如果小程序没有加载完成
        return null
      }
      if (this.state.packageList.length > 0) {
        // 如果加载完数据
        return (
          <Layout>
            <div className='buy-card-page'>
              <Redirect exact from="/pages/payment/buygether" to={window.__wxjs_environment === 'miniprogram' ? "/pages/abilitycollege/mainx" : "/pages/abilitycollege/main"} />
              {this.renderTopImg(this.state.bgCover)}
              <div className='card-div'>
                <h1 className='course-title'>{this.state.packageList[0].name}</h1>
                {this.renderMyGroup()}
                {this.renderOtherGroup()}
                <CourseInfoNavBar detailList={this.state.detailList} />
              </div>
              {this.renderFooter()}
            </div>
            {this.state.showPop && <BuyPop
              buyButtonCallBack={this.buyButtonCallBack}
              joinInfo={this.state.currentJoinInfo}
              cancelCallBack={() => {
                this.setState({
                  showPop: false
                })
              }}
              couponInfo={this.state.couponInfo}
              dataInfo={this.state.packageList}
            />}
            <MoreCourseIcon />
            {/*<AutoShowHelpPop />*/}
            <style jsx>{`
              .buy-card-page {
                padding-bottom: 60px;
                width: 100%;
                font-size: 0px;
                text-align: center;
                color: #2f3138;
                background-color: #f0f2f6;
              }
              .buy-card-page *{
                margin: 0px;
              }
              .course-title {
                padding: 10px 0 10px 0;
                font-size: 20px;
                text-align: left;
              }
              .buy-button {
                padding: 5px;
              }
              .card-div {
                padding: 0 15px;
                background-color: #F9F9F9;
                {/*border-bottom: 1px solid #e5e5e5;*/}
                {/*margin-bottom: -2px;*/}
              }
              .more-info {
                background-color: #f0f2f6;
              }
        `}</style>
            <style jsx global>{`
             .my-title-h1 {
                padding: 10px 0px;
                font-size: 16px;
                font-weight: normal;
                color: #2f3138;
                text-align: left;
              }
            `}</style>
          </Layout>
        )
      }
    } else {
      return <Layout><LoadingIcon /></Layout>
    }
  }
}
