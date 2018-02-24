import React from 'react'
import Layout from '../../containers/businessReading/layout'

export default class extends React.Component {
  render () {
    return (
      <Layout>
        <div className='block'>
          <img className='reward' src='/static/img/learn/reading/reward.png' />
        </div>
        <style jsx>{`
          .block {
            margin: 15px 12px;
          }
          .reward {
            width: 100%;
          }
        `}</style>
      </Layout>
    )
  }
}
