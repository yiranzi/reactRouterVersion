import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='block'>
        <img className='img' src='/static/img/businessReading/nothing.png' />
        <div className='wx-text-center'>{this.props.children}</div>
        <style jsx>{`
          .block {
            text-align: center;
            font-size: 12px;
            height: 300px;
          }
          .img {
            width: 120px;
            margin-top: 100px;
          }
        `}</style>
      </div>
    )
  }
}
