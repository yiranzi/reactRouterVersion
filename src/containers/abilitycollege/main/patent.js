import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <div className='patent'>
        <h1>应用杜克大学脑科学专利技术</h1>
        <div className='detail'>
          <div className='title'>
            在小灶能力学院，我们绝对不是单纯给你一个视频，让你昏昏欲睡听一个小时半个小时。
            小灶能力学院应用杜克大学脑科学专利技术，创新的用互动的方式提高学生的参与度，
            强化学生学习的效果和效率。根据不同课程和学员的掌握速度，我们努力帮助各位同
            学用1周到3个月时间提升核心通用能力、职场关键技能、求职能力。
          </div>
          <div className='content'>
            <div className='top'>
              <div className='item'>
                <img src='/static/img/abilitycollege/1-1.png' />
                <div className='en'>Pre-test</div>
                <div className='cn'>学前预习</div>
              </div>
              <div className='item-2'>
                <img src='/static/img/abilitycollege/1-2.png' />
                <div className='en'>Spacing</div>
                <div className='cn'>合理的间隔</div>
              </div>
              <div className='item'>
                <img src='/static/img/abilitycollege/1-3.png' />
                <div className='en'>Peer Learining</div>
                <div className='cn'>协作学习</div>
              </div>
            </div>
            <div className='bottom'>
              <div className='item'>
                <img src='/static/img/abilitycollege/2-1.png' />
                <div className='en'>Relevance</div>
                <div className='cn'>扩展练习</div>
              </div>
              <div className='item-2'>
                <img src='/static/img/abilitycollege/2-2.png' />
                <div className='en'>Recall</div>
                <div className='cn'>及时回顾</div>
              </div>
              <div className='item'>
                <img src='/static/img/abilitycollege/2-3.png' />
                <div className='en'>Application</div>
                <div className='cn'>实践应用</div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .patent {
            margin: 2.5rem 0;
            padding: 0 0.5rem;
          }
          .detail {
            margin-top: 1rem;
            padding: 0 1.5rem;
          }
          .detail .title {
            font-size: 1rem;
          }
          .detail .content {
            font-size: 0.75rem;
            padding: 2rem 0;
          }
          .detail .content .top {
            display: flex;
            align-items: flex-end;
          }
          .detail .content .bottom {
            margin-top: 1rem;
            display: flex;
            align-items: flex-start;
          }
          .detail .content .item,
          .detail .content .item-2 {
            text-align: center;
            flex: 1;
          }
          .detail .content .item img,
          .detail .content .item-2 img {
            width: 50%;
          }
          .detail .content .top .item-2 {
            margin-bottom: 3rem;
          }
          .detail .content .bottom .item-2 {
            margin-top: 3rem;
          }
        `}</style>
      </div>
    )
  }
}
