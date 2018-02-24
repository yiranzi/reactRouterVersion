import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

class ModalDom extends React.Component {
  render () {
    return (
      <div className='xz-modal-wrap'>
        <div className='xz-modal'>
          <div className='close' onClick={(event) => { close(event) }} />
          <div className='xz-modal-content' onClick={(event) => { event.stopPropagation() }}>{this.props.children}</div>
        </div>
        <style jsx>{`
          .xz-modal-wrap {
            width: 100%;
            height: 100%;
            font-size: 14px;
            background: rgba(0,0,0, 0.5);
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .xz-modal-wrap .xz-modal {
            width: 100%;
            margin: 40px 20px;
            box-sizing: border-box;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
            max-height: 90vh;
            overflow: scroll;
          }
          .xz-modal-wrap .xz-modal .xz-modal-content {
            padding: 40px 20px;
          }
          .xz-modal-wrap .xz-modal .close {
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
            position: fixed;
            right: 20px;
            background: inherit;
          }
          .xz-modal-wrap .xz-modal .close::before {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
          .xz-modal-wrap .xz-modal .close::after {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(-45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
        `}</style>
      </div>
    )
  }
}

function close (event) {
  const target = document.getElementById('xz-modal-blur')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
  document.body.style.overflow = 'auto'
  event.stopPropagation()
}

export function Modal (properties) {
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-modal-blur'
  document.body.style.overflow = 'hidden'
  document.body.appendChild(divTarget)
  render(<ModalDom {...properties} />, divTarget)
}
