import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const {height} = this.props
    this.state = {
      needShowBotton: false,
      style: {
        maxHeight: height,
        height: height,
        overflowY: 'hidden'
      },
      isShow: false
    }
  }
  componentDidMount () {
    let content = this.refs.content
    let clientHeight = content.clientHeight // 期望展示高度
    let contentHeight = content.children[0].clientHeight // 实际内容高度
    console.log('content: ', content)
    console.log('clientHeight:', clientHeight)
    console.log('contentHeight:', contentHeight)
    if (contentHeight > clientHeight) {
      this.setState({needShowBotton: true})
    }
  }
  hide () {
    const {height} = this.props
    this.setState({
      isShow: false,
      style: {
        maxHeight: height,
        height: height,
        overflowY: 'hidden'
      }
    })
  }
  showAll () {
    this.setState({
      isShow: true,
      style: {
        height: 'auto'
      }
    })
  }

  renderButton () {
    const { isShow } = this.state
    return (
      <div className='show-all'>
        {isShow && <span onClick={() => { this.hide() }}>收起</span>}
        {!isShow && <span onClick={() => { this.showAll() }}>查看全部</span>}
        <style jsx>{`
          .show-all {
            text-align: right;
          }
          .show-all span {
            color: #117ee9;
            border: 1px solid #117ee9;
            border-radius: 1rem;
            padding: 0.2rem 0.5rem;
          }
        `}</style>
      </div>
    )
  }

  render () {
    const {style, needShowBotton} = this.state
    return (
      <div className='more'>
        <div className='title'>{this.props.title}</div>
        <div className='content' style={style} ref='content'><div>{this.props.children}</div></div>
        {needShowBotton && this.renderButton()}
        <style jsx>{`
          .more {
            background-color: ${ThemeConfig.color.gray};
            box-shadow: 0 1px 6px rgba(0,0,0,.2);
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 10px;
          }
          .more .title {
            font-size: ${ThemeConfig.size.normal};
            font-weight: bold;
            color: #242223;
          }
          .more .content {
            margin: 1rem 0;
            color: #646464;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            word-break:break-all;
          }
        `}</style>
      </div>
    )
  }
}
