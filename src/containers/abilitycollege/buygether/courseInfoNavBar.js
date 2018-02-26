import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      topFixed: undefined
    }
    this.calc = this.calc.bind(this)
  }

  componentDidMount () {
    this.setScroll()
  }

  setScroll () {
    let _this = this
    window.addEventListener('scroll', function (e) {
      let a = _this.refs.topFixedPos.offsetTop
      if (window.scrollY > a && !_this.state.topFixed) {
        _this.setState({
          topFixed: true
        })
      }
      if (window.scrollY < a && _this.state.topFixed) {
        _this.setState({
          topFixed: false
        })
      }
    })
  }

  renderCourseInfo () {
    return (
      <div className='div-with-bottom'>
        <h1 className={'my-title-h1'}>课程详情</h1>
        <div className='intro-div-content'>
          {this.props.detailList.map((ele, index) => {
            return (
              <div key={index}>
                {index === 0 && <div ref={`id0`} />}
                {index === 0 && <div ref='topFixedPos' style={{height: '56px', position: 'relative'}}>
                  {this.renderNavBar()}
                </div>}
                <div className={'html-container'} dangerouslySetInnerHTML={{__html: ele.content}} />
                <div ref={`id${index + 1}`} style={{height: '56px', backgroundColor: 'white'}} />
              </div>
            )
          })}
        </div>
        <style jsx>{`
          .div-with-bottom {
            padding-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
          }
          .div-with-bottom img {
            width: 100%;
          }
          .intro-div-content {
            margin: auto -15px;
          }
        `}</style>
        <style jsx global>{`
          .html-container img {
            max-width: 100%;
          }
        `}</style>
      </div>
    )
  }

  calc (index) {
    let a = this.refs[`id${index}`]
    let scrollValue = a.offsetTop
    window.scrollTo(0, scrollValue)

  }

  renderNavBar () {
    let fixed = {
      position: 'fixed',
      top: '0px',
      left: '0px',
      width: '100%',
      zIndex: '99',
      // paddingLeft: '15px',
      // paddingRight: '15px',
      boxSizing: 'border-box'
    }
    let inTxt = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      width: '100%',
      zIndex: '99',
      boxSizing: 'border-box'
    }
    let style = this.state.topFixed ? fixed : inTxt
    return (
      <div style={style}>
        <div className='nav-bar'>
          {
            this.props.detailList.map((ele, index) => {
              return (
                <div key={index} onClick={() => { this.calc(index) }}>
                  <a>{ele.type}</a>
                </div>
              )
            })
          }
        </div>
        <style>{`
          .nav-bar {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            background-color: #F9F9F9;
            padding: 3px;
            // margin: 10px auto 10px auto;
            height: 50px;
            line-height: 50px;
            // margin: auto -15px;
            overflow: hidden;
          }
          a {
            color: black;
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }

  render () {
    if (this.props.detailList && this.props.detailList.length > 0) {
      return (
        this.renderCourseInfo()
      )
    } else {
      return null
    }
  }
}