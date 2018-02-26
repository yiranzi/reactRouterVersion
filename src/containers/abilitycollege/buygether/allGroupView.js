import React from 'react'
import Scrolling from '../../abilitycollege/buygether/scrolling'
/**
 * 浏览所有组
 * 有表示学院购买的自动滚动条
 * 点击为跳转到购买
 */
export default class extends React.Component {
  scrollingInterval = 6000 // 滚动条时间的间隔
  render () {
    let {studyCardPackageList} = this.props
    let count = 0
    studyCardPackageList.forEach((ele, index) => {
      count += ele.buyCount
    })
    return (<div className='show-card'>
      <div className='title-line'>
        <p>能力卡用于兑换2018课表课程</p>
        <p>已有{count}人获得</p>
      </div>
      <div className='card-line'>
        {studyCardPackageList.map((ele, index) => {
          return (
            <div key={index} onClick={() => { this.props.buyMyGroup(index) }}>
              <img src={`/static/img/buygether/card_${index + 1}0.png`} />
            </div>)
        })}
        {(studyCardPackageList && studyCardPackageList.length > 0) && <div><img src={`/static/img/buygether/card_00.png`} /></div>}
      </div>
      <div className='text-line'>
        <Scrolling interval={this.scrollingInterval} />
      </div>
      <style jsx>{`
        .show-card {
          position: relative;
          height: 200px;
          background-image: url('/static/img/buygether/buyBg_2.jpeg');
          background-size: 100% 100%;
          padding: 8px;
          font-size: 14px;
          color: white;
        }
        .title-line {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .card-line {
          position: absolute;
          bottom: 60px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }
        .card-line img {
          width: 100%;
          max-width: 80px;
        }
        .text-line {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
        }
      `}</style>
    </div>)
  }
}


