import React from 'react'
import Button from '../../../xz-components/button'
import Card from './cardx'

export default class extends React.Component {
  renderContent (detail, bg) {
    return <Card detail={detail} bg={bg} showTitle />
  }
  render () {
    const {exchangeDetail} = this.props
    const {currency, work, job} = exchangeDetail
    return (
      <div className='schedule'>
        <h1>小灶能力学院课程体系</h1>
        <div className='detail'>
          <div className='currency'>{this.renderContent(currency, '1')}</div>
          <div className='work'>{this.renderContent(work, '2')}</div>
          <div className='job'>{this.renderContent(job, '3')}</div>
          <div className='tips'>*以上课程均可使用小灶能力卡兑换</div>
        </div>
        <style jsx>{`
          .schedule {
            margin: 2.5rem 0;
            padding: 0 0.5rem;
          }
          .schedule .tips {
            margin-top: 1.5rem;
            font-size: 0.75rem;
            text-align: center;
          }
          .schedule .work,
          .schedule .job {
            margin-top: 1.5rem;
          }
          .schedule .button-group {
            padding: 0 1rem;
          }
          .schedule .button-group a {
            display: inline-block;
            width: 100%;
          }
        `}</style>
        <style global jsx>{`
          .schedule .content .slick-list {
            padding: 0px !important;
          }
          .schedule button {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .schedule button img {
            width: 1.25rem;
            margin-right: 1rem;
          }
        `}</style>
      </div>
    )
  }
}