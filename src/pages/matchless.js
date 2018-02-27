import React from 'react'
import AxiosUtil from '../util/axios'
import setShare from '../wx/setShare'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import init from "../wx/init";

export default class extends React.Component {

  componentWillMount = async () => {
    console.log(this.props)
  }

  render () {
    return (
      <div>
        <p>{this.props.history.location.pathname}</p>
        not match anything.find them in app.js
      </div>
    )
  }
}
