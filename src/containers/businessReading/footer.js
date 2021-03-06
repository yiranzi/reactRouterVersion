import React from 'react'
import classNames from 'classnames'
import BusinessReading from '../../config/businessReading'
import FixFooter from '../../xz-components/fixfooter'
import {Link} from 'react-router-dom'

export default class extends React.Component {
  renderToday (type) {
    if (type === 'today') {
      return <img src='/static/img/businessReading/today_active.png' />
    } else {
      return <img src='/static/img/businessReading/today.png' />
    }
  }
  renderMine (type) {
    if (type === 'mine') {
      return <img src='/static/img/businessReading/mine_active.png' />
    } else {
      return <img src='/static/img/businessReading/mine.png' />
    }
  }
  render () {
    const { type } = this.props
    return (
      <FixFooter>
        <div className='wx-space-center'>

          <Link to={`/pages/businessReading/guide/1`}>
              <div className={classNames('today', {current: type === 'today'})}>
                {this.renderToday(type)}
                <p className='text'>今日</p>
              </div>
          </Link>
          <Link to={`/pages/businessReading/mine/1`}>
              <div className={classNames('mine', {current: type === 'mine'})}>
                {this.renderMine(type)}
                <p className='text'>我的</p>
              </div>
          </Link>
        </div>
        <style jsx>{`
          .wx-space-center {
            font-size: 0px;
            padding: 5px 0;
          }

          .current {
            color: ${BusinessReading.color.main};
          }
          .text {
            font-size: 12px;
          }
        `}</style>
        <style global jsx>{`
          .fix-footer {
            padding: 0 !important;
          }
          .fix-footer a img {
            width: 24px;
          }
          .wx-space-center a {
            flex: 1;
            text-align: center;
            width: 100%;
          }
        `}</style>
      </FixFooter>
    )
  }
}
