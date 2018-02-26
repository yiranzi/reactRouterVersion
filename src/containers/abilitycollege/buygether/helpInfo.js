import React from 'react'
import HelpPopFunc from './helpPopFunc'
import Triangle from './poptag'
export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showHelpButtonPop: undefined
    }
  }

  componentDidMount () {
    this.setHelpButtonPop()
  }

  setHelpButtonPop () {
    const popWaitTime = 3000
    window.setTimeout(() => {
      this.setState({
        showHelpButtonPop: true
      })
    }, popWaitTime)
  }

  render () {
    let {showHelpButtonPop} = this.state
    let divStyle = {
      height: '30px',
      lineHeight: '30px',
      borderRadius: '30px',
      left: '0px',
      bottom: '0px',
      backgroundColor: '#3e84e0'
    }
    let transformStyle = {}
    if (showHelpButtonPop) {
      transformStyle = {
        transform: 'translateX(0px)'
      }
    } else {
      transformStyle = {
        transform: 'translateX(-300px)'
      }
    }
    return (
      <div style={transformStyle} className='pop-out-div' onClick={() => {
        HelpPopFunc()
      }}>
        <Triangle
          divStyle={divStyle}
          triangleStyle={{borderColor: '#3e84e0  transparent transparent #3e84e0'}}>
          <div className='inner-content'>
            <img src='/static/img/buygether/headImg_help.png' />
            <p>关于课程和分期的问题，我可以帮你解答哦</p>
          </div>
        </Triangle>
        <style>{`
          .pop-out-div {
            position: fixed;
            bottom: 50px;
            left: 0px;
            width: 500px;
            transition: transform 1s;
            z-index: 200;
          }
          .out-container {
            font-size: 16px;
            position: relative;
          }
          .inner-content {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .inner-content img {
            width: 25px;
            height: 25px;
            border-radius: 50%;
          }
        `}</style>
      </div>
    )
  }
}