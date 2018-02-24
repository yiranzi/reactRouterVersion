import React from 'react'

/*
  param:
  children: 传入的内部组件
  outDivStyle: 用于修改默认样式
  bgClick: 点击背景回调（默认为cancelClick的效果）
  innerDivStyle: 用于修改默认样式
  sureDiv:  确认按钮的dom
  sureDivStyle: 用于修改默认样式
  sureClick: 确定按钮的回调
  cancelDiv: 取消按钮的dom
  cancelDivStyle: 用于修改默认样式
  cancelClick: 取消的回调
 by yiran
 */
export default class ModalBox extends React.Component {
  constructor (props) {
    super(props)
    this.sureClickHandler = this.sureClickHandler.bind(this)
    this.bgClickHandler = this.bgClickHandler.bind(this)
  }

  bgClickHandler () {
    if (this.props.bgClick) {
      this.props.bgClick()
    } else {
      this.props.cancelClick()
    }
  }

  sureClickHandler (e) {
    e.stopPropagation()
    this.props.sureClick()
  }

  renderSure () {
    return (
      <div className={'sure-div'} style={this.props.sureDivStyle} onClick={(e) => { this.sureClickHandler(e) }}>
        {this.props.sureDiv}
        <style jsx>{`

        `}</style>
      </div>
    )
  }

  renderClose () {
    let {cancelDiv, cancelDivStyle} = this.props
    if (cancelDiv || cancelDivStyle) {
      return (
        <div className={'close-div'} style={cancelDivStyle} onClick={() => { this.props.cancelClick() }}>
          {this.props.cancelDiv}
          <style jsx>{`
          .close-div {
            // width: 120px;
            // height: 120px;
            // justify-content: center;
            // align-items: center;
            // position: absolute;
            // top: 0px;
            // right: 0px;
            // z-index: 99999;
          }
        `}</style>
        </div>
      )
    }
  }

  render () {
    let {outDivStyle, innerDivStyle} = this.props
    return (<div style={outDivStyle} className='out-div-style' onClick={() => { this.bgClickHandler() }}>
      <div style={innerDivStyle} className={'inner-div-style'} onClick={(e) => { e.stopPropagation() }}>
        {this.renderClose()}
        {this.renderSure()}
        {this.props.children}
      </div>
      <style jsx>{`
        .out-div-style {
          background-color: rgba(35,24,21,0.5);
          position: fixed;
          width: 100%;
          height: 100%;
          z-index: 9999;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-wrap: wrap;
          align-items: center;
        }
        .inner-div-style {
          font-size: 20px;
          text-align: center;
          color: white;
          position: relative;
        }
      `}</style>
    </div>)
  }
}
