import React from 'react'
import Layout from '../../components/layout'
import BusinessReading from '../../config/businessReading'
export default class extends React.Component {

  componentDidMount = async () => {
    let {canShare} = this.props
    // 如果该页面不可以分享
    if (!canShare) {
      // eslint-disable-next-line
      wx.hideAllNonBaseMenuItem()
    }
    // 如果该页面可以分享，就不进行任何屏蔽处理
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        body {
          color: #626262;
          line-height: 1.8;
        }
        .businessReading-btn {
          font-size: 16px !important;
          width: 50% !important;
          padding: 8px !important;
          background-color: ${BusinessReading.color.main} !important;
        }
        .margin25 {
          margin-top: 25px;
          margin-bottom: 25px;
        }
      `}</style>
    )
  }
  render () {
    return (
      <Layout>
        {this.props.children}
        {this.renderGlobalCss()}
      </Layout>
    )
  }
}
