import React from 'react'
import PropTypes from 'prop-types'
import {Popup} from 'react-weui'

export default class extends React.Component {
  static propTypes = {
    close: PropTypes.bool,
    show: PropTypes.bool,
    position: PropTypes.string,
    onRequestClose: PropTypes.func,
    crossIcon: PropTypes.object
  }
  static defaultProps = {
    close: true,
    show: false,
    position: 'left',
    onRequestClose: () => {}
  }
  renderStyle () {
    const {position} = this.props
    if (position === 'left') {
      return {
        'left': 0,
        'transform': 'translate(-100%, 0)',
        'width': '80%'
      }
    }
    if (position === 'right') {
      return {
        'left': 'auto',
        'right': '0',
        'transform': 'translate(100%, 0)',
        'width': '80%'
      }
    }
    if (position === 'top') {
      return {
        'transform': 'translate(0, -100%)',
        'width': '80%'
      }
    }
    if (position === 'bottom') {
      return {
        'transform': 'translate(0, 100%)',
        'width': '80%'
      }
    }
  }
  renderToggle () {
    const {position} = this.props
    if (position === 'left') {
      return {
        'left': 0,
        'transform': 'translate(0, 0)',
        'width': '80%'
      }
    }
    if (position === 'right') {
      return {
        'left': 'auto',
        'right': 0,
        'transform': 'translate(0, 0)',
        'width': '80%'
      }
    }
    if (position === 'top') {
      return {
        'transform': 'translate(0, -100%)',
        'width': '80%'
      }
    }
    if (position === 'bottom') {
      return {
        'transform': 'translate(0, 100%)',
        'width': '80%'
      }
    }
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.show !== nextProps.show && nextProps.show === true) {
      document.body.style.position = 'fixed'
    } else if (this.props.show !== nextProps.show && nextProps.show === false) {
      document.body.style.position = 'relative'
    }
  }

  componentWillUnmount () {
    // fix back bug
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
  }

  getStyle () {
    let style = this.renderStyle()
    if (this.props.show) {
      Object.assign(style, this.renderToggle())
    }
    return style
  }
  close () {
    document.body.style.position = 'relative'
  }
  render () {
    const {show, close, onRequestClose, crossIcon} = this.props
    return (
      <Popup
        style={this.getStyle()}
        show={show}
        onRequestClose={(e) => { this.close(); onRequestClose() }}
      >
        {close && (
          <span className='crossIcon' onClick={() => onRequestClose()}>
            {crossIcon ? <div dangerouslySetInnerHTML={{__html: crossIcon}} /> : <span className='close'/>}
          </span>
        )}
        {this.props.children}
        <style global jsx>{`
          .weui-popup {
            height: 100%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
            transition: transform 0.5s !important;
          }
          .close {
            width: 30px;
            height: 30px;
            margin-top: 10px;
            margin-right: 10px;
            position: relative;
            float: right;
          }
          .close::before {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
          .close::after {
            content: '';
            width: 2px;
            height: 30px;
            background: rgba(0,0,0,.43);
            transform: rotate(-45deg);
            position: absolute;
            left: 10px;
            top: 0;
          }
        `}</style>
      </Popup>
    )
  }
}
