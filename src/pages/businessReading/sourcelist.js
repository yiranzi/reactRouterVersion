import React from 'react'
import {Link} from 'react-router-dom'
import Layout from '../../containers/businessReading/layout'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sourceList: []
    }
  }

  componentDidMount = async () => {
    let {stageId} = this.props.match.params
    this.loadData(stageId)
  }

  loadData = async (stageId) => {
    const sourceList = await AxiosUtil.get(`/api/business-english/getSourceListByStageId/${stageId}`)
    this.setState({
      sourceList: sourceList
    })
  }

  renderList () {
    const {sourceList} = this.state
    return sourceList.map((item, index) => {
      return (
        <li className='line' key={index}>
          <Link href={`/businessReading/source?lessonId=${item.id}`}>
            <a>
              <div className='block'>
                <div className='left rich-text'>
                  <h4 className='title'>{item.name}</h4>
                </div>
              </div>
              <p className='knowledge'>{item.titleEn}</p>
            </a>
          </Link>
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
            .knowledge {
              font-size: 12px;
              padding-right: 20px;
            }
          `}</style>
        </li>
      )
    })
  }

  render () {
    const {sourceList} = this.state
    if (DataUtil.isEmpty(sourceList)) { return <Loading /> }
    return (
      <Layout>
        <div className='content'>
          <div className='block'>
            <h3 className='title'>原文朗读</h3>
            <ul className='cblock'>
              {this.renderList()}
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
        <style global jsx>{`
          a {
            color: #626262;
          }
        `}</style>
      </Layout>
    )
  }
}
