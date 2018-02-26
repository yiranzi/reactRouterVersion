import React from 'react'
import AxiosUtil from '../../../util/axios'
import DataUtil from '../../../util/data'
import Card from './card'
import LoadingIcon from '../../../xz-components/loadingicon'
import Button from '../../../xz-components/button'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      detail: {}
    }
  }
  componentDidMount = async () => {
    let exchangeDetail = await AxiosUtil.get('/api/study-card/exchangeDetail') // 获取schedule course文案
    let detail = {}
    exchangeDetail.map((item) => {
      detail[item.id] = item
    })
    this.setState({detail: detail})
  }
  renderRecommand (ids) {
    const {detail} = this.state
    return ids.map((id) => {
      return <Card detail={detail[id]} bg='#241d66' />
    })
  }
  render () {
    return (
      <div className='plan-course'>
        <div className='detail'>
          <div className='title'>路径详情</div>
          {this.props.data.map((item, index) => {
            return (
              <section key={`path-${index}`}>
                <div className='sub-title'>{item.subTitle}</div>
                <div className='sub-content'>{item.subContent}</div>
                <div className='recommand'>
                  <div className='header'>推荐课程</div>
                  {DataUtil.isEmpty(this.state.detail) ? <LoadingIcon /> : this.renderRecommand(item.recommand)}
                </div>
              </section>
            )
          })}
          <a style={{display: 'block'}} href='/payment/buygether'>
            <Button style={{backgroundColor: '#c41616', fontSize: '1rem'}}>去获取能力卡 拼团中</Button>
          </a>
        </div>
        <style jsx>{`
          .plan-course .title {
            margin-top: 1rem;
            color: #241d66;
            font-weight: bold;
            font-size: 1.25rem;
          }
          .plan-course .detail {
            padding: 0 1.5rem;
            padding-bottom: 2rem;
            font-size: 0.85rem;
          }
          .plan-course  .detail .sub-title {
            font-size: 1rem;
            margin: 0.75rem 0;
            font-weight: bold;
          }
          .plan-course  .detail .sub-content {
            font-size: 0.85rem;
          }
          .plan-course  .detail .recommand .header {
            font-size: 1rem;
            color: #241d66;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
        `}</style>
      </div>
    )
  }
}
