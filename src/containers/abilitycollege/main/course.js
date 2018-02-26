import React from 'react'
import Card from './card'

export default class extends React.Component {
  renderContent (detail, bg) {
    return <Card detail={detail} bg={bg} />
  }
  render () {
    const {exchangeDetail} = this.props
    const {hot, _new} = exchangeDetail
    return (
      <div className='course'>
        <div className='hot'>
          <h1>最热课程</h1>
          <div className='detail'>
            <div className='content'>{this.renderContent(hot, '1')}</div>
          </div>
        </div>
        <div className='new'>
          <h1>最新课程</h1>
          <div className='detail'>
            <div className='content'>{this.renderContent(_new, '1')}</div>
          </div>
        </div>
        <style jsx>{`
          .course {
            margin: 2.5rem 0;
            padding: 0 0.5rem;
          }
          .new {
            margin-top: 3rem;
          }
          .detail {
            margin-top: 1rem;
          }
        `}</style>
        <style global jsx>{`
          .course .content .slick-list {
            padding: 0px !important;
          }
        `}</style>
      </div>
    )
  }
}
