import React from 'react'
import {ModalBoxPopFunc} from '../xz-components/modalbox'

/*
  param:
    content 内容

  by yiran
 */

export function showShareBg (content) {
  let defaultStyle = {
    backgroundColor: 'rgba(0, 10, 49, 0.5)'
  }
  let imgStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '150px',
    height: '300px'
  }
  let innerContent = {
    position: 'absolute',
    top: '288px',
    right: '10px'
  }
  let dom = <div>
    <img style={imgStyle} src='/static/img/apollo/shareArrow.png' />
    <p style={innerContent}>{content}</p>
  </div>
  let prop = {
    innerDiv: dom,
    style: defaultStyle
  }
  ModalBoxPopFunc({...prop})
}
