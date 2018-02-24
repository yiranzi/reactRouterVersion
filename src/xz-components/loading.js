import React from 'react'
import {render} from 'react-dom'

class Loading extends React.Component {
  render () {
    return (
      <div className='loading'>
        <img src='/static/img/components/loading.png' />
        <style jsx>{`
          .loading {
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
          .loading .dialog {
            width: 70%;
            background-color: #fff;
            border-radius: 6px;
            line-height: 32px;
          }
          .loading img {
            width: 30%;
            animation: circle 1s infinite linear;
          }
          @keyframes circle {
            0%{ transform:rotate(0deg); }
            10%{ transform:rotate(10deg); }
            20%{ transform:rotate(20deg); }
            30%{ transform:rotate(30deg); }
            40%{ transform:rotate(40deg); }
            50%{ transform:rotate(50deg); }
            60%{ transform:rotate(60deg); }
            70%{ transform:rotate(70deg); }
            80%{ transform:rotate(80deg); }
            90%{ transform:rotate(100deg); }
            100%{ transform:rotate(-360deg); }
          }
        `}</style>
      </div>
    )
  }
}

Loading.action = function () {
  document.body.children[0].classList.add('xz-loading-blur')
  let divTarget = document.createElement('div')
  divTarget.id = 'xz-loading'
  document.body.appendChild(divTarget)
  render(<Loading />, divTarget)
}

export default Loading
