import React from 'react'
import AxiosUtil from '../util/axios'
import setShare from '../wx/setShare'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      content: ''
    }
  }

  componentWillMount = async () => {
    // 读取url
    let {testId} = this.props.match.params
    this.setState({
      content: testId
    })
    setShare({title: 'test', desc: 'test'})
    console.log('finish share')
  }

  pushRouter = (content) => {
    this.props.history.push(`/home/${content}`)
  }

  render () {
    return (
      <div>
        page test
        <h1>{this.state.content}</h1>
        <div onClick={() =>this.pushRouter('你好')}>pushState home 你好</div>
        <div onClick={() =>this.pushRouter('我好')}>pushState home 我好</div>
      </div>
    )
  }
}
