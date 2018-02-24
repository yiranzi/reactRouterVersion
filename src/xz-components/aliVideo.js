import React from 'react'
import PropTypes from 'prop-types'
import DataUtil from '../util/data'

export default class Video extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    src: PropTypes.string,
    height: PropTypes.string
  };

  constructor (props) {
    super(props)
    this.state = {
      id: `player_${DataUtil.uuid()}`
    }
  }

  componentDidMount () {
    this.createVideo()
  }

  componentDidUpdate (prevProps) {
    const {src: _src} = prevProps
    const {src} = this.props
    if (_src !== src) {
      this.createVideo()
    }
  }

  createVideo = () => {
    let {playerId, type, src, height} = this.props
    let {id} = this.state
    if (playerId) {
      id = playerId
    }
    if (type === 'mp4') {
      type = 'video/mp4'
    } else {
      type = 'application/x-mpegURL'
    }

    let $player = document.getElementById(id)
    if ($player) {
      $player.style.display = 'block'
      // eslint-disable-next-line
      videojs.getComponent('ControlBar').prototype.options_ = {
        children: [
          'playToggle',
          'progressControl',
          'currentTimeDisplay',
          'timeDivider',
          'durationDisplay',
          'volumeMenuButton',
          'PlaybackRateMenuButton',
          'fullscreenToggle'
        ]
      }
      // eslint-disable-next-line
      let player = videojs(id, {
        controls: true,
        playbackRates: [0.5, 1, 1.5, 2],
        controlBar: {
          playToggle: true,
          volumeMenuButton: {
            inline: false
          },
          timeDivider: true,
          durationDisplay: true,
          currentTimeDisplay: true,
          fullscreenToggle: true
        },
        withCredentials: true,
        sources: [
          {
            'type': type,
            src
          }
        ],
        height
      })
      document.getElementById(id).addEventListener('keydown', function (e) {
        var keyCode = e.keyCode
        if (keyCode === 39) {
          // 快进
          player.currentTime(player.currentTime() + 5)
        } else if (keyCode === 37) {
          // 后退
          player.currentTime(player.currentTime() - 5)
        } else if (keyCode === 32) {
          if (player.paused()) {
            player.play()
          } else {
            player.pause()
          }
        }
      })
    }
  };

  renderGlobalCss () {
    return (
      <style global jsx>{`
        .video-js .vjs-current-time,
        .vjs-time-control.vjs-time-divider,
        .vjs-duration.vjs-time-control.vjs-control{
          display: block !important;
        }
      `}</style>
    )
  }

  render () {
    const {playerId} = this.props
    const {id} = this.state
    return (
      <div>
        {!playerId &&
        <video id={id} className='video-js' style={{display: 'none'}} />
        }
        <style global jsx>{`
          .video-js {
            margin: auto;
          }
          .video-js .vjs-current-time,
          .vjs-time-control.vjs-time-divider,
          .vjs-duration.vjs-time-control.vjs-control{
            display: block !important;
          }
        `}</style>
      </div>
    )
  }
}
