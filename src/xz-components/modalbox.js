import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

/*
 param:
 cancelCallBack: 取消的回调
 innerDiv: 内部
 style: 用于修改默认样式

 by yiran
 */
class ModalBox extends React.Component {
  constructor (props) {
    super(props)
    this.cancelClick = this.cancelClick.bind(this)
    this.renderInnerDiv = this.renderInnerDiv.bind(this)
  }

  renderInnerDiv () {
    // 可以修改的内部div样式
    let innerDivDefaultStyle = {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(35,24,21,0.5)',
      textAlign: 'center',
      color: 'white',
      position: 'relative'
    }
    let style = Object.assign(innerDivDefaultStyle, this.props.style)
    return (<div style={style}>
      {this.props.innerDiv}
    </div>)
  }

  cancelClick () {
    const {cancelCallBack} = this.props
    if (cancelCallBack) {
      cancelCallBack()
    }
    close()
  }

  render () {
    // 没有暴露接口的全屏默认样式
    let outDivStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: '9999',
      top: 0,
      left: 0
    }
    // 渲染全屏图 或者 自定义居中组件
    return (<div onClick={this.cancelClick} style={outDivStyle}>
      {this.renderInnerDiv()}
    </div>)
  }
}

function close () {
  const target = document.getElementById('modal-pop')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

export function ModalBoxPopFunc (props) {
  let divTarget = document.createElement('div')
  divTarget.addEventListener('touchmove', e => {
    e.preventDefault()
  }, false)
  divTarget.id = 'modal-pop'
  document.body.appendChild(divTarget)
  render(<ModalBox {...props} />, divTarget)
}
