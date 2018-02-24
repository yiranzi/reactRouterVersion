import React from 'react'
import classNames from 'classnames'
import BusinessReading from '../../config/businessReading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showCn: {}
    }
  }
  renderShowCn (index) {
    return (
      <div className='show-cn wx-text-center' onClick={() => { this.toggleCn(index) }}>
        <div className='text'>显示翻译<img src='/static/img/businessReading/arrow-down.png' /></div>
        <style jsx>{`
          .show-cn {
            position: relative;
            color: ${BusinessReading.color.gray_content};
          }
          .show-cn img {
            height: 0.5rem;
            margin-left: 0.5rem;
          }
          .show-cn .text {
            display: inline-block;
            background-color: #fff;
            padding: 0 0.5rem;
            font-size: 14px;
          }
          .show-cn::after {
            content: '';
            width: 100%;
            border-bottom: 0.5px solid #e3e3e3;
            position: absolute;
            left: 0;
            top: 50%;
            z-index: -1;
          }
        `}</style>
      </div>
    )
  }
  renderHideCn (index) {
    return (
      <div className='hide-cn wx-text-center' onClick={() => { this.toggleCn(index) }}>
        <div className='text'>隐藏翻译<img src='/static/img/businessReading/arrow-up.png' /></div>
        <style jsx>{`
          .hide-cn {
            position: relative;
            color: ${BusinessReading.color.gray_content};
          }
          .hide-cn .text {
            display: inline-block;
            background-color: #fff;
            padding: 0 0.5rem;
            font-size: 14px;
          }
          .hide-cn::after {
            content: '';
            width: 100%;
            border-bottom: 0.5px solid #e3e3e3;
            position: absolute;
            left: 0;
            top: 50%;
            z-index: -1;
          }
          .hide-cn img {
            height: 0.5rem;
            margin-left: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
  toggleCn (index) {
    let { showCn } = this.state
    showCn[index] = !showCn[index]
    this.setState({
      showCn: showCn
    }, () => {
      this.props.caculateOffset()
    })
  }
  render () {
    const {currentSentence, content, contentDTOList} = this.props
    const { showCn } = this.state
    return (
      <article>
        <div className='en-title'>{content.titleEn}</div>
        <div className='cn-title'>{content.titleCn}</div>
        <div className='author-date'>{content.author}</div>
        {contentDTOList.map((item, index) => {
          return (
            <section key={`section_${index}`}>
              <p
                className={classNames(`item en sentence-${index + 1}`, {current: currentSentence === index + 1})}
                start={item.start}
                onClick={() => { this.props.setCurrentSentence(index + 1, item.start) }}
              >{item.contentEn}</p>
              {showCn[index] && this.renderHideCn(index)}
              {!showCn[index] && this.renderShowCn(index)}
              {showCn[index] && <p className='cn'>{item.contentCn}</p>}
            </section>
          )
        })}
        <style jsx>{`
          article {
            font-size: 18px;
            word-wrap: break-word;
            padding: 1rem;
            line-height: 180%;
          }
          .en-title,
          .cn-title {
            font-size: ${BusinessReading.size.large};
            font-weight: bold;
          }
          .author-date {
            margin-bottom: 1.5rem;
            color: ${BusinessReading.color.dark_content};
            font-size: 14px;
          }
          section {
            margin-bottom: 2rem;
          }
          .current {
            color: #2bc1ff;
          }
          .cn {
            color: ${BusinessReading.color.gray_content};
            font-size: 14px;
          }
        `}</style>
      </article>
    )
  }
}