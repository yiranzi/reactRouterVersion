import React from 'react'
import PropTypes from 'prop-types'

export default class MyBack extends React.Component {
  static propTypes = {
    direct: PropTypes.string
  }
  static defaultProps = {
    direct: 'left'
  }
  render () {
    const {direct, children} = this.props
    return (
      <div>
        {direct === 'left' && <span className='left'>{children}</span>}
        {direct === 'right' && <span className='right'>{children}</span>}
        <style jsx>{`
          span {
            border: 1px solid #117ee9;
            padding: 1px 5px 1px 12px;
            border-radius: 1rem;
            display: inline-block;
            position: relative;
            font-size: 14px;
            color: #117ee9;
          }
          span.left::before {
            content: '◂';
            position: absolute;
            left: 4px;
            top: 0;
          }
          span.right {
            padding: 1px 12px 1px 5px;
          }
          span.right::before {
            content: '▸';
            position: absolute;
            right: 4px;
            top: 0;
          }
        `}</style>
      </div>
    )
  }
}
