import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isPlay: false
    }
    this.clickTitle = this.clickTitle.bind(this)
  }

  clickTitle () {
    let {isPlay} = this.state
    if (isPlay) {
      this.setState({
        isPlay: false
      })
      this.refs.video.pause()
    } else {
      this.setState({
        isPlay: true
      })
      this.refs.video.play()
    }
  }

  render () {
    let hideStyle = {display: 'none'}
    let showStyle = {display: 'flex'}
    return (
      <div className='vedio-with-img' onClick={this.clickTitle}>
        <video style={this.state.isPlay ? showStyle : hideStyle}
          controls={'control'} ref='video'
          src={'https://video.xiaozao.org/final.mp4'} />
        <div className='pause-img' style={this.state.isPlay ? hideStyle : showStyle} >
          <div className='pause-shadow' />
          <img className='pause-button' src={'/static/img/buygether/pause_button.png'} />
          <div className='tips-content'>
            <p>点击查看合作企业代表寄语</p>
          </div>
        </div>

        <style jsx>{`
          .vedio-with-img {
            height: 210px;
          }

          .pause-img {
            position: relative
            height: 100%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            background-image: url('/static/img/buygether/buyBg_1.png');
            background-size:100% 100%;
          }
          .tips-content {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            text-align: center;
            z-index: 10;
          }
           .pause-shadow {
            width: 100%;
            height: 210px;
            background-color: rgba(62,132,224,0.4);
            position: absolute;
            left: 0;
            top: 0;
          }
          .vedio-with-img p {
            font-size: 12px;
            line-height: 12px;
            height: 12px;
            position: relative;
            width: 100%;
            z-index: 10;
            color: white;
          }
          .pause-button {
            position: relative;
            z-index: 10;
            width: 100px;
            height: 100px;
          }
          .pause-bg {
            position: relative;
            z-index: 8;
            width: 100%;
            height: 100%;
          }
          .vedio-with-img video {
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}
