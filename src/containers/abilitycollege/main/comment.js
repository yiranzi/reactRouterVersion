import React from 'react'
import Button from '../../../xz-components/button'

export default class extends React.Component {
  render () {
    return (
      <div className='comment'>
        <h1>用户这样评价能力学院</h1>
        <div className='detail'>
          <img src='/static/img/abilitycollege/1.jpg' />
          <img src='/static/img/abilitycollege/2.jpg' />
          <img src='/static/img/abilitycollege/3.jpg' />
          <img src='/static/img/abilitycollege/4.jpg' />
          <img src='/static/img/abilitycollege/5.jpg' />
        </div>
        <div className='button-group'>
          <a href='/payment/buygether'>
            <Button style={{backgroundColor: '#c41616', fontSize: '16px'}}>
              <img src='/static/img/abilitycollege/fire.png' />能力卡火热拼团中 <strong style={{marginLeft: '0.5rem'}}>立即获取</strong>
            </Button>
          </a>
        </div>
        <style jsx>{`
          .comment {
            margin-top: 2rem;
          }
          .detail {
            padding: 1rem;
          }
          .detail img {
            width: 100%;
            display: block;
          }
          .button-group {
            padding: 0 1rem;
            margin-top: 1rem;
          }
          .button-group a {
            display: inline-block;
            width: 100%;
          }
        `}</style>
        <style global jsx>{`
          .comment button {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .comment button img {
            width: 1.25rem;
            margin-right: 1rem;
          }
        `}</style>
      </div>
    )
  }
}
