import React from 'react'
import ClassNames from 'classnames'
import Router from 'next/router'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      college: false,
      pai: false,
      hr: false,
      me: false
    }
  }
  render () {
    const {type} = this.props
    return (
      <div className='footer'>
        <div
          className={ClassNames('item', {'current': this.state.college || type === 'college'})}
          onTouchStart={() => { this.setState({college: true}) }}
          onTouchEnd={() => { this.setState({college: false}, () => { Router.push('/abilitycollege/mainx') }) }}
        >
          <div className='icon'>
            {(this.state.college || type === 'college') ? <img src='/static/img/common/college_active.png' /> : <img src='/static/img/common/college.png' />}
          </div>
          <div className='text'>能力学院</div>
        </div>
        <div
          className={ClassNames('item', {'current': this.state.me || type === 'me'})}
          onTouchStart={() => { this.setState({me: true}) }}
          onTouchEnd={() => { this.setState({me: false}, () => { Router.push('/ucenter/portalx') }) }}
        >
          <div className='icon'>
            {(this.state.me || type === 'me') ? <img src='/static/img/common/me_active.png' /> : <img src='/static/img/common/me.png' />}
          </div>
          <div className='text'>我的</div>
        </div>
        <style jsx>{`
          .footer {
            font-size: 10pt;
            text-align: center;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            position: fixed;
            bottom: 0;
            border-top: 1px solid #f0f2f6;
            width: 100%;
            z-index: 9999;
          }
          .footer .item {
            padding: 5px 0;
            flex: 1;
          }
          .footer .current {
            color: #3e84e0;
          }
          .footer .icon {
            font-size: 0;
          }
          .footer .icon img {
            width: 16pt;
          }
          .footer .text {
            font-size: 0.7rem;
          }
        `}</style>
      </div>
    )
  }
}