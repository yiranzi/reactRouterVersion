import React from 'react'

export default class TimeUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      timeup: 0
    }
  }

  componentDidMount () {
    let interval = setInterval(() => {
      let {timeup} = this.state
      this.setState({timeup: timeup + 1})
      if (this.props.stop) {
        clearInterval(interval)
      }
    }, 1 * 1000)
  }

  renderLeftTime () {
    let {timeup} = this.state
    let minute = parseInt(timeup / 60)
    let second = timeup % 60
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second
    return `${minute} : ${second}`
  }

  render () {
    return (
      <div className='timeup'>
        {this.renderLeftTime()}
      </div>
    )
  }
}
