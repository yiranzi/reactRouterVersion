import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Group extends Component {
  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

class Radio extends React.Component {
  render () {
    const {children} = this.props
    return (
      <label>
        <div className='bd'><input type='radio' /><span className='icon' /></div>
        <div className='ft'><label>{children}</label></div>
        <style jsx>{`
          label {
            display: flex;
            align-items: center;
          }
          label .ft {
            margin-left: 0.5rem;
          }
          label .bd {
            position: relative;
            width: 1rem;
            height: 1rem;
          }
          label .bd input[type='radio'] {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
          }
          label .bd .icon {
            display: inline-block;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            z-index: 1;
          }
          label .bd input[type='radio'] + .icon {
            border: 1px solid #999999;
          }
          label .bd input[type='radio']:checked + .icon {
            border: 1px solid red;
          }
        `}</style>
      </label>
    )
  }
}

Radio.Group = Group

export default Radio