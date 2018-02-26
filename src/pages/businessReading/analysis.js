import React from 'react'
import Layout from '../../containers/businessReading/layout'
import Loading from '../../components/loading'
import ToolsUtil from '../../util/tools'
import AjaxUtil from '../../util/axios'
import DataUtil from '../../util/data'
import Main from '../../containers/businessReading/main'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: {}
    }
  }
  componentDidMount = async () => {
    let {lessonId} = this.props.match.params
    let content = await AjaxUtil.get(`/api/business-english/getByLessonId/${lessonId}`)
    this.setState({content: content})
  }
  render () {
    const { content } = this.state
    if (DataUtil.isEmpty(content)) { return <Loading /> }
    return (
      <Layout>
        <Main
          matchInfo={this.props.match.params}
          content={content}
          contentDTOList={content.businessEnglishLessonContentDTOList}
          audioSource={content.audio}
          audioDesc='Laila老师中英讲解'
          showTestButton
        />
      </Layout>
    )
  }
}
