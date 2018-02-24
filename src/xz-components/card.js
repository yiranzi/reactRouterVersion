import React from 'react'
import classNames from 'classnames'

export default class extends React.Component {
  render () {
    const { title, className, children } = this.props
    return (
      <div className={classNames('card', className)}>
        <div className='title'>{title}</div>
        <div className='content'>{children}</div>
        <style jsx>{`
          .card {
            background-color: #fff;
            box-shadow: 0 5px 5px rgba(229, 229, 229, 1);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 6px;
            line-height: 32px;
          }
          .card .title {
            font-size: 14px;
            font-weight: bold;
            color: #242223;
          }
          .card .content {
            color: #646464;
            line-height: 24px;
          }
        `}</style>
      </div>
    )
  }
}
