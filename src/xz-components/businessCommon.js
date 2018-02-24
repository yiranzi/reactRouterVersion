import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      audio: {}, // audio 对象
      isplaying: this.props.isplaying || false // 是否正在播放
    }
  }
  componentDidMount () {
    let audio = new Audio(this.props.src)
    this.setState({
      audio: audio
    }, () => {
      this.initAudioEvent(audio)
    })
  }
  initAudioEvent (audio) {
    let _ = this
    // 因为音频是异步加载，所有需要加载完成后统计时长
    audio.onended = function () {
      _.setState({isplaying: false})
    }
  }
  componentWillUnmount () {
    const { isplaying } = this.state
    if (isplaying) {
      this.audioPause()
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.isplaying) {
      this.audioPause()
      const { audio } = this.state
      audio.currentTime = 0
    }
  }
  audioPause () {
    const { audio } = this.state
    audio.pause()
    this.setState({isplaying: false})
  }
  audioPlay () {
    const { audio } = this.state
    audio.play()
    this.setState({isplaying: true})
  }
  // 播放，暂停点击事件
  audioClick () {
    const { isplaying } = this.state
    if (isplaying) {
      this.audioPause()
    } else {
      this.audioPlay()
    }
    this.props.onClick && this.props.onClick()
  }
  render () {
    const {isplaying} = this.state
    let backgroundImage = 'url(/static/img/learn/reading/audio_active2.png)'
    if (isplaying) {
      backgroundImage = 'url(/static/img/learn/reading/play.gif)'
    }
    return (
      <div className='wx-audio-content'>
        <div className='wx-audio-left'>
          <div className='playing' onClick={() => this.audioClick()} style={{backgroundImage: backgroundImage}} />
        </div>
        <style jsx>{`
          .wx-audio-content .wx-audio-left .playing {
            width: 35px;
            height: 35px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
        `}</style>
      </div>

    )
  }
}
