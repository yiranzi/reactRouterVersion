import React from 'react'

export default class extends React.Component {
  componentDidMount () {
    // 音频文件
    (function (window, document) {
      var Wxaudio = function (options) {
        if (!(this instanceof Wxaudio)) return new Wxaudio(options)
        this.value = {
          ele: '',
          width: '100%',
          title: '',
          src: '',
          disc: '',
          loop: true
        }

        this.opt = this.extend(this.value, options, true)

        // 判断传进来的是DOM还是字符串
        if ((typeof options.ele) === 'string') {
          this.opt.ele = document.querySelector(options.ele)
        } else {
          this.opt.ele = options.ele
        }

        this.loading = false
        this.isDrag = false
        this.isplaying = false
        this.durationT = 0
        this.currentT = 0
        this.currentP = 0
        this.maxProgressWidth = 0
        this.dragProgressTo = 0

        // 通过时间戳与当前时间的差值来判断是否需要加载
        this.reduceTBefore = 0 // 时间戳与当前时间的差值 (初始化)
        this.reduceTAfter = 0 // 时间戳与当前时间的差值 (执行中)
        this.initDom()
      }

      Wxaudio.prototype = {
        constructor: this,
        initDom: function () {
          // content
          this.wxAudioC = document.createElement('div')
          this.wxAudioC.className = 'wx-audio-content'
          this.wxAudioC.style.width = this.opt.width
          this.opt.ele.appendChild(this.wxAudioC)

          // audio 
          this.wxAudio = document.createElement('audio')
          this.wxAudio.className = 'wx-audio-content'
          this.wxAudio.src = this.opt.src
          this.wxAudioC.appendChild(this.wxAudio)

          // left
          this.wxAudioL = document.createElement('div')
          this.wxAudioL.className = 'wx-audio-left'
          this.wxAudioC.appendChild(this.wxAudioL)

          // left image
          this.wxAudioStateImg = document.createElement('img')
          this.wxAudioStateImg.className = 'wx-audio-state'
          this.wxAudioStateImg.src = '/static/img/audio/pause.png'
          this.wxAudioL.appendChild(this.wxAudioStateImg)

          // right
          this.wxAudioR = document.createElement('div')
          this.wxAudioR.className = 'wx-audio-right'
          this.wxAudioC.appendChild(this.wxAudioR)

          // right  title
          if (this.opt.title) {
            this.wxAudioT = document.createElement('p')
            this.wxAudioT.className = 'wx-audio-title'
            this.wxAudioT.innerText = this.opt.title
            this.wxAudioR.appendChild(this.wxAudioT)
          }

          // right  disc
          this.wxAudioD = document.createElement('p')
          this.wxAudioD.className = 'wx-audio-disc'
          this.wxAudioD.innerText = this.opt.disc
          this.wxAudioR.appendChild(this.wxAudioD)

          // right  progrees
          this.wxAudioP = document.createElement('div')
          this.wxAudioP.className = 'wx-audio-progrees'
          this.wxAudioR.appendChild(this.wxAudioP)

          // right progress detail 
          this.wxAudioDetail = document.createElement('div')
          this.wxAudioDetail.className = 'wx-progrees-detail'
          this.wxAudioP.appendChild(this.wxAudioDetail)

          // voice p
          this.wxVoiceP = document.createElement('span')
          this.wxVoiceP.className = 'wx-voice-p'
          this.wxAudioDetail.appendChild(this.wxVoiceP)

          // buffer p
          this.wxBufferP = document.createElement('span')
          this.wxBufferP.className = 'wx-buffer-p'
          this.wxAudioDetail.appendChild(this.wxBufferP)

          // loading p
          this.wxLoading = document.createElement('span')
          this.wxLoading.className = 'wx-loading'
          this.wxAudioDetail.appendChild(this.wxLoading)

          // laoding wrapper
          this.wxLoadingWrapper = document.createElement('span')
          this.wxLoadingWrapper.className = 'wx-loading-wrapper'
          this.wxLoading.appendChild(this.wxLoadingWrapper)

          // origin 
          this.wxAudioOrigin = document.createElement('div')
          this.wxAudioOrigin.className = 'wx-audio-origin'
          this.wxAudioP.appendChild(this.wxAudioOrigin)

          // 音乐时间信息
          this.wxAudioTime = document.createElement('div')
          this.wxAudioTime.className = 'wx-audio-time'
          this.wxAudioR.appendChild(this.wxAudioTime)

          // currentT
          this.wxAudioCurrent = document.createElement('span')
          this.wxAudioCurrent.className = 'current-t'
          this.wxAudioCurrent.innerText = '00:00'
          this.wxAudioTime.appendChild(this.wxAudioCurrent)

          // durationT
          this.wxAudioDuration = document.createElement('span')
          this.wxAudioDuration.className = 'duration-t'
          this.wxAudioDuration.innerText = '00:00'
          this.wxAudioTime.appendChild(this.wxAudioDuration)

          this.initAudioEvent()
        },

        audioPlay: function () {
          this.wxAudio.play()
          this.isPlaying = true
        },

        audioPause: function () {
          this.wxAudio.pause()
          this.isPlaying = false
        },

        audioPlayPause: function () {
          if (this.isPlaying) {
            this.audioPause()
          } else {
            this.audioPlay()
          }
        },

        audioCut: function (src, title, disc) {
          this.wxAudio.src = src
          this.wxAudioT.innerText = title
          this.wxAudioD.innerText = disc
          this.durationT = 0
          this.currentT = 0
          this.currentP = 0
          this.dragProgressTo = 0
          // 初始化 wxAudioCurrent 的文案
          this.wxAudioCurrent.innerText = '00:00'
          this.wxAudioOrigin.style.left = '0px'
          this.wxVoiceP.style.width = '0px'
          this.audioPlay()
        },

        showLoading: function (bool) {
          this.loading = bool || false
          if (this.loading) {
            this.wxLoading.style.display = 'block'
          } else {
            this.wxLoading.style.display = 'none'
          }
        },

        initAudioEvent: function () {
          var _this = this
          // 音频事件
          // eslint-disable-next-line
          _this.wxAudio.onplaying = function () {
            var date = new Date()
            _this.isPlaying = true
            // eslint-disable-next-line
            _this.reduceTBefore = Date.parse(date) - Math.floor(_this.wxAudio.currentTime * 1000)
            _this.wxAudioStateImg.src = '/static/img/audio/playing.gif'
            // eslint-disable-next-line
          },
          _this.wxAudio.onpause = function () {
            _this.isPlaying = false
            _this.showLoading(false)
            _this.wxAudioStateImg.src = '/static/img/audio/pause.png'
          },
          _this.wxAudio.onloadedmetadata = function () {
            _this.durationT = _this.wxAudio.duration
            // 初始化视频时间
            _this.wxAudioDuration.innerText = _this.formartTime(_this.wxAudio.duration)
          },
          _this.wxAudio.onwaiting = function () {
            if (!_this.wxAudio.paused) {
              _this.showLoading(true)
            }
          },
          _this.wxAudio.oncanplay = function () {
            _this.durationT = _this.wxAudio.duration
            // 初始化视频时间
            _this.wxAudioDuration.innerText = _this.formartTime(_this.durationT)
          },
          _this.wxAudio.onprogress = function () {
            if (_this.wxAudio.buffered.length > 0) {
              var bufferedT = 0
              for (var i = 0; i < _this.wxAudio.buffered.length; i++) {
                // eslint-disable-next-line
                bufferedT += _this.wxAudio.buffered.end(i) - _this.wxAudio.buffered.start(i)
                if (bufferedT > _this.durationT) {
                  bufferedT = _this.durationT
                  _this.showLoading(false)
                  console.log('缓冲完成')
                }
              }
              var bufferedP = Math.floor((bufferedT / _this.durationT) * 100)
              _this.wxBufferP.style.width = bufferedP + '%'
            }

            // ===========================
            var date = new Date()
            if (!_this.wxAudio.paused) {
              _this.reduceTAfter = Date.parse(date) - Math.floor(_this.currentT * 1000)
              if (_this.reduceTAfter - _this.reduceTBefore > 1000) {
                _this.showLoading(true)
              } else {
                _this.showLoading(false)
              }
            } else {

            }
          },
          // 绑定进度条
          _this.wxAudio.ontimeupdate = function () {
            var date = new Date()
            if (!_this.isDrag) {
              _this.currentT = _this.wxAudio.currentTime
              _this.currentP = Number((_this.wxAudio.currentTime / _this.durationT) * 100)
              _this.reduceTBefore = Date.parse(date) - Math.floor(_this.currentT * 1000)
              _this.currentP = _this.currentP > 100 ? 100 : _this.currentP
              _this.wxVoiceP.style.width = _this.currentP + '%'
              _this.wxAudioOrigin.style.left = _this.currentP + '%'
              // 更改时间进度
              // eslint-disable-next-line
              _this.wxAudioCurrent.innerText = _this.formartTime(_this.wxAudio.currentTime)
              _this.showLoading(false)
            }
          },
          // 页面点击事件
          _this.wxAudioStateImg.onclick = function () {
            _this.audioPlayPause()
          }

          _this.wxAudioOrigin.onmousedown = function (event) {
            _this.isDrag = true
            var e = event || window.event
            var x = e.clientX
            var l = event.target.offsetLeft
            _this.maxProgressWidth = _this.wxAudioDetail.offsetWidth
            _this.wxAudioC.onmousemove = function (event) {
              if (_this.isDrag) {
                var e = event || window.event
                var thisX = e.clientX
                // eslint-disable-next-line
                _this.dragProgressTo = Math.min(_this.maxProgressWidth, Math.max(0, l + (thisX - x)))
                _this.updatePorgress()
              }
            }
            _this.wxAudioC.onmouseup = function () {
              if (_this.isDrag) {
                _this.isDrag = false
                // eslint-disable-next-line
                _this.wxAudio.currentTime = Math.floor(_this.dragProgressTo / _this.maxProgressWidth * _this.durationT)
              }
            }

            _this.wxAudioC.onmouseleave = function () {
              if (_this.isDrag) {
                _this.isDrag = false
                // eslint-disable-next-line
                _this.wxAudio.currentTime = Math.floor(_this.dragProgressTo / _this.maxProgressWidth * _this.durationT)
              } else {

              }
            }
          }

          _this.wxAudioOrigin.ontouchstart = function (event) {
            _this.isDrag = true
            var e = event || window.event
            var x = e.touches[0].clientX
            var l = e.target.offsetLeft

            _this.maxProgressWidth = _this.wxAudioDetail.offsetWidth
            // eslint-disable-next-line
            _this.wxAudioC.ontouchmove = function (event) {
              if (_this.isDrag) {
                var e = event || window.event
                var thisX = e.touches[0].clientX
                // eslint-disable-next-line
                _this.dragProgressTo = Math.min(_this.maxProgressWidth, Math.max(0, l + (thisX - x)))
                _this.updatePorgress()
              }
              // eslint-disable-next-line
            },
            _this.wxAudioC.ontouchend = function () {
              if (_this.isDrag) {
                _this.isDrag = false
                // eslint-disable-next-line
                _this.wxAudio.currentTime = Math.floor(_this.dragProgressTo / _this.maxProgressWidth * _this.durationT)
              } else {

              }
            }
          }

          _this.wxAudioDetail.onclick = function (event) {
            var e = event || window.event
            var l = e.layerX
            var w = _this.wxAudioDetail.offsetWidth
            _this.wxAudio.currentTime = Math.floor(l / w * _this.durationT)
          }
        },

        updatePorgress: function () {
          this.wxAudioOrigin.style.left = this.dragProgressTo + 'px'
          this.wxVoiceP.style.width = this.dragProgressTo + 'px'
          // eslint-disable-next-line
          var currentTime = Math.floor(this.dragProgressTo / this.maxProgressWidth * this.durationT)
          this.wxAudioCurrent.innerText = this.formartTime(currentTime)
        },

        formartTime: function (seconds) {
          var formatNumber = function (n) {
            n = n.toString()
            return n[1] ? n : '0' + n
          }
          var m = Math.floor(seconds / 60)
          var s = Math.floor(seconds % 60)
          return formatNumber(m) + ':' + formatNumber(s)
        },

        extend: function (o, n, override) {
          for (var key in n) {
            if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
              o[key] = n[key]
            }
          }
          return o
        }
      }

      window.Wxaudio = Wxaudio
    })(window, document)

    const {idTag, audioUrl} = this.props
    // eslint-disable-next-line
    var wxAudio = new Wxaudio({
      ele: '#' + idTag,
      src: audioUrl,
      width: '100%'
    })
  }
  render () {
    const {idTag} = this.props
    return (
      <div>
        <div id={idTag} />
        <style global jsx>{`
          .wx-audio-content {
            -moz-user-select: -moz-none;
            -ms-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            width: 300px;
            height: auto;
            padding: 8px 10px;
            border: 1px solid rgba(33, 44, 55, 0.3);
            margin: 1rem auto;
            font-size: 0;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
          }
          .wx-audio-content .wx-audio-info {
            display: none;
          }
          .wx-audio-content .wx-audio-left {
            display: inline-block;
            vertical-align: middle;
            *vertical-align: auto;
            *zoom: 1;
            *display: inline;
            width: 42px;
            height: 100%;
          }
          .wx-audio-content .wx-audio-left .wx-audio-state {
            width: 100%;
            height: 100%;
          }
          .wx-audio-content .wx-audio-right {
            display: inline-block;
            vertical-align: middle;
            *vertical-align: auto;
            *zoom: 1;
            *display: inline;
            width: calc(100% - 42px);
            font-size: 16px;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            padding-left: 10px;
          }
          .wx-audio-content .wx-audio-right .wx-audio-title {
            padding-bottom: 6px;
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            white-space: nowrap;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
          }
          .wx-audio-content .wx-audio-right .wx-audio-disc {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            -ms-text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            padding-bottom: 10px;
            font-size: 12px;
            color: #8c8c8c;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees {
            height: 2px;
            width: calc(100% - 4px);
            position: relative;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-progrees-detail {
            height: 100%;
            width: 100%;
            background: #ebebeb;
            position: relative;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            -moz-user-select: -moz-none;
            -ms-user-select: none;
            -webkit-user-select: none;
            user-select: none;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-progrees-detail .wx-voice-p {
            width: 0%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            background: #09bb07;
            z-index: 2;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-progrees-detail .wx-buffer-p {
            width: 0%;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
            background: #d9d9d9;
            z-index: 1;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-progrees-detail .wx-loading {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            overflow: hidden;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-progrees-detail .wx-loading .wx-loading-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            -moz-animation: slidein 6s linear infinite normal;
            -webkit-animation: slidein 6s linear infinite normal;
            animation: slidein 6s linear infinite normal;
            width: 200%;
            max-width: none !important;
            background-image: -moz-repeating-linear-gradient(-15deg, #d9d9d9, #d9d9d9 2px, #ebebeb 2px, #ebebeb 4px);
            background-image: -webkit-repeating-linear-gradient(-15deg, #d9d9d9, #d9d9d9 2px, #ebebeb 2px, #ebebeb 4px);
            background-image: repeating-linear-gradient(-15deg, #d9d9d9, #d9d9d9 2px, #ebebeb 2px, #ebebeb 4px);
          }
          @keyframes slidein {
            0% {
              -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
              -moz-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
              transform: translateX(-50%);
            }
            100% {
              -moz-transform: translateX(0);
              -ms-transform: translateX(0);
              -webkit-transform: translateX(0);
              transform: translateX(0);
              -moz-transform: translateX(0);
              -ms-transform: translateX(0);
              -webkit-transform: translateX(0);
              transform: translateX(0);
            }
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-audio-origin {
            width: 6px;
            height: 6px;
            margin-top: -3px;
            margin-left: 0;
            border-radius: 50%;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            background-color: #09bb07;
            position: absolute;
            left: 0;
            top: 50%;
            z-index: 2;
          }
          .wx-audio-content .wx-audio-right .wx-audio-progrees .wx-audio-origin:before {
            content: " ";
            display: block;
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            -moz-border-radius: 50%;
            -webkit-border-radius: 50%;
            background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNDAlIj48c3RvcCBvZmZzZXQ9IjIwJSIgc3RvcC1jb2xvcj0iIzA5YmIwNyIgc3RvcC1vcGFjaXR5PSIwLjMiLz48c3RvcCBvZmZzZXQ9IjQwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjwvc3ZnPiA=');
            background: -moz-radial-gradient(rgba(9, 187, 7, 0.3) 20%, rgba(0, 0, 0, 0) 40%);
            background: -webkit-radial-gradient(rgba(9, 187, 7, 0.3) 20%, rgba(0, 0, 0, 0) 40%);
            background: radial-gradient(rgba(9, 187, 7, 0.3) 20%, rgba(0, 0, 0, 0) 40%);
            top: 50%;
            margin-top: -12px;
            margin-left: -9px;
            cursor: pointer;
            outline: 0;
            -webkit-tap-highlight-color: transparent;
          }
          .wx-audio-content .wx-audio-right .wx-audio-time {
            width: 100%;
            padding-top: 6px;
            height: auto;
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: space-between;
            justify-content: space-between;
            overflow: hidden;
          }
          .wx-audio-content .wx-audio-right .wx-audio-time span {
            font-size: 12px;
            color: #8c8c8c;
          }
          
        `}</style>
      </div>

    )
  }
}
