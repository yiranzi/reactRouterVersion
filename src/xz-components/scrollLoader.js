import React from 'react'

export default class ScrollLoader extends React.Component {
  scrollTimer = true
  finishBool = false
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
    this.scrollHandler = this.scrollHandler.bind(this)
    this.finish = this.finish.bind(this)
    this.resolveLoading = this.resolveLoading.bind(this)
  }

  finish () {
    this.finishBool = true
  }

  resolveLoading () {
    this.setState({
      loading: false
    })
  }

  scrollHandler (e) {
    // 没在timer 没已完成 没loading
    if (this.scrollTimer && !this.finishBool && !this.state.loading) {
      let target = e.target
      let scrollPercent = Math.floor(( (target.scrollTop + target.clientHeight) / target.scrollHeight) * 100)
      if (scrollPercent > 45) {
        this.setState({
          loading: true
        })
        this.props.onLoadMore(this.resolveLoading, this.finish)
      }
      this.scrollTimer = false
      window.setTimeout(() => {
        this.scrollTimer = true
      }, 100)
    }
  }

  render () {
    return (
      <div style={this.props.style} className='scroll' onScroll={this.scrollHandler}>
        {this.props.children}
        <style jsx>{`
          .scroll {
            height: 90vh;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
          }
        `}</style>
      </div>
    )
  }
}
