import React from 'react'
import {Link} from 'react-router-dom'
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
      words: []
    }
  }

  componentDidMount = async () => {
    let {stageId, lessonId} = this.props.match.params
    this.loadData(stageId, lessonId)
  }

  loadData = async (stageId, lessonId) => {
    try {
      const words = await AxiosUtil.get('/api/business-english/getWordsByLessonId/' + lessonId)
      this.setState({
        words: words,
        stageId: stageId,
        lessonId: lessonId
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  renderList () {
    const {words} = this.state
    return words.map((item, index) => {
      return (
        <li className='line' key={index}>
          <div className='left'>
            <p className='words'>{item.word} &nbsp; {item.phonogram}</p>
            <p className='words-cn'><i>{item.nominal}</i>{item.nominal && '. '}{item.translate}</p>
          </div>
          <div className='right'>
            <Audio src={item.audio} />
          </div>
          <style jsx>{`
            .line {
              width: 100%;
              border-bottom: 1px solid #e3e3e3;
              display: table;
              font-size: 13px;
              margin: 10px 0;
              padding: 8px 0;
            }
            .left, .right {
              display: table-cell;
              vertical-align: middle;
              width: 100%;
            }
            .words {
              color: #2BC1FF;
              font-weight: 600;
            }
          `}</style>
        </li>
      )
    })
  }

  render () {
    const {words, stageId, lessonId} = this.state
    if (DataUtil.isEmpty(words)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <Title>Key Words</Title>
            <div className='cblock'>
              <ul>
                {this.renderList()}
              </ul>
            </div>
          </div>
          <div className='wx-text-center margin25'>
            <Link to={`/pages/businessReading/guide/${stageId}/${lessonId}`}>
              <Button className='businessReading-btn'>开始阅读</Button>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .block {
            box-shadow: 2px 2px 20px 5px #f0f0f0;
            margin: 0 12px 25px;
            padding: 25px;
          }
        `}</style>
      </Layout>
    )
  }
}
