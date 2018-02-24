import React from 'react'
import { Tab, TabBody, TabBar, TabBarItem } from 'react-weui'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: this.props.tab
    }
  }

  toLink (href) {
    location.href = href
  }

  render () {
    return (
      <Tab>
        <TabBody>
          {this.props.children}
        </TabBody>
        <TabBar>
          <TabBarItem
            icon={this.state.tab === 1
              ? <img src='/static/img/common/enterprise_active.png' />
              : <img src='/static/img/common/enterprise.png' />}
            active={this.state.tab === 1}
            onClick={e => this.toLink('/job/internship')}
            label='实习'
          />
          <TabBarItem
            icon={this.state.tab === 2
              ? <img src='/static/img/common/center_active.png' />
              : <img src='/static/img/common/center.png' />}
            active={this.state.tab === 2}
            onClick={e => this.toLink('/ucenter/portal')}
            label='我的'
          />
        </TabBar>
      </Tab>
    )
  }
}
