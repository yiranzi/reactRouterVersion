import React from 'react'
import Link from 'next/link'
import Layout from '../../containers/businessReading/layout'
import Title from '../../containers/businessReading/title'
import AxiosUtil from '../../util/axios'
import Button from '../../xz-components/button'
import Audio from '../../xz-components/businessCommon'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stageId: '',
      lessonId: '',
      knowledges: [],
      audioState: [],
      testStatus: false
    }
  }

  componentDidMount = async () => {
    let stageId = ToolsUtil.getQueryString('stageId')
    let lessonId = ToolsUtil.getQueryString('lessonId')
    this.loadData(stageId, lessonId)
    this.loadTestStatus(lessonId)
  }

  loadData = async (stageId, lessonId) => {
    try {
      const knowledges = await AxiosUtil.get('/api/business-english/getKnowledgeByLessonId/' + lessonId)
      this.setState({
        knowledges: knowledges,
        stageId: stageId,
        lessonId: lessonId
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  loadTestStatus = async (lessonId) => {
    try {
      const testStatus = await AxiosUtil.get('/api/business-english/getTestStatus/' + lessonId)
      this.setState({
        testStatus: testStatus
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  audioHandle (e, index) {
    const {audioState} = this.state
    let _audioState = []
    if (!audioState[index]) {
      _audioState[index] = true
    }
    this.setState({
      audioState: _audioState
    })
  }

  renderList () {
    const {knowledges, audioState} = this.state
    return knowledges.map((item, index) => {
      return (
        <div className='item' key={index}>
          <div className='left rich-text'>
            <div className='knowledge' dangerouslySetInnerHTML={{__html: item.content}} />
          </div>
          <div className='right'>
            <Audio src={item.audio} isplaying={audioState[index]} onClick={e => this.audioHandle(e, index)} />
          </div>
          <style jsx>{`
            .item {
              padding: 15px;
              background: url(/static/img/businessReading/fill.png);
              border-radius: 4px;
              margin-top: 20px;
              margin-right: 18px;
              padding-right: 30px;
              position: relative;
            }
            .item::after {
              content: '';
              background: url(/static/img/businessReading/shadow.png);
              width: 14px;
              height: 46px;
              position: absolute;
              right: -14px;
              top: 50%;
              transform: translateY(-50%);
            }
            .right {
              position: absolute;
              right: -6px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 1;
            }
          `}</style>
        </div>
      )
    })
  }

  render () {
    const {knowledges, stageId, lessonId, testStatus} = this.state
    if (DataUtil.isEmpty(knowledges)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <Title>商业知识讲解</Title>
            <div className='cblock'>
              {this.renderList()}
            </div>
          </div>
          <div className='wx-text-center margin25'>
            {!testStatus &&
              <Link href={`/pages/businessReading/finish?stageId=' + stageId + '&lessonId=' + lessonId}>
                <a>
                  <Button className='businessReading-btn'>查看成绩</Button>
                </a>
              </Link>
            }
            {testStatus &&
              <Link href={`/pages/businessReading/test?stageId=' + stageId + '&lessonId=' + lessonId}>
                <a>
                  <Button className='businessReading-btn'>读完了，去做题</Button>
                </a>
              </Link>
            }
          </div>
        </div>
        <style jsx>{`
          .block {
            padding: 25px 10px;
          }
        `}</style>
      </Layout>
    )
  }
}
