import React from 'react'
/**
 * 气泡弹窗
 * 通过修改style和borderStyl来设定样式。小三角等
 */
export default class extends React.Component {
  render () {
    return (<div style={this.props.divStyle} className='org_box'>
      <span style={this.props.triangleStyle} className='org_bot_cor' />
      {this.props.children}
      <style jsx>{`
        .org_box{
            padding: 0 5px;
            height: 20px;
            line-height: 20px;
            border-radius: 5px;
            background-color: #cba46b;
            position: absolute;
            font-size: 12px;
            color: white;
        }
        .org_bot_cor{
            width:0;
            height:0;
            font-size:0;
            border-width:4px;
            border-style:solid;
            border-color:#cba46b  transparent transparent #cba46b;
            overflow:hidden;
            position:absolute;
            left:20px;
            bottom:-8px;
        }
        `}</style>
    </div>)
  }
}
