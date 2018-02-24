import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {Cells} from 'react-weui'

class Accordion extends React.Component {
  static propTypes = {
    show: PropTypes.bool
  }
  static defaultProps = {
    show: false
  }

  constructor (props) {
    super(props)
    this.state = {
      showContent: this.props.show
    }
  }

  handleClick (e) {
    this.setState({
      showContent: !this.state.showContent
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      showContent: nextProps.show
    })
  }

  render () {
    const { header, children } = this.props
    const {showContent} = this.state
    let content = showContent ? children : ''
    return (
      <div className='xz-accordion-item'>
        <div
          className={classNames('xz-accordion-header', {'show': showContent})}
          onClick={() => this.handleClick()}
        >{header}</div>
        {content && <div className='xz-accordion-content'><Cells style={{fontSize: '1rem'}}>{content}</Cells></div>}
        <style jsx>{`
          .xz-accordion-item {
            border-radius: 2px;
            margin: 8px 0;
          }
          .xz-accordion-header {
            background-color: #fff;
            box-shadow: 0 5px 5px rgba(240, 242, 246, 1);
            padding: 10px 30px 10px 15px;
            align-items: center;
            transition: .3s;
            position: relative;
          }
          .xz-accordion-header::after {
            content: " ";
            display: inline-block;
            height: 6px;
            width: 6px;
            border-width: 2px 2px 0 0;
            border-color: #c8c8cd;
            border-style: solid;
            transform: matrix(.71,.71,-.71,.71,0,0);
            position: absolute;
            top: 50%;
            right: 15px;
            margin-top: -4px;
            transition: transform .3s;
            transform: rotate(134deg);
          }
          .xz-accordion-header.show::after {
            transform: rotate(-45deg);
          }
        `}</style>
        <style global jsx>{`
          .xz-accordion-content .weui-cells {
            margin-top: 0 !important;
          }
          .xz-accordion-content .weui-cell:before {
            border-top: none !important;
          }
        `}</style>
      </div>
    )
  }
}

class Panel extends React.Component {
  render () {
    return this.props.children
  }
}

Accordion.Panel = Panel

export default Accordion
