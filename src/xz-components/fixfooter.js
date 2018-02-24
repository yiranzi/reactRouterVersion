import React from 'react'

export default class extends React.Component {
  componentDidMount () {
    let contentHeight = document.getElementsByClassName('fix-footer')[0].clientHeight
    document.getElementsByClassName('footer')[0].style.height = `${contentHeight}px`
  }
  render () {
    return (
      <div className='footer'>
        <div className='fix-footer' {...this.props}>
          <div className='content'>{this.props.children}</div>
        </div>
        <style jsx>{`
          .fix-footer {
            background-color: #F9F9F9;
            border-top: 1px solid #e5e5e5;
            position: fixed;
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
            z-index: 100;
            bottom: 0;
            left: 0;
          }
        `}</style>
      </div>
    )
  }
}
