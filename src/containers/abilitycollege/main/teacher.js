import React from 'react'
import Slider from 'react-slick'

export default class extends React.Component {
  render () {
    let detail = [
      '/static/img/abilitycollege/Marc.png',
      '/static/img/abilitycollege/Grace.png',
      '/static/img/abilitycollege/Laila.png',
      '/static/img/abilitycollege/Nino.png',
      '/static/img/abilitycollege/Mandy.png'
    ]
    let settings = {
      arrows: false,
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '16pt',
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500
    }
    return (
      <div className='teacher'>
        <h1>小灶能力学院教研团队（部分）</h1>
        <div className='detail'>
          <Slider {...settings}>
            {detail.map((item, index) => {
              return (
                <div key={index} className='card'>
                  <div className='detail'>
                    <img src={item} />
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <style jsx>{`
          .teacher {
            margin: 2.5rem 0;
            padding: 0 0.5rem;
          }
          .teacher .detail {
            margin-top: 1rem;
          }
          .detail img {
            width: 100%;
          }
        `}</style>
      </div>
    )
  }
}
