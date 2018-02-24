import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <h3 className='title'>{this.props.children}
        <style global jsx>{`
          .title {
            background-image: url(/static/img/learn/reading/kw_title2.png);
            background-size: auto 100%;
            background-repeat: no-repeat;
            background-position: center;
            text-align: center;
            color: #fff;
            font-size: 16px;
            height: 32px;
            margin-bottom: 25px;
          }
        `}</style>
      </h3>
    )
  }
}
