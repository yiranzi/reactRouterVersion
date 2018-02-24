import React from 'react'

class Loading extends React.Component {
  render () {
    return (
      <div className='loading-icon'>
        <img src='/static/img/components/loading_icon.png' />
        <style jsx>{`
          .loading-icon {
            text-align: center;
          }
          .loading-icon img {
            width: 2rem;
            animation: circle 1s infinite linear;
          }
          @keyframes circle {
            0%{ transform:rotate(0deg); }
            100%{ transform:rotate(-360deg); }
          }
        `}</style>
      </div>
    )
  }
}

export default Loading
