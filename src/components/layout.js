import React from 'react'
// import ToolsUtil from '../util/tools'
import MiniProgram from '../util/miniProgram'
import {Toptips} from 'react-weui'
import weui from 'weui'
import rweui from 'react-weui/build/dist/react-weui.css'
import DefaultCss from '../config/defaultCss'

export default class Layout extends React.Component {
  renderChild () {
    const {error} = this.props
    if (error) {
      return (
        <div className='main'>
          <Toptips type='warn' show>{error.message}</Toptips>
        </div>
      )
    } else {
      return <div className='main'>{this.props.children}</div>
    }
  }

  renderGlobalCss () {
    return (
      <style global jsx>{`
        body {
          font-family: PingFang SC,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,Microsoft Yahei,sans-serif !important;
          max-width: 640px;
          margin: auto;
          overflow-x: hidden;
        }
      `}</style>
    )
  }

  render () {
    return (
      <div {...this.props}>
        {/*{ToolsUtil.isProd() && !MiniProgram.isMiniProgram() && <script src='/static/js/gaprod.js' />}*/}
        {/*{ToolsUtil.isRC() && <script src='/static/js/gatest.js' />}*/}
        <script src='/static/js/autotrack.js' />
        {this.renderChild()}
        {this.renderGlobalCss()}
        <style dangerouslySetInnerHTML={{__html: weui}} />
        <style dangerouslySetInnerHTML={{__html: rweui}} />
        <DefaultCss />
      </div>
    )
  }
}
