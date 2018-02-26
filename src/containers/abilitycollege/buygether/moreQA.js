import React from 'react'
import MoreLine from '../../../xz-components/moreLine'
/**
 * 更多信息
 * 引用moreLine多行文本。点击会展开全部。
 */
export default class extends React.Component {
  staticContent = [
    {
      question: '1. 课程形式是怎样的呢？',
      content: '小灶能力学院在新技术驱动下，不断迭代已有的系统学、打卡学的使用体验和学习效果，探索更高效的学习模式，确保同学们能够最大化地吸收知识，掌握技能。目前，小灶能力学院主要有系统学（重规划、重输出）和 打卡学（有监督、重积累） 两类学习模式。两者可以在移动端或 PC 端学习（依据内容不同，提供最合适的学习终端），反复学习、有教学视频、有作业、有讨论、有拓展阅读等。'
    },
    {
      question: '2.课程什么时候上线可以看呀？',
      content: '26项能力课程会在2018年逐月上线，最早一门会在2018年1月5日即开放兑换。请小伙伴务必关注“小灶能力派服务号”（微信搜索“小灶能力派服务号”），我们会及时通过服务号的“模版消息”通知各位小伙伴！'
    },
    {
      question: '3.课程有有效期吗？',
      content: '视频课程有效期会根据类别 30 到 90 天以上不等哦，打卡方式的课程按照打卡周期来计算哦，每个打卡课程时间不一。举三个例子：【1】能力类的课程，为了促进大家学习防止拖延症，我们一般会设置 35 天以内的学习时长；【2】商业敏感度 A1 这个课程，是一个三个月周期，每周两次的打卡课程；【3】四大求职的课程，由于从网申开放到结束面试周期可以很长，我们会有 90 天甚至以上的有效期。小灶对每个产品会按照最佳效果来定义时间的。'
    },
    {
      question: '4.每个课的课时怎么算？',
      content: '使用2张能力卡兑换的课程一定比1张能力卡兑换的课程有更多的课时。但不是简单的2倍关系，取决于内容的主题以及练习的深度。大致来说，1张卡的会有6-7个模块，参考群面打卡，2张卡的预计10-12个模块。而且我们会根据实际来看适合的内容载体，不一定是视频，可能是音频、图片、文字。'
    },
    {
      question: '5.请问能力卡有使用期限吗？',
      content: '能力卡有效期为2018年1月1日-2018年12月31日，同学可以根据自己的兴趣和需求选择需要的课程，使用能力卡进行开通，能力卡限本人使用哦~'
    },
    {
      question: '6.能力卡购买后如何使用呀？',
      content: '新课程上线后可以用能力卡兑换课程哦，我们将会在2018年1月开通兑换方式，届时会通过“小灶能力派服务号”通知大家。'
    }
  ]

  render () {
      let moreStyle = {
        marginTop: '10px'
      }
      let arr = this.staticContent.map((ele, index) => {
        return (<div key={index} className='question'>
          <MoreLine style={moreStyle} title={ele.question} content={ele.content} />
          <style jsx>{`
            .question {
              color: #646464;
              text-align: left;
              margin: 10px auto 15px auto;
            }
          `}</style>
        </div>)
      })
      return (<div className='more-div'>
        <div className='more-info-title'>
          <span>小灶能力学院Q&A</span>
        </div>
        {arr}
        <style jsx>{`
        .more-div {
          font-size: 14px;
          padding: 4px;
        }
         .more-info-title{
            height: 1px;
            border-top: 3px dotted #e1e4f0;
            text-align: center;
            margin: 40px 0px 18px 0px !important;
          }
          .more-info-title span{
            background-color: #f0f2f6;
            font-size: 18px;
            position: relative;
            top: -18px;
            padding: 0 10px;
          }
      `}</style>
      </div>)
  }
}


