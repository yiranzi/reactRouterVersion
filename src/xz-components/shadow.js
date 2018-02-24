import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

export default class ShadowDom extends React.Component {
  render () {
    return (
      <div className='shadow' style={this.props.style} onClick={() => close()}>
        {this.props.content}
        <style jsx>{`
          .shadow {
            width: 100%;
            height: 100%;
            padding: 3rem;
            font-size: 14px;
            box-sizing: border-box;
            background: rgba(0,0,0, 0.5);
            position: fixed;
            z-index: 999;
            left: 0;
            top: 0;
            display: flex;
          }
        `}</style>
      </div>
    )
  }
}

function close () {
  const target = document.getElementById('xz-shadow')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
  document.body.style.overflow = 'auto'
}

export function Shadow (properties) {
  document.body.children[0].classList.add('xz-shadow-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-shadow'
  document.body.appendChild(divTarget)
  document.body.style.overflow = 'hidden'
  render(<ShadowDom {...properties} />, divTarget)
}
