import React from 'react'
import { CityPicker } from 'react-weui'

function generateData () {
  let data = []
  for (let i = 0; i < 24; i++) {
    let time = i < 10 ? `0${i}点` : `${i}点`
    let json = {
      name: time,
      code: i,
      sub: [
        {
          name: '00分'
        },
        {
          name: '30分'
        }
      ]
    }
    data.push(json)
  }
  return data
}

export default class extends React.Component {
  tips = '<div class=\'title wx-text-center\'>注意</div><p>此处的提醒时间为北京时间，请海外小伙伴根据当地时间进行换算后再设置。</p><p style=\'margin-top:8px\'>比如：身处华盛顿的小伙伴希望在早晨9:30接受提醒，此时北京时间为22:30，所以此处应设置的提醒时间为22:30</p>'

  componentDidUpdate (nextProps, nextState) {
    let dom = document.querySelector('.weui-picker.weui-animate-slide-up')
    let tipsDom = document.querySelector('.tips')
    if (dom && !tipsDom) {
      let tips = document.createElement('div')
      tips.className = 'tips'
      let tipsContent = this.tips
      tips.innerHTML = tipsContent
      dom.insertBefore(tips, dom.childNodes[0])
    }
  }
  render () {
    let data = generateData()
    const { show, defaultHour, defaultMinute, onChange, onCancel } = this.props
    return (
      <CityPicker
        data={data}
        show={show}
        selected={[defaultHour, defaultMinute]}
        onChange={(text) => onChange(text)}
        onCancel={(e) => onCancel()}
      />
    )
  }
}
