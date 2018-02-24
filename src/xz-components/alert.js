import React from 'react'
import PropTypes from 'prop-types'
import {render, unmountComponentAtNode} from 'react-dom'

class AlertDom extends React.Component {
  static propTypes = {
    okText: PropTypes.string,
    ok: PropTypes.func
  }
  static defaultProps = {
    okText: '知道了',
    ok: function () {}
  }

  ok () {
    this.props.ok()
    close()
  }
  render () {
    let { content, okText } = this.props
    return (
      <div className='alert'>
        <div className='dialog'>
          <div className='content'>{content}</div>
          <div className='action'>
            <div className='ok' onClick={() => this.ok()}>{okText}</div>
          </div>
        </div>
        <style jsx>{`
          .alert {
            width: 100%;
            height: 100%;
            font-size: 14px;
            background: rgba(0,0,0, 0.5);
            position: fixed;
            z-index: 99999;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .alert .dialog {
            width: 70%;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
          }
          .alert .dialog .content {
            color: #242223;
            padding: 0.5rem 1rem;
            text-align: center;
          }
          .alert .dialog .action {
            border-top: 1px solid #e5e5e5;
            text-align: center;
            color: #117ee9;
          }
        `}</style>
      </div>
    )
  }
}

function close () {
  const target = document.getElementById('xz-alert')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

export function Alert (properties) {
  document.body.children[0].classList.add('xz-alert-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-alert'
  document.body.appendChild(divTarget)
  render(<AlertDom {...properties} />, divTarget)
}
