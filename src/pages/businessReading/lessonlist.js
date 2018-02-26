import React from 'react'
import {Link} from 'react-router-dom'
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
      lessonList: [],
      isRender: true
    }
  }

  componentDidMount = async () => {
    let {stageId} = this.props.match.params
    this.loadData(stageId)
  }

  loadData = async (stageId) => {
    try {
      const lessonList = await AxiosUtil.get('/api/business-english/getListByStageId/' + stageId)
      this.setState({
        lessonList: lessonList,
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
    const {lessonList} = this.state
    return lessonList.map((item, index) => {
      return (
        <li className='line' key={index} onClick={e => this.openHandle(e, item)}>
          <Link to={`/pages/businessReading/guide/1/${item.id}`}>
            <div className={'block ' + (!item.over && 'gray')}>
              <h4 className='title'>{item.name}</h4>
              <p className='title-en'>{item.titleEn}</p>
            </div>
          </Link>
          <style jsx>{`
            .line {
              box-shadow: 2px 2px 20px 5px #f0f0f0;
              padding: 15px;
              margin: 15px 0;
              border-radius: 8px;
            }
            .block {
            }
            .title {
              font-size: 16px;
            }
            .arrow {
              width: 14px;
            }
            .title-en {
              font-size: 12px;
            }
            .gray {
              color: #adadad;
            }
          `}</style>
        </li>
      )
    })
  }

  render () {
    const {lessonList, isRender} = this.state
    if (DataUtil.isEmpty(lessonList) && isRender) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <h3 className='title'>我的阅读历史</h3>
            <ul className='cblock'>
              {!DataUtil.isEmpty(lessonList) && this.renderList()}
              {DataUtil.isEmpty(lessonList) && !isRender &&
                <NoData>暂无阅读历史哦</NoData>
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
