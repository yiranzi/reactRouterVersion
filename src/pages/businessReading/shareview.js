import React from 'react'
import AxiosUtil from '../../util/axios'
import ToolsUtil from '../../util/tools'
import DataUtil from '../../util/data'
import Loading from '../../components/loading'
import Layout from '../../containers/businessReading/layout'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      shareInfo: {}
    }
  }

  componentWillMount = async () => {
    let {userId, lessonId, shareKey} = this.props.match.params
    let shareInfo = await AxiosUtil.get(`/api/business-english/getShareResult/${userId}/${lessonId}/${shareKey}`)

    this.setState({
      shareInfo: shareInfo
    })
  }

  render () {
    const {shareInfo} = this.state
    if (DataUtil.isEmpty(shareInfo)) return <Loading />
    const {nickname, headimgurl, readKnowledge, readWords, banner} = shareInfo

    return (
      <Layout>
        <div className='share-page'>
          <img className='bg' src={banner} />
          <div className='user-info wx-space-left'>
            <div className='avatar'><img src={headimgurl} /></div>
            <div className='info'>
              <div className='nickname'><strong>{nickname}</strong></div>
              <div className='read-info'>
                <div className='points'>
                  <p style={{fontSize: '14px'}}>学习商业知识</p>
                  <p><strong>{readKnowledge}</strong> Points</p>
                </div>
                <div className='words'>
                  <p style={{fontSize: '14px'}}>阅读商业英文</p>
                  <p><strong>{readWords}</strong> Words</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .share-page {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
          }
          img.bg {
            width: 100%;
            height: 100%;
          }
          .user-info {
            position: absolute;
            padding-left: 25px;
            padding-right: 25px;
            padding-top: 40px;
          }
          .info {
            margin-left: 1rem;
            color: #fff;
          }
          .info .nickname {
            font-size: 18px;
          }
          .avatar {
            width: 19%; // 为了让文字不换行, 按照iPhone 4 的宽度调的
          }
          .avatar img {
            width: 100%;
            border-radius: 80px;
          }
          .read-info {
            display: flex;
            align-items: center;
          }
          .read-info strong {
            font-size: 20px;
          }
          .words {
            margin-left: 14px;
            padding-left: 14px;
            position: relative;
          }
          .words::before {
            content: '';
            height: 42px;
            width: 1px;
            background-color: #fff;
            position: absolute;
            left: -1px;
            top: 5px;
          }
        `}</style>
      </Layout>
    )
  }
}
