import React from 'react'
import {Link} from 'react-router-dom'

export default function () {
  return (
    <div className='fix-link'>
      <Link to={'/pages/payment/buygether/'}>
        <a className='content'>更多课程</a>
      </Link>
      <style jsx>{`
        .fix-link{
          position: fixed;
          bottom: 100px;
          left: -10px;
          width: 100px;
          height: 25px;
          line-height: 25px;
          background-color: #3e84e0;
          z-index: 100;
          border-radius: 30px;
          text-align: center;
        }
        .content {
          font-size: 14px;
          color: white;
        }
      `}</style>
    </div>
  )
}