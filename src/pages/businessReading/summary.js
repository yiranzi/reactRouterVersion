import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../containers/businessReading/layout'
import Footer from '../../containers/businessReading/footer'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DateUtil from '../../util/date'
// import Router from 'next/router'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      summary: {}
    }
  }

  componentDidMount () {
    let stageId = ToolsUtil.getQueryString('stageId')
    let lessonId = ToolsUtil.getQueryString('lessonId')
    this.loadData(stageId, lessonId)
  }

  loadData = async (stageId, lessonId) => {
    try {
      stageId = stageId || 1
      let url = '/api/business-english/getByStageId/' + stageId
      if (lessonId) {
        url += '/' + lessonId
      }
      const summary = await AxiosUtil.get(url)
      this.setState({summary: summary})
    } catch (e) {
      if (e.status === 10003) {
        console.log('replace /course/forFree?courseId=101&packageId=2286')
        // Router.replace('/course/forFree?courseId=101&packageId=2286')
      }
      this.setState({
        error: e.message
      })
    }
  }

  render () {
    const {summary} = this.state
    if (DataUtil.isEmpty(summary)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='summary-img-block'>
            <img className='summary-img' src={summary.banner} />
          </div>
          <div className='block'>
            <h4 className='wx-clearfix date-lesson'>
              <span className='wx-pull-left'>{DateUtil.formatMonth(summary.day)} {summary.day && DateUtil.format(summary.day, 'dd') + ','} {DateUtil.formatDay(summary.day)}</span>
              <span className='wx-pull-right'>{summary.lessonName}</span>
            </h4>
            <Link to={'/businessReading/keywords?stageId=' + summary.stageId + '&lessonId=' + summary.lessonId}>
              <div className='cblock yellow'>
                <div className='left'>
                  <span className='title'>生词</span>
                  <span className='tips'>{summary.words && summary.words + ' key words'}</span>
                </div>
                <div className='right'>
                  <img className='arrow-img' src='/static/img/learn/reading/arrow2.png' />
                </div>
              </div>
            </Link>
            <Link to={'/businessReading/guide?stageId=' + summary.stageId + '&lessonId=' + summary.lessonId}>
              <div className='cblock blue'>
                <div className='left'>
                  <p>
                    <span className='title'>阅读</span>
                    <span className='tips'>{summary.lessonWords && summary.lessonWords + ' words'}</span>
                  </p>
                  <p className='tips'>{summary.lessonTitle}</p>
                </div>
                <div className='right'>
                  <img className='arrow-img' src='/static/img/learn/reading/arrow2.png' />
                </div>
              </div>
            </Link>
          </div>
          <Footer type='today' />
        </div>
        <style jsx>{`
          .summary-img-block {
            min-height: 180px;
          }
          .summary-img {
            width: 100%;
            height: auto;
          }
          .date-lesson {
            padding: 0 15px;
            font-size: 13px;
            font-weight: normal;
          }
          .block {
            padding: 30px 25px;
          }
          .cblock {
            color: #fff;
            height: 100px;
            width: 100%;
            margin: 10px 0 20px;
            padding: 15px 0;
            border-radius: 8px;
            display: table;
          }
          .left, .right {
            display: table-cell;
            vertical-align: middle;
            padding: 0 15px;
            width: 100%;
          }
          .yellow {
            background-color: #F5B200;
          }
          .blue {
            background-color: #2BC1FF;
          }
          .arrow-img {
            width: 8px;
          }
          .title {
            font-size: 24px;
            font-weight: 600;
            margin-right: 20px;
          }
          .tips {
            font-size: 12px;
          }
        `}</style>
      </Layout>
    )
  }
}
