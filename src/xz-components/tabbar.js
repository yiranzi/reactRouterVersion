import React from 'react'
import PropTypes from 'prop-types'

/**
 * 这是选择bar。用户从多个选项中选择一个选项。不可选，选中，未选中。
 * by yiran
 */

export class TabItem extends React.Component {
  static propTypes = {
    title: PropTypes.object,
    style: PropTypes.object,
    disabled: PropTypes.bool

  }
  static defaultProps = {
    title: '123', // 按钮名称
    style: {}, // 自定义样式
    disabled: false // 禁止选 （禁止选中 需要自己添加上对应的style样式）
  }
}

export class Tabbar extends React.Component {
  static propTypes = {
    defaultActiveKey: PropTypes.number,
    style: PropTypes.object,
    chooseStyle: PropTypes.object,
    onTabClick: PropTypes.func,
    onChange: PropTypes.func
  }

  static defaultProps = {
    defaultActiveKey: -1, // 初始选中
    style: {}, // chooseBar样式
    chooseStyle: {}, // 选中后 chooseItem的样式
    onTabClick: function () {}, // 点击chooseBar的回调
    onChange: function () {} // 选择发生变化的回调
  }

  constructor (props) {
    super(props)
    this.state = {
      currentSelect: -1
    }
    this.onChange = this.onChange.bind(this)
    this.onTabClick = this.onTabClick.bind(this)
    this.renderChooseList = this.renderChooseList.bind(this)
    this.getTabs = this.getTabs.bind(this)
    this.calcStyle = this.calcStyle.bind(this)
    this.objectAssign = this.objectAssign.bind(this)
  }

  // 受控组件根据父组件修改current
  componentWillReceiveProps = (nextProps) => {
    let currentSelect = nextProps.currentSelect
    if (currentSelect !== undefined) {
      // 受控组件。
      if (this.props.currentSelect !== currentSelect) {
        this.setState({
          currentSelect: currentSelect
        })
      }
    }
  }

  // 受控组件根据父组件的current设置初始current
  componentDidMount () {
    if (this.props.currentSelect !== undefined) {
      this.setState({
        currentSelect: this.props.currentSelect
      })
    } else {
      this.setState({
        currentSelect: this.props.defaultActiveKey
      })
    }
  }

  getTabs () {
    return React.Children.map(this.props.children, (c) => {
      return {
        ...c.props
      }
    })
  }

  renderChooseList () {
    let finalStyle
    const tabsData = this.getTabs()
    if (tabsData && tabsData.length > 0) {
      const content = tabsData.map((cProps, index) => {
        finalStyle = this.calcStyle(cProps.style, index)
        return <div className='tab-bar-item' key={index} style={finalStyle} onClick={() => { this.onTabClick(cProps.disabled, index) }}>
          {cProps.title}
          <style jsx>{`
            .tab-bar-item {
              position: relative;
            }
            .tab-bar-item + div {
              border-left: 1px solid #dadada;
            }
          `}</style>
        </div>
      })
      return content
    } else {
    }
  }

  calcStyle (propsStyle, index) {
    // 按钮默认样式
    let tabStyle = {
      width: '100%',
      height: '30px',
      backgroundColor: 'white',
      borderTop: '1px solid #dadada',
      borderBottom: '1px solid #dadada',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(53,53,53,0.55)',
      textAlign: 'center',
      padding: '10px 0px',
      fontSize: '15px',
      lineHeight: '20px'
      // boxSizing: 'border-box'
    }
    let chooseStyle = {
      color: 'rgba(53,53,53,1)',
      backgroundColor: '#efeff4'
    }
    // 默认样式 +  style样式
    let finalStyle = this.objectAssign(tabStyle, propsStyle)
    if (index === this.state.currentSelect) {
      // +  默认选中样式
      finalStyle = this.objectAssign(finalStyle, chooseStyle)
      // +  自定义选中样式
      return this.objectAssign(finalStyle, this.props.chooseStyle)
    } else {
      return finalStyle
    }
  }

  objectAssign (oldObj, addObj) {
    if (addObj !== undefined && addObj !== null) {
      let a = JSON.parse(JSON.stringify(oldObj))
      Object.assign(a, addObj)
      return a
    } else {
      return oldObj
    }
  }

  // 当没有currentSelect的控制的时候。
  // 组件自己修改 并传出 onChange
  // 如果有currentSelect的控制
  // 组件传出onTabClick 不会自己change

  // click
  onTabClick (disabled, index) {
    let {onTabClick} = this.props
    onTabClick(index)
    if (this.props.currentSelect === undefined) {
      this.onChange(disabled, index)
    }
  }

  // change
  onChange (disabled, index) {
    let {onChange} = this.props
    if (index !== this.state.currentSelect && !disabled) {
      this.setState({
        currentSelect: index
      }, () => {
        if (onChange) {
          onChange(index)
        }
      })
    }
  }

  render () {
    // chooseBar默认样式
    let tabStyle = {
      boxSizing: 'border-box',
      margin: 'auto',
      width: '100%',
      display: 'flex'
    }
    let finalStyle = this.objectAssign(tabStyle, this.props.style)

    return (
      <div className='page'>
        <div className='tab-bar' style={finalStyle}>
          {this.renderChooseList()}
        </div>
        {this.renderContent()}
        <style jsx>{`

        `}</style>
      </div>
    )
  }

  renderContent () {
    const tabsData = this.getTabs()
    let style
    return tabsData.map((content, index) => {
      if (index === this.state.currentSelect && tabsData[this.state.currentSelect] && tabsData[this.state.currentSelect].children) {
        style = {
          display: 'block'
        }
      } else {
        style = {
          display: 'none'
        }
      }
      return (<div key={index} style={style}>
        {content.children}
      </div>)
    })
  }

  // renderContent () {
  //   console.log('disappear')
  //   const tabsData = this.getTabs()
  //   if (tabsData[this.state.currentSelect] && tabsData[this.state.currentSelect].children) {
  //     return (<div>
  //       <div>{tabsData[this.state.currentSelect].children}</div>
  //     </div>)
  //   } else {
  //     return (<div>
  //       <div>{`kong`}</div>
  //     </div>)
  //   }
  // }
}
