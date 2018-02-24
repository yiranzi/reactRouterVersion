import React from 'react'
import Layout from '../../components/layout'

export default class extends React.Component {
  renderNoStart () {
    return (
      <Layout>
        <div className='block'>
          <img className='img' src='/static/img/businessReading/bg.png' style={{width: '100%'}} />
          <div className='content'>
            <p>1、开课时间：2月9日上午9:00（北京时间）。开课后你可以重新设置提醒时间；</p>
            <p>2、开课后，你将会在每周一三五接收到“小灶能力派服务号”推送的提醒上课消息，同时微信群会在每周二四六发送拓展阅读内容；</p>
            <p>3、每次的学习内容中，你将会看到精选的英文商业报道，听到 Laila 老师对文章的讲解和商业知识点总结，同时会有课后测试题目和知识账单帮助你巩固知识。</p>
            <p>4、每次坚持完成阅读任务，并打卡到朋友圈，就可以获得实体书等奖励。</p>
          </div>
        </div>
        <style jsx>{`
          .content {
            color: #626262;
            font-size: 14px;
            padding: 20px 15px;
            line-height: 180%;
          }
        `}</style>
      </Layout>
    )
  }
  render () {
    const {status} = this.props.error
    if (status === 10002) {
      return this.renderNoStart()
    }
    if (status === 10003) {
      location.href = 'https://wx.xiaozao.org/payment/buygether?courseId=106'
    }
    return null
  }
}
