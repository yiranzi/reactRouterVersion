import React from 'react'
import Link from 'next/link'
import Layout from '../../containers/businessReading/layout'
import Footer from '../../containers/businessReading/footer'
import Title from '../../containers/businessReading/title'
import AxiosUtil from '../../util/axios'
import Button from '../../xz-components/button'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'
import Judge from '../../containers/businessReading/judge'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stageId: '',
      lessonId: '',
      guide: {},
      error: {}
    }
  }

  componentDidMount = async () => {
    let stageId = ToolsUtil.getQueryString('stageId') || 1
    let lessonId = ToolsUtil.getQueryString('lessonId')
    this.loadData(stageId, lessonId)
  }

  loadData = async (stageId, lessonId) => {
    try {
      // 如果链接上没有lessonId的参数，那就从接口中获取当前最新的
      if (!lessonId) {
        const stageDetail = await AxiosUtil.get(`/api/business-english/getByStageId/${stageId}`, false)
        lessonId = lessonId || stageDetail.lessonId
      }
      const guide = await AxiosUtil.get('/api/business-english/getByLessonId/' + lessonId, false)
      this.setState({
        guide: guide,
        stageId: stageId,
        lessonId: lessonId
      })
    } catch (e) {
      this.setState({
        error: e
      })
    }
  }

  renderContent () {
    const {guide} = this.state
    return (
      <div className='guide rich-text'>
        <div dangerouslySetInnerHTML={{__html: guide.introduction}} />
        <style jsx>{`
          .guide {
            font-size: 13px;
            margin-bottom: 20px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {guide, stageId, lessonId, error} = this.state
    if (!DataUtil.isEmpty(error)) { return <Judge error={error} /> }
    if (DataUtil.isEmpty(guide)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <div className='title'><img src='/static/img/businessReading/guide_title.png' /></div>
            <div className='cblock'>
              {this.renderContent()}
            </div>
          </div>
          <div className='wx-text-center margin25'>
            <Link href={'/businessReading/analysis?stageId=' + stageId + '&lessonId=' + lessonId}>
              <Button className='businessReading-btn'>开始阅读</Button>
            </Link>
          </div>
          <Footer type='today' />
        </div>
        <style jsx>{`
          .block {
            box-shadow: 2px 2px 20px 5px #f0f0f0;
            margin: 0 12px 25px;
            padding: 25px;
          }
          .title {
            text-align: center;
            margin-bottom: 1rem;
          }
          .title img {
            width: 50%;
          }
        `}</style>
      </Layout>
    )
  }
}
