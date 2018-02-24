import React from 'react'
import Link from 'next/link'
import BusinessReading from '../../config/businessReading'
import Layout from '../../containers/businessReading/layout'
import AjaxUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'
import TimePicker from '../../containers/businessReading/timePicker'
import Footer from '../../containers/businessReading/footer'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stageId: '',
      user: {},
      businessInfo: {},
      showTimePicker: false,
      double: false // 阅读设置总是调用两次
    }
  }
  componentDidMount () {
    this.fetchUserInfo()
    this.fetchBusinessInfo()
  }
  fetchUserInfo () {
    AjaxUtil.get('/api/user').then((user) => { this.setState({user: user}) })
  }
  fetchBusinessInfo () {
    let stageId = ToolsUtil.getQueryString('stageId')
    AjaxUtil.get(`/api/business-english/getMyInfo/${stageId}`).then((businessInfo) => {
      this.setState({stageId: stageId, businessInfo: businessInfo})
    })
  }
  showTimePicker () {
    this.setState({showTimePicker: true})
  }
  hideTimePicker () {
    this.setState({showTimePicker: false})
  }
  setTimePicker (value) {
    let array = value.split(' ')
    let hour = Number(array[0].replace('点', ''))
    let minute = Number(array[1].replace('分', ''))
    AjaxUtil.get(`/api/business-english/changeNotice/${this.state.stageId}?hour=${hour}&minute=${minute}`).then((res) => {
      this.fetchBusinessInfo()
    })
    this.hideTimePicker()
  }
  renderDate (num, string) {
    if (num >= 10) {
      return num
    } else {
      return `0${num}`
    }
  }
  getText (count, singular, complex) {
    if (count > 1) {
      return `${complex}`
    } else {
      return `${singular}`
    }
  }
  render () {
    const { stageId, user, businessInfo, showTimePicker } = this.state
    if (DataUtil.isEmpty(user)) { return <Loading /> }
    return (
      <Layout>
        <div className='mine'>
          <div className='user-info wx-space-left'>
            <div className='avatar'><img src={user.headimgurl} /></div>
            <div className='user-info-wrapper'>
              <div className='nickname'>{user.nickname}</div>
              <div className='learn-words'>
                <span><strong>{businessInfo.readWords}</strong> {this.getText(businessInfo.readWords, 'word', 'words')}</span>
              </div>
            </div>
          </div>
          <div className='lesson-progress wx-space-center wx-text-center'>
            <div className='finished'>
              <Link href={`/businessReading/lessonlist?stageId=${stageId}`}>
                <a>
                  <div className='text'>已完成</div>
                  <div className='count'><strong>{businessInfo.completeLesson}</strong> {this.getText(businessInfo.completeLesson, 'Lesson', 'Lessons')}</div>
                </a>
              </Link>
            </div>
            <div className='missed'>
              <Link href={`/businessReading/lessonlist?stageId=${stageId}`}>
                <a>
                  <div className='text'>已错过</div>
                  <div className='count'><strong>{businessInfo.missLesson}</strong> {this.getText(businessInfo.missLesson, 'Lesson', 'Lessons')}</div>
                </a>
              </Link>
            </div>
          </div>
          <ul className='mine-list'>
            <li className='knowledge'>
              <Link href={`/businessReading/knowledgelist?stageId=${stageId}`}>
                <a className='wx-space-center'>
                  <div className='list-wrapper '>
                    <h4>我的知识导图</h4>
                  </div>
                  <div className='arrow'>
                    <img src='/static/img/businessReading/arrow-right.png' />
                  </div>
                </a>
              </Link>
            </li>
            <li className='source'>
              <Link href={`/businessReading/sourcelist?stageId=${stageId}`}>
                <a className='wx-space-center'>
                  <div className='list-wrapper '>
                    <h4>文章朗读</h4>
                    <div>纯正美音朗读</div>
                  </div>
                  <div className='arrow'>
                    <img src='/static/img/businessReading/arrow-right.png' />
                  </div>
                </a>
              </Link>
            </li>
            <li className='prize'>
              <Link href='/businessReading/myprize'>
                <a className='wx-space-center'>
                  <div className='list-wrapper '>
                    <h4>我的奖励</h4>
                    <div>阅读奖励，分享奖励</div>
                  </div>
                  <div className='arrow'>
                    <img src='/static/img/businessReading/arrow-right.png' />
                  </div>
                </a>
              </Link>
            </li>
            <li className='notice wx-space-center' onClick={() => { this.showTimePicker() }}>
              <div className='list-wrapper'>
                <h4>阅读提醒设置</h4>
                {!DataUtil.isEmpty(businessInfo) && (
                  <div>北京时间 {this.renderDate(businessInfo.noticeHour)} : {this.renderDate(businessInfo.noticeMinute)}</div>
                )}
              </div>
              <div className='arrow'>
                <img src='/static/img/businessReading/arrow-right.png' />
              </div>
            </li>
            <li className='question wx-space-center'>
              <Link href='https://shimo.im/docs/K73oXGayLxEKK5YT'>
                <a className='wx-space-center'>
                  <div className='list-wrapper'>
                    <h4>常见问题答疑</h4>
                    <div>使用方法、打卡奖励、时间安排</div>
                  </div>
                  <div className='arrow'>
                    <img src='/static/img/businessReading/arrow-right.png' />
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
        {!DataUtil.isEmpty(businessInfo) && (
          <TimePicker
            defaultHour={businessInfo.noticeHour}
            defaultMinute={businessInfo.noticeMinute}
            show={showTimePicker}
            onChange={(value) => { this.setTimePicker(value) }}
            onCancel={() => { this.hideTimePicker() }}
          />
        )}
        <Footer type='mine' />
        <style jsx>{`
          .mine {
            padding: 1rem;
          }
          .user-info .avatar img {
            width: 5rem;
            border-radius: 5rem;
          }
          .user-info .user-info-wrapper {
            margin-left: 2rem;
          }
          .user-info .user-info-wrapper .nickname {
            color: ${BusinessReading.color.main};
            font-weight: bold;
            font-size: 16px;
          }
          .user-info .user-info-wrapper .learn-words strong {
            font-size: 16px;
          }

          .lesson-progress {
            font-size: 14px;
            box-shadow: 2px 2px 19px rgba(43,193,255,0.2);
            border-radius: 1rem;
            padding: 1rem 0;
            margin: 0.5rem 0;
          }
          .lesson-progress .finished,
          .lesson-progress .missed {
            flex: 1;
          }

          ul.mine-list {
            list-style: none;
          }
          ul.mine-list li {
            padding: 1.5rem 0 1rem 0;
            border-bottom: 1px solid #e3e3e3;
          }
          ul.mine-list li a {
            width: 100%;
            color: #626262;
          }
          ul.mine-list li .list-wrapper div {
            font-size: 12px;
          }
          ul.mine-list li .arrow img {
            width: 8px;
          }
        `}</style>
        <style global jsx>{`
          .weui-mask {
            background: rgba(0, 0, 0, 0.8) !important;
          }
          .weui-picker__action:last-child {
            color: ${BusinessReading.color.main} !important;
          }
          .tips {
            color: white;
            padding: 10px;
            margin: 14px;
            border: 1px solid white;
            border-radius: 1rem;
          }
          .tips p {
            font-size: 12px;
          }
          .tips .title {
            margin-bottom: 4px;
          }
          .weui-animate-slide-up {
            animation: none !important;
            transform: translate3d(0,0,0) !important;
          }
        `}</style>
      </Layout>
    )
  }
}
