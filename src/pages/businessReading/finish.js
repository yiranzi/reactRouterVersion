import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../containers/businessReading/layout'
import Footer from '../../containers/businessReading/footer'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import SharePop from '../../containers/businessReading/sharePop'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      result: {},
      scores: [],
      lessonId: undefined,
      haveRefresh: false
    }
  }

  componentDidMount = async () => {
    let {lessonId} = this.props.match.params
    this.loadCompleteData(lessonId)
    this.setState({
      haveRefresh: true,
      lessonId: lessonId
    })
  }

  componentWillUnmount = ()=> {
    // ios因为刷新后，需要重新分享功能,否则一直拥有分享功能
    // eslint-disable-next-line
    wx.hideAllNonBaseMenuItem()
  }

  loadCompleteData = async (lessonId) => {
    try {
      lessonId = lessonId || 1
      const result = await AxiosUtil.get('/api/business-english/getCompleteByLessonId/' + lessonId)
      result.answerDTOList.map((item, index) => {
        this.state.scores[item.id] = item.answer
      })

      this.setState({result: result})
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderHeader () {
    const {result} = this.state
    const answered = result.answerDTOList.length !== 0
    const color = answered ? 'blue' : 'gray'
    let imgSrc = '/static/img/learn/reading/success_gray_big2.png'
    if (answered) {
      imgSrc = '/static/img/learn/reading/success_big2.png'
    }
    return (
      <div className='wx-text-center'>
        <img className='head-img' src={imgSrc} />
        <p className={'title ' + color}>今日阅读{answered ? '已完成' : '未完成'}</p>
        <style jsx>{`
          .head-img {
            width: 80px;
          }
          .title {
            margin: 10px;
          }
          .blue {
            color: #2BC1FE;
          }
          .gray {
            color: #565656;
          }
        `}</style>
      </div>
    )
  }

  renderLessonInfo () {
    const {result, scores} = this.state
    const resElements = result.topicDTOList.map((item, index) => {
      const img = scores[item.no] === item.answer ? '/static/img/learn/reading/right2.png' : '/static/img/learn/reading/wrong2.png'
      return (<div className='wx-text-center' key={index}>
        {item.no}<br />
        <img className='exam-val' src={img} />
        <style jsx>{`
          .wx-text-center {
            display: table-cell;
            vertical-align: middle;
          }
          .exam-val {
            width: 25px;
            margin-top: 10px;
          }
        `}</style>
      </div>)
    })
    return (
      <div className='block'>
        <h4 className='title'>{result.title}</h4>
        <div className='result-block'>
          {resElements}
        </div>
        <div className='info-block'>
          <div className='wx-text-center result-info first'>
            <h4>今日已读</h4>
            <p><b>{result.todayWords}</b> words</p>
          </div>
          <div className='wx-text-center result-info'>
            <h4>全部已读</h4>
            <p><b>{result.totalWords}</b> words</p>
          </div>
        </div>
        <style jsx>{`
          .block {
            box-shadow: 2px 2px 20px 5px #f0f0f0;
            border-radius: 15px;
            padding: 15px 15px 5px;
            margin: 30px 0;
          }
          .title {
            font-size: 16px;
          }
          .result-block {
            border: solid #ECECEC;
            border-width: 1px 0;
            padding: 10px 0;
            margin-top: 10px;
            display: table;
            width: 100%;
          }
          .info-block {
            display: table;
            width: 100%;
            padding: 15px 0;
          }
          .result-info {
            display: table-cell;
            vertical-align: middle;
            margin: 10px;
            font-size: 13px;
            line-height: 26px;
          }
          .first {
            border-right: 1px solid #ECECEC;
          }
        `}</style>
      </div>
    )
  }

  renderKnowledgeInfo () {
    const {result} = this.state
    const knowledgesElements = result.knowledgeList.map((item, index) => {
      if (item === null) return
      return (
        <dd className='block' key={index}>
          <div className='item'>
            <span className='left'><img className='icon' src='/static/img/learn/reading/success2.png' /></span>
            <p className='content'>{item}</p>
          </div>
          <style jsx>{`
            .block {
              line-height: 32px;
            }
            .item {
              display: table;
            }
            .content {
              display: table-cell;
              vertical-align: middle;
              font-size: 13px;
              padding-left: 10px;
              width: 100%;
            }
            .left {
              display: table-cell;

            }
            .icon {
              width: 16px;
              vertical-align: text-top;
            }
          `}</style>
        </dd>
      )
    })
    return (
      <dl className='content'>
        <dt><h3 className='title'>今日知识账单：</h3></dt>
        <div className='block'>
          {knowledgesElements}
          <a href={result.knowledge}>
            <h4 className='wx-text-center link'>点击查看知识导图</h4>
          </a>
        </div>
        <style jsx>{`
          .block {
            box-shadow: 2px 2px 20px 5px #f0f0f0;
            border-radius: 15px;
            padding: 25px 15px 15px;
            margin: 20px 0;
          }
          .title {
            padding: 0 15px;
            font-size: 16px;
          }
          .link {
            border-top: 1px solid #ECECEC;
            padding-top: 10px;
            margin-top: 10px;
          }
        `}</style>
      </dl>
    )
  }

  renderOptions (optionDTOList, answer) {
    return optionDTOList.map((item, index) => {
      return (
        <li className={'block ' + (item.tag === answer ? 'right' : '')} key={index}>
          <span className='left'><i className='checkbox' /></span>
          <p className='option'><span dangerouslySetInnerHTML={{__html: ToolsUtil.replaceAll(item.content, '\n', '<br />')}} /></p>
          <style jsx>{`
          .block {
            display: table;
            margin: 15px 0;
          }
          .left {
            display: table-cell;
          }
          .checkbox {
            width: 13px;
            height: 12px;
            border-radius: 10px;
            background-color: #565656;
            margin-right: 12px;
            display: block;
          }
          .option {

          }
          .right {
            color: #2BC1FF;
          }
          .right .checkbox {
            background-color: #2BC1FF;
          }
        `}</style>
        </li>
      )
    })
  }

  renderAnalysis () {
    const {result} = this.state
    const topicElements = result.topicDTOList.map((item, index) => {
      return (
        <dd className='item' key={index}>
          <p className='question'>{item.no}、<span dangerouslySetInnerHTML={{__html: ToolsUtil.replaceAll(item.question, '\n', '<br />')}} /></p>
          <ul>
            {this.renderOptions(item.optionDTOList, item.answer)}
          </ul>
          <p className='analysis'>{item.analysis}</p>
          <style jsx>{`
            .item {
              box-shadow: 2px 2px 20px 5px #f0f0f0;
              border-radius: 15px;
              padding: 25px 15px 15px;
              margin: 20px 0;
              font-size: 16px;
            }
            .analysis {
              font-size: 14px;
            }
          `}</style>
        </dd>
      )
    })
    return (
      <dl className='block'>
        <dt><h3 className='title'>今日解析：</h3></dt>
        {topicElements}
        <style jsx>{`
          .block {
            margin: 25px 0;
          }
          .title {
            padding: 0 15px;
            font-size: 16px;
          }
        `}</style>
      </dl>
    )
  }

  render () {
    const {result, haveRefresh} = this.state
    if (DataUtil.isEmpty(result) || !haveRefresh) { return <Loading /> }
    // 只有当日的finish 才开启分享
    return (
      <Layout canShare={result.nowLesson}>
        <div className='content'>
          {result.nowLesson && <SharePop lessonId={this.state.lessonId} shareInfo={this.state.result} />}
          <div className='block'>
            {this.renderHeader()}
            {/*样式有误*/}
            {/*{this.renderLessonInfo()}*/}
            {/*{this.renderKnowledgeInfo()}*/}
            {this.renderAnalysis()}
          </div>
          <Footer type='today' />
        </div>
        <style jsx>{`
          .block {
            padding: 25px 12px;
          }
        `}</style>
      </Layout>
    )
  }
}
