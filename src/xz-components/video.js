import React from 'react'

export default class Video extends React.Component {
  render () {
    return (
      <video src={this.props.videoUrl} />
    )
  }
}
