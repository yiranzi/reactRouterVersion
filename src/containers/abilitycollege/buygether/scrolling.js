import React from 'react'
/**
 * 滚屏
 * 初始化数组
 * 时间间隔
 *
 */
export default class extends React.Component {
  schoolStaticName = [
    '广东外语外贸大学',
    '江西财经大学',
    '首都经济贸易大学',
    '厦门大学',
    '浙江大学',
    '山东大学',
    '格拉斯哥大学',
    '北京理工大学',
    '北京工商大学',
    '北京大学',
    '江南大学',
    '中国海洋大学',
    '北京交通大学'

  ]
  classStaticNmae = [
    '商业敏感度',
    'PPT',
    'EXCEL',
    'Desk Research',
    '数据分析',
    '商业沟通',
    '四大实习和储备项目',
    '毕马威一路通关',
    '安永一路通关',
    '德勤一路通关',
    '普华永道一路通关',
    '人际沟通',
    '组织规划',
    '结构化思维',
    'Networking'
  ]
  cardCount = [1, 3, 7, 15]
  staticDate = []

  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0
    }
    this.setInterval = this.setInterval.bind(this)
    this.makeArr = this.makeArr.bind(this)
  }

  makeArr () {
    let stringA = this.schoolStaticName
    let stringC = this.cardCount
    let count = 10
    let arr = []
    while (count > 0) {
      count--
      let randomValueA = parseInt(stringA.length * Math.random())
      let randomValueC = parseInt(stringC.length * Math.random())
      // arr.push(<div>{`来自${stringA[randomValueA]}的同学${stringC[randomValueC]}张能力卡`}</div>)
      arr.push(<div>{`来自${stringA[randomValueA]}的同学正在拼单课程`}</div>)
    }
    this.staticDate = arr
  }

  componentDidMount () {
    this.makeArr()
    this.setInterval()
  }

  setInterval () {
    window.setInterval(() => {
      let {currentIndex} = this.state
      currentIndex++
      if (currentIndex > this.staticDate.length - 1) {
        currentIndex = 0
      }
      this.setState({
        currentIndex: currentIndex
      })
    }, this.props.interval)
  }

  render () {
    return (<div className='content'>
      {this.staticDate.length > 0 && this.staticDate[this.state.currentIndex]}
      <style jsx>{`
        .content {
          font-size: 12px
        }
      `}</style>
    </div>)
  }
}
