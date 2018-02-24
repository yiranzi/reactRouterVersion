import React from 'react'
import Source from '../../containers/businessReading/source'
import Audio from '../../xz-components/businessAudio'
import FixFooter from '../../xz-components/fixfooter'
import Button from '../../xz-components/button'
import DataUtil from '../../util/data'
import Link from 'next/link'

export default class extends React.Component {
  position = {}
  currentSentence = 1
  constructor (props) {
    super(props)
    this.state = {
      content: {},
      currentSentence: 0,
      currentT: 0 // 通过父级方法改变当前音频的进度
    }
  }
  componentDidUpdate () {
    // re-render之后，需要重新计算距离
    this.caculateOffset()
  }
  setCurrentSentence (index, start) {
    let currentDiv = document.getElementsByClassName(`sentence-${index}`)[0]
    if (!currentDiv.className.match(/current/)) {
      this.removeClass(document.getElementsByClassName('current')[0], 'current')
    }
    this.setState({
      currentSentence: index,
      currentT: start
    })
  }
  addClass (ele, cls) {
    let className = ele.className
    if (!className.match(cls)) {
      ele.className = className + ' ' + cls
    }
  }
  removeClass (ele, cls, exist) {
    if (ele) {
      let className = ele.className
      // 如果有这个类
      if (className.match(cls)) {
        ele.className = className.replace(' current', '')
      }
    }
  }
  caculateOffset () {
    let position = {}
    let itemDiv = document.getElementsByClassName('item')
    if (!DataUtil.isEmpty(itemDiv)) {
      for (let i = 0; i < itemDiv.length; i++) {
        let item = itemDiv[i]
        position[i + 1] = {
          start: item.getAttribute('start'),
          offsetTop: item.offsetTop
        }
      }
      this.position = {
        'first': itemDiv[0].getAttribute('start'),
        'end': itemDiv[itemDiv.length - 1].getAttribute('start'),
        'content': position
      }
    }
  }
  scrollDis (currentItem) {
    // 把当前句子滚到最中间
    if (currentItem.offsetTop - window.screen.height / 2 > 0 || document.body.scrollTop > currentItem.offsetTop) {
      document.body.scrollTop = currentItem.offsetTop - window.screen.height / 2
    }
  }
  setCurrentT (currentT) {
    let position = this.position
    let {first, end, content} = position

    // 如果第一个没有开始
    if (currentT < first) {
      let currentDiv = document.getElementsByClassName('current')[0]
      if (currentDiv) {
        this.removeClass(currentDiv, 'current')
      }
    } else if (currentT >= end) {
      // 到最后一个了
      let lastPos = Object.keys(content).length
      let lastSentence = document.getElementsByClassName(`sentence-${lastPos}`)[0]

      let className = lastSentence.className

      if (className.match(/current/)) {

      } else {
        // 去掉当前current的样式
        let currentDiv = document.getElementsByClassName('current')[0]
        if (currentDiv) {
          this.removeClass(currentDiv, 'current')
        }
        this.addClass(lastSentence, 'current')
        this.scrollDis(lastSentence)
      }
    } else {
      for (let key in content) {
        let currentItem = content[key]
        let nextKey = (parseInt(key) + 1).toString()
        let nextItem = content[nextKey]
        if (currentT >= currentItem.start && currentT < nextItem.start) {
          // 如果当前这语句有current, 那就不执行了
          let currentSentenceDiv = document.getElementsByClassName(`sentence-${key}`)[0]
          if (!currentSentenceDiv.className.match(/current/)) {
            this.removeClass(document.getElementsByClassName('current')[0], 'current')
            this.addClass(currentSentenceDiv, 'current')
            this.scrollDis(currentItem)
          }
          break
        }
      }
    }
  }
  renderKnowledge () {
    return (
      <div className='wx-text-center'>
        <Link href={`/businessReading/knowledge${location.search}`}>
          <a className='wx-block' >
            <Button
              className='businessReading-btn'
              size='small'
            >
              查看商业知识讲解
            </Button>
          </a>
        </Link>
        <style jsx>{`
          .wx-text-center {
            margin-bottom: 2rem;
          }
        `}</style>
      </div>
    )
  }
  render () {
    const { content, contentDTOList, audioDesc, audioSource, showTestButton } = this.props
    const { currentT, currentSentence } = this.state
    return (
      <div className='main'>
        <div className='banner'><img src={content.contentBanner} /></div>
        <div className='reading-source'>
          <Source
            content={content}
            contentDTOList={contentDTOList}
            currentSentence={currentSentence}
            caculateOffset={() => { this.caculateOffset() }}
            setCurrentSentence={(index, start) => { this.setCurrentSentence(index, start) }}
          />
          {showTestButton && this.renderKnowledge()}
          <FixFooter>
            <Audio
              src={audioSource}
              disc={audioDesc}
              currentT={currentT}
              setCurrentT={(currentT) => { this.setCurrentT(currentT) }}
            />
          </FixFooter>
        </div>
        <style jsx>{`
          .banner img {
            width: 100%;
          }
        `}</style>
        <style global jsx>{`
          .fix-footer {
            padding: 0 !important;
            border-top: none !important;
          }
        `}</style>
      </div>
    )
  }
}
