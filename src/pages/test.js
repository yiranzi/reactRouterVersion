import React from 'react'
// import Link from 'next/link'
import AxiosUtil from '../util/axios'
// import Layout from '/components/layout'
import setShare from '../wx/setShare'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nickname: null,
      freeId: 48,
      packageId: 499,
      buyId: 86,
      summary: {},
    }
  }

  componentDidMount = async () => {
    let userInfo = await AxiosUtil.get('/api/user')
    let {nickname} = userInfo
    this.setState({
      nickname: nickname
    })
    setShare({title: '456', desc: '456'})
  }

  render () {
    let {freeId, packageId, buyId} = this.state
    let abc = 'http://localhost:3000/payment/buygether?courseId=86'
    return (
      <div>
        page test
      </div>
    )
  }
}
