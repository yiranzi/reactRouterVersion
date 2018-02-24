import React from 'react'
import {Toptips} from 'react-weui'
import PropTypes from 'prop-types'
import {render, unmountComponentAtNode} from 'react-dom'

class Tips extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    showClose: PropTypes.bool
  }
  static defaultProps = {
    type: 'warn',
    showClose: true
  }
  render () {
    const {type, showClose, children} = this.props
    return (
      <Toptips show type={type} onClick={() => { close() }}>
        <div className='tips-wrap'>
          {showClose && <div className='close' />}
          <div className='message'>{children}</div>
        </div>
        <style jsx>{`
          .tips-wrap {
            position: relative;
          }
          .close {
            position: absolute;
            width: 1rem;
            height: 1rem;
            right: 5px;
            margin-top: 5px;
          }
          .close::before {
            content: '';
            width: 2px;
            height: 1rem;
            background: #fff;
            transform: rotate(45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
          .close::after {
            content: '';
            width: 2px;
            height: 1rem;
            background: #fff;
            transform: rotate(-45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
        `}</style>
      </Toptips>
    )
  }
}

function close () {
  const target = document.getElementById('xz-tips')
  if (target) {
    unmountComponentAtNode(target)
    target.parentNode.removeChild(target)
  }
}

function info (properties) {
  document.body.children[0].classList.add('xz-tips-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-tips'
  document.body.appendChild(divTarget)
  render(<Tips {...properties} />, divTarget)
}

Tips.info = info

export default Tips
