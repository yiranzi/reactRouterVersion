import React from 'react'
import AxiosUtil from '../util/axios'
import init from '../wx/init'
import setShare from '../wx/setShare'
import {Link} from "react-router-dom";

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
    init().then(() => {
      setShare({title: '123', desc: '123'})
    })
  }

  render () {
    return (
      <div>
        page home
      </div>
    )
  }
}
