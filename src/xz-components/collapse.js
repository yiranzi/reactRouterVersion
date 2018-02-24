import React from 'react'

class Panel extends React.Component {
  static defaultProps = {
    transitionName: 'slide'
  }

  constructor (props) {
    super(props)
    this.state = {
      showContent: false
    }
  }

  handleClick (e) {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  render () {
    const { children, header } = this.props
    let content = this.state.showContent ? children : <div />
    return (
      <div>
        <div onClick={() => this.handleClick()}>{ header }</div>
        {content}
      </div>
    )
  }
}

class Collapse extends React.Component {
  render () {
    return (
      <div className='collapse'>{this.props.children}</div>
    )
  }
}
Collapse.Panel = Panel

export default Collapse
