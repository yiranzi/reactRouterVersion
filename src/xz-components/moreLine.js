import React from 'react'
import ThemeConfig from '../config/theme'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      style: {},
      isShow: false
    }
    this.clickTitle = this.clickTitle.bind(this)
  }
  componentDidMount () {
  }

  clickTitle () {
    let {isShow} = this.state
    if (isShow) {
      this.setState({
        isShow: false,
        style: {
          height: '0px'
        }
      })
    } else {
      this.setState({
        isShow: true,
        style: {
          height: 'auto'
        }
      })
    }
  }

  render () {
    const {style} = this.state
    return (
      <div style={this.props.style} className='more' onClick={this.clickTitle}>
        {this.props.title && <div className='title' >
          {this.props.title}
          <span className='arrow'>{this.state.isShow ? '▲' : '▼'}</span>
        </div>}
        <div className='content' style={style}>{this.state.isShow ? this.props.content : ''}</div>
        <style jsx>{`
          .more {
            {/*background-color: ${ThemeConfig.color.gray};*/}
            {/*box-shadow: 0 1px 6px rgba(0,0,0,.2);*/}
            {/*padding: 10px;*/}
            {/*border-radius: 10px;*/}
            {/*line-height: 24px;*/}
          }
          .more .title {
            font-size: 14px;
            color: #242223;
            display: flex;
            justify-content: space-between;
          }
          .more .title .arrow{
            flex: none
          }
          .more .content {
            background-color: ${ThemeConfig.color.gray};
            font-size: 14px;
            transition: height 1s;
            overflow: hidden;
            color: #646464;
          }
        `}</style>
      </div>
    )
  }
}
