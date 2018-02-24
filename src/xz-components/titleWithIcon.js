import React from 'react'

export default class extends React.Component {
  render () {
    let {imgUrl, title, outStyle} = this.props
    return (<div style={outStyle} className='lesson-title'>
      <img src={imgUrl} />
      <h2>{title}</h2>
      <style jsx>{`
        .lesson-title {
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          box-sizing: border-box;
        }
        .lesson-title img {
          width: 50px;
        }
        .lesson-title h2 {
          font-size: 18px;
        }
      `}</style>
    </div>)
  }
}
