import React from 'react'
import GroupCard from '../../abilitycollege/buygether/groupcard'
import Button from '../../../xz-components/button'
/**
 * 其他人的拼团的浏览
 * 获得数据后需要设置自动刷新间隔
 * 具有自己的生命周期。应该在销毁的时候关闭timer
 */
export default class extends React.Component {
  groupLength = 4 // 列表长度
  changeInterval = 4000 // 切换间隔

  constructor (props) {
    super(props)
    this.state = {
      otherGroup: {}
    }
    this.refreshGroup = this.refreshGroup.bind(this)
  }

  componentDidMount = async () => {
    await this.setState({
      otherGroup: this.props.otherGroup
    })
    this.setRenderOtherGroupInterval()
  }

  // otherGroup 列表自动刷新
  setRenderOtherGroupInterval () {
    // 如果可供参团大于一次展示的数量
    if (this.state.otherGroup.length > this.groupLength) {
      window.setInterval(this.refreshGroup, this.changeInterval)
    }
  }

  refreshGroup () {
    let {otherGroup} = this.state
    // 将前面的移动到最后
    let popArr = otherGroup.splice(0, this.groupLength)
    otherGroup = otherGroup.concat(popArr)
    this.setState({
      otherGroup: otherGroup
    })
  }

  render () {
    let {otherGroup} = this.state
    if (otherGroup !== undefined) {
      const perLength = this.groupLength
      let groupingArr = []
      let buttonStyle = {
        backgroundColor: '#F9F9F9',
        color: '#c41616',
        border: '1px solid #c41616',
        fontSize: '14px',
        width: '60px'
      }
      if (otherGroup.length > perLength) {
        // 如果人数多于4个，取出4个渲染
        groupingArr = otherGroup.slice(0, perLength).map((ele, index) => {
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={buttonStyle} onClick={() => { this.props.buyOtherGroup(ele) }}>参团</Button>} />)
        })
      } else if (otherGroup.length > 0) {
        // 如果人数不足4个
        groupingArr = otherGroup.map((ele, index) => {
          return (<GroupCard key={ele.groupId} groupInfo={ele}
            button={<Button style={buttonStyle} onClick={() => { this.props.buyOtherGroup(ele) }}>参团</Button>} />)
        })
      } else {
        // 如果无人
        groupingArr = <img style={{width: '60%'}} src='/static/img/buygether/no_group.png' />
      }
      return (<div className='other-grouping'>
        <h1>拼团进行中</h1>
        {groupingArr}
        <style jsx>{`
          .other-grouping {
            padding: 10px 0px;
            text-align: left;
            {/*border-bottom: 1px solid #e5e5e5;*/}
          }
        `}</style>
      </div>)
    } else {
      return null
    }
  }
}


