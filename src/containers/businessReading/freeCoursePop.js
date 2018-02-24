import React from 'react'
import ModalboxControlled from '/xz-components/modalboxControlled'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hideInConer: false
    }
  }

  HelpPopFunc () {
    let dom = <div className='pop-bg'>
      <img className='img-style' src='/static/img/businessReading/share/free_img.png' />
      <style jsx>{`
        img {
          width: 80%;
        }
      `}</style>
    </div>
    let cancelDiv = {
      width: '100%',
      height: '60px',
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      zIndex: '99999'
    }
    return (
      <ModalboxControlled
        cancelClick={() => { this.setState({hideInConer: true}) }}
        cancelDivStyle={cancelDiv}
        innerDivStyle={{width: '80%'}}
        outDivStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        {dom}
      </ModalboxControlled>
    )
  }

  renderConerIcon () {
    let style = {
      position: 'fixed',
      right: '0px',
      bottom: '50px',
      fontSize: '40px',
      zIndex: '9999',
      width: '100px'
    }
    return (
      <img style={style} src={'/static/img/businessReading/share/free_img_icon.png'}
        onClick={() => {
          this.setState({
            currentChoose: undefined,
            hideInConer: false
          })
        }} />
    )
  }

  render () {
    let {hideInConer} = this.state
    if (hideInConer) {
      return (
        this.renderConerIcon()
      )
    } else {
      return this.HelpPopFunc()
    }
  }
}