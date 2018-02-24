import React from 'react'
import classNames from 'classnames'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      audio: {}, // audio 对象
      isDrag: false,
      isplaying: false, // 是否正在播放
      durationT: 0, // 音频时长
      currentT: this.props.currentT || 0, // 当前播放时长
      currentP: 0, // 播放进度百分比
      maxProgressWidth: 0,
      dragProgressTo: 0,
      moveStartX: 0,
      offsetL: 0
    }
  }
  componentWillReceiveProps (nextProps) {
    let { currentT } = nextProps
    let { audio, durationT } = this.state
    audio.currentTime = currentT
    this.setState({
      audio: audio,
      currentT: currentT,
      currentP: Number((currentT / durationT) * 100)
    })
  }
  componentDidMount () {
    // 图片预加载
    this.imagePreLoad()
    let audio = new Audio(this.props.src)
    this.setState({
      audio: audio
    }, () => {
      this.initAudioEvent(audio)
    })
    // 进度条宽度
    let maxProgressWidth = document.getElementsByClassName('wx-progress-detail')[0].offsetWidth
    this.setState({maxProgressWidth: maxProgressWidth})
  }
  componentWillUnmount () {
    const { isplaying } = this.state
    if (isplaying) {
      this.audioPause()
    }
  }
  imagePreLoad () {
    let preLoad = new Image()
    preLoad.src = '/static/img/icon/business_pause.png'
  }
  initAudioEvent (audio) {
    let _ = this
    // 因为音频是异步加载，所有需要加载完成后统计时长
    audio.oncanplay = function () {
      _.setState({durationT: audio.duration})
    }
    // 监听时间变化
    audio.ontimeupdate = function () {
      const { currentT, durationT } = _.state
      // 设置当前音频的播放时间
      let currentTime = audio.currentTime
      // 设置一秒更新一次
      if (parseInt(currentT) !== parseInt(currentTime)) {
        currentTime = currentTime > durationT ? durationT : currentTime
        _.setState({currentT: currentTime})
        _.props.setCurrentT(currentTime) // 告诉父类现在的播放进度
        // 设置播放百分比，用于控制进度
        let currentP = Number((currentTime / durationT) * 100)
        currentP = currentP > 100 ? 100 : currentP
        _.setState({currentP: currentP})
      }
    }
    audio.onended = function () {
      _.setState({isplaying: false})
    }
  }
  formartTime (seconds) {
    var formatNumber = function (n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    var m = Math.floor(seconds / 60)
    var s = Math.floor(seconds % 60)
    return formatNumber(m) + ':' + formatNumber(s)
  }
  audioPause () {
    const { audio, isplaying } = this.state
    if (isplaying) {
      audio.pause()
      this.setState({isplaying: false})
    }
  }
  audioPlay () {
    const { audio, isplaying } = this.state
    if (!isplaying) {
      audio.play()
      this.setState({isplaying: true})
    }
  }
  // 播放，暂停点击事件
  audioClick () {
    const { isplaying } = this.state
    if (isplaying) {
      this.audioPause()
    } else {
      this.audioPlay()
    }
  }
  dragStart (event) {
    let moveX = event.touches[0].pageX
    var offsetL = event.target.offsetLeft

    this.setState({isDrag: true, moveStartX: moveX, offsetL: offsetL})
  }
  dragMove (event) {
    const {maxProgressWidth, durationT, moveStartX, offsetL} = this.state
    let moveX = event.touches[0].pageX

    let dragProgressTo = Math.min(maxProgressWidth, Math.max(0, offsetL + (moveX - moveStartX)))
    // this.setState({moveStartX: moveX})

    let currentT = dragProgressTo / maxProgressWidth * durationT

    this.setState({currentT: currentT})
    this.state.audio.currentTime = currentT

    let currentP = Number((currentT / durationT) * 100)
    currentP = currentP > 100 ? 100 : currentP
    this.setState({currentP: currentP})
  }
  dragEnd (event) {
    this.setState({isDrag: false})
  }
  render () {
    const {disc} = this.props
    const {isplaying, currentT, durationT, currentP} = this.state
    return (
      <div className='wx-audio-content'>
        <div className='wx-audio-top'>
          <div className='wx-audio-progress'>
            <div className='wx-progress-detail'>
              <span className='wx-voice-p' style={{width: `${currentP}%`}} />
              <span className='wx-buffer-p' />
            </div>
            <div
              className='wx-audio-origin'
              style={{left: `${currentP}%`}}
              onTouchStart={(e) => this.dragStart(e)}
              onTouchMove={(e) => this.dragMove(e)}
              onTouchEnd={(e) => this.dragEnd(e)}
            />
          </div>
        </div>
        <div className='wx-audio-bottom wx-space-center'>
          <div className='wx-audio-disc'>
            {disc && <span className='disc'>{disc}</span>}
          </div>
          <div className='wrapper wx-space-center'>
            <div className='wx-audio-time'>
              <span className='current-t' style={{color: '#2bc1ff'}}>{this.formartTime(currentT)}</span>
              <span>/</span>
              <span className='duration-t'>{this.formartTime(durationT)}</span>
            </div>
            <div className='wx-audio-action'>
              {!isplaying && <div className='pause' onClick={() => this.audioClick()} />}
              {isplaying && <div className='playing' onClick={() => this.audioClick()} />}
            </div>
          </div>
        </div>
        <style jsx>{`
          /* 播放器整体样式 */
          .wx-audio-content {
            user-select: none;
            width: 100%;
            height: auto;
            color: #626262;
            font-size: 0;
            box-sizing: border-box;
          }
          /* 进度条 */
          .wx-audio-content .wx-audio-top .wx-audio-progress {
            height: 3px;
            width: calc(100% - 4px);
            position: relative;
          }
          .wx-audio-content .wx-audio-top .wx-audio-progress .wx-progress-detail {
            height: 100%;
            width: 100%;
            background: #f1f1f1;
            position: relative;
            cursor: pointer;
            user-select: none;
          }
          .wx-audio-content .wx-audio-top .wx-audio-progress .wx-progress-detail .wx-voice-p {
            width: 0%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            background: #2bc1ff;
            z-index: 2;
          }
          /* 进度条的小点 */
          .wx-audio-content .wx-audio-top .wx-audio-progress .wx-audio-origin {
            width: 8px;
            height: 8px;
            margin-top: -4px;
            margin-left: 0;
            border-radius: 50%;
            background-color: #2bc1ff;
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 2;
          }
          .wx-audio-content .wx-audio-top .wx-audio-progress .wx-audio-origin:before {
            content: " ";
            display: block;
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            top: 50%;
            margin-top: -12px;
            margin-left: -9px;
            cursor: pointer;
            outline: 0;
          }
          /* 底部文字描述 */
          .wx-audio-content .wx-audio-bottom {
            padding: 15px;
            box-sizing: border-box;
          }
          .wx-audio-content .wx-audio-bottom .wx-audio-disc {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            color: #8c8c8c;
          }
          .wx-audio-content .wx-audio-bottom .wx-audio-disc,
          .wx-audio-content .wx-audio-bottom .wx-audio-time {
            height: auto;
            display: flex;
            justify-content: space-between;
            overflow: hidden;
          }
          .wx-audio-content .wx-audio-bottom .wx-audio-disc span,
          .wx-audio-content .wx-audio-bottom .wx-audio-time span {
            font-size: 12px;
          }
          /**
           * 播放按钮样式
           */
          .wx-audio-content .wx-audio-bottom .wx-audio-action {
            position: relative;
            width: 20px;
            height: 20px;
            margin-left: 15px;
          }
          .wx-audio-content .wx-audio-bottom .playing {
            width: 20px;
            height: 20px;
            background: url(/static/img/icon/business_pause.png) center no-repeat;
            background-size: contain;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          .wx-audio-content .wx-audio-bottom .pause {
            width: 20px;
            height: 20px;
            background: url(/static/img/icon/business_play.png) center no-repeat;
            background-size: contain;
            position: absolute;
            bottom: 0;
            right: 0;
          }
          /* 播放/暂停按钮都是按照状态切换z-index来显示当前状态，为了避免图片加载问题 */
          .wx-audio-content .wx-audio-bottom .playing.z-index, 
          .wx-audio-content .wx-audio-bottom .pause.z-index {
            z-index: 1;
          }
        `}</style>
      </div>

    )
  }
}
