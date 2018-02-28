import React from 'react'
import Layout from '../../containers/businessReading/layout'
import NoData from '../../containers/businessReading/nodata'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      knowledgesHistory: [],
      isRender: true
    }
  }

  componentDidMount = async () => {
    let {stageId} = this.props.match.params
    this.loadData(stageId)
  }

  loadData = async (stageId) => {
    try {
      const knowledgesHistory = await AxiosUtil.get('/api/business-english/getKnowledgeHistoryByLessonId/' + stageId)
      this.setState({
        knowledgesHistory: knowledgesHistory,
        isRender: false
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
    }
  }

  openHandle (e, item) {
    item.open = !item.open
    this.setState({})
  }

  renderList () {
    const {knowledgesHistory} = this.state
    return knowledgesHistory.map((item, index) => {
      return (
        <li className='line' key={index} onClick={e => this.openHandle(e, item)}>
          <div className='block'>
            <div className='left rich-text'>
              <h4 className='title'>{item.name}</h4>
            </div>
            <div className='right'>
              {item.open && <img className='arrow' src={'/static/img/businessReading/arrow-up.png'} />}
              {!item.open && <img className='arrow' src={'/static/img/businessReading/arrow-down.png'} />}
            </div>
          </div>
          <p className='knowledge'>{item.titleEn}</p>
          {item.open && <a href={item.knowledge}><img className='knowledge-img' src={item.knowledge} /></a>}
          <style jsx>{`
            .line {
              box-shadow: 2px 2px 20px 5px #f0f0f0;
              padding: 15px;
              margin: 15px 0;
              border-radius: 8px;
            }
            .block {
              display: table;
            }
            .left, .right {
              display: table-cell;
              vertical-align: top;
              width: 100%;
            }
            .title {
              font-size: 16px;
            }
            .arrow {
              width: 14px;
            }
            .knowledge {
              font-size: 12px;
              padding-right: 20px;
            }
            .knowledge-img {
              max-width: 100%;
            }
          `}</style>
        </li>
      )
    })
  }

  render () {
    const {knowledgesHistory, isRender} = this.state
    if (DataUtil.isEmpty(knowledgesHistory) && isRender) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <h3 className='title'>我的知识导图</h3>
            <ul className='cblock'>
              {!DataUtil.isEmpty(knowledgesHistory) && this.renderList()}
              {DataUtil.isEmpty(knowledgesHistory) && !isRender &&
                <NoData>暂无知识账单哦</NoData>
              }
            </ul>
          </div>
        </div>
        <style jsx>{`
          .block {
            margin: 25px 12px;
          }
          .title {
            font-size: 16px;
            text-indent: 12px;
          }
          .cblock {
            list-style: none;
          }
        `}</style>
      </Layout>
    )
  }
}
