import React from 'react'
import setShare from '../wx/setShare'
import {Link} from "react-router-dom";

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      homeId: 'empty'
    }
  }

  componentWillMount = async () => {
    // 读取url
    let {homeId} = this.props.match.params
    console.log(homeId)
    this.setState({
      homeId: homeId
    })
    // 调用分享
    setShare({title: 'home', desc: 'home'})
    console.log('finish share')
  }

  pushRouter = (index) => {
    this.props.history.push(`/test/${index}`)
  }

  render () {
    return (
      <div>
        <Link to={'/pages/payment/buygether/1'}>payment</Link>
        {/*<h1>{this.state.homeId}</h1>*/}
        {/*page home*/}
        {/*<div onClick={() =>this.pushRouter('123')}>pushState home 123</div>*/}
        {/*<div onClick={() =>this.pushRouter('456')}>pushState home 456</div>*/}
      </div>
    )
  }
}
