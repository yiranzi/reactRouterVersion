import React from 'react'

export default class TimeDown extends React.Component {
  constructor (props) {
    super(props)
    // 可以传入随机初始值
    if (props.randomSecond) {
      // <0的时候 变为0
      let result = this.props.limitTime * 60 - props.randomSecond
      if (result < 0) {
        result = 0
      }
      this.state = {
        currentInterval: {},
        timedown: result
      }
    } else {
      this.state = {
        currentInterval: {},
        timedown: this.props.limitTime * 60
      }
    }
  }

  componentDidMount () {
    let interval = setInterval(() => {
      let {timedown} = this.state
      if (timedown >= 1) {
        this.setState({
          timedown: timedown - 1,
          currentInterval: interval
        })
      } else {
        clearInterval(interval)
        if (this.props.timeDown) {
          this.props.timeDown()
        }
      }
    }, 1 * 1000)
  }

  // 不销毁 计时器会报错。
  componentWillUnmount () {
    if (this.state.currentInterval) {
      clearInterval(this.state.currentInterval)
    }
  }

  renderLeftTime () {
    let {timedown} = this.state
    let minute = parseInt(timedown / 60)
    let second = timedown % 60
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second
    return `${minute} : ${second}`
  }

  render () {
    return (
      <div className='timedown'>
        {/* 因为想填充小时进去 */}
        {this.props.children}
        {this.renderLeftTime()}
      </div>
    )
  }
}
