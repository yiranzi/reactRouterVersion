import React from 'react'
// import Router from 'next/router'
import Layout from '../../containers/businessReading/layout'
import Title from '../../containers/businessReading/title'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../xz-components/loadingicon'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stageId: '',
      lessonId: '',
      tests: {},
      showNo: 1,
      topicCount: 0,
      startTime: new Date(),
      answerDTOList: []
    }
  }

  componentDidMount = async () => {
    let {stageId, lessonId} = this.props.match.params
    this.loadData(stageId, lessonId)
  }

  loadData = async (stageId, lessonId) => {
    try {
      const tests = await AxiosUtil.get('/api/business-english/getTestByLessonId/' + lessonId)
      
      this.setState({
        tests: tests,
        stageId: stageId,
        lessonId: lessonId,
        topicCount: tests.topicDTOList.length
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  submit = async () => {
    try {
      await AxiosUtil.post('/api/business-english/complete', {
        lessonId: this.state.lessonId,
        answerDTOList: this.state.answerDTOList,
        time: new Date() - this.state.startTime
      })
      // TODO
      // 需要修改一下
      this.props.history.replace('123')
      // Router.replace('/businessReading/finish?stageId=' + this.state.stageId + '&lessonId=' + this.state.lessonId)
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  selectHandle (e, no, tag) {
    if (!this.state.answerDTOList[no - 1]) {
      this.state.answerDTOList[no - 1] = {}
    }
    this.state.answerDTOList[no - 1].id = no
    this.state.answerDTOList[no - 1].answer = tag
    this.setState({
      answerDTOList: this.state.answerDTOList
    })

    if (Number(no) === this.state.topicCount) {
      this.submit()
    } else {
      const _this = this
      setTimeout(function () {
        _this.setState({
          showNo: Number(no) + 1
        })
      }, 500)
    }
  }

  renderOptions (optionDTOList, no) {
    const {answerDTOList} = this.state
    if (optionDTOList) {
      return optionDTOList.map((item, index) => {
        return (
          <dd className={'line ' + ((answerDTOList[no - 1] && answerDTOList[no - 1].answer === item.tag) ? 'selected' : '')}
            key={index} onClick={(e) => this.selectHandle(e, no, item.tag)}>
            <span className='left'><i className='checkbox' /></span>
            <p className='item'><span dangerouslySetInnerHTML={{__html: ToolsUtil.replaceAll(item.content, '\n', '<br />')}} /></p>
            <style jsx>{`
              .line {
                border: 1px solid #A4E4FF;
                min-height: 28px;
                margin: 10px 0;
                padding: 10px 0;
                font-size: 16px;
                -webkit-transition: 1.5s;
              }
              .line:active {
                -webkit-transform: scale(1.2);
              }
              .selected {
                background-color: #A4E4FF;
              }
              .left {
                display: table-cell;
                vertical-align: middle;
                padding: 12px;
                width: 12px;
              }
              .checkbox {
                width: 12px;
                height: 12px;
                border-radius: 10px;
                background-color: #626262;
                display: block;
              }
              .selected .checkbox {
                background-color: #fff;
              }
              .item {
                display: table-cell;
                vertical-align: middle;
                padding-right: 12px;
              }
            `}</style>
          </dd>
        )
      })
    }
  }

  renderQuestions () {
    const {tests, showNo} = this.state
    if (tests.topicDTOList) {
      return tests.topicDTOList.map((item, index) => {
        return (
          <div className={'cblock ' + (showNo !== Number(item.no) ? 'hide' : '')} key={index}>
            <dl>
              <dt className='question'>{item.no + '/' + tests.topicDTOList.length}、<span dangerouslySetInnerHTML={{__html: ToolsUtil.replaceAll(item.question, '\n', '<br />')}} /></dt>
              {this.renderOptions(item.optionDTOList, item.no)}
            </dl>
            <style jsx>{`
            .hide {
              display: none;
            }
            .question {
              font-size: 16px;
            }
          `}</style>
          </div>
        )
      })
    }
  }

  render () {
    const {tests} = this.state
    if (DataUtil.isEmpty(tests)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <Title>测试</Title>
            {this.renderQuestions()}
          </div>
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
