import React from "react";
import Slider from "react-slick";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: parseInt(window.innerWidth,10)>parseInt(769,10)?1500:500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnFocus: true,
      swipe: true,
    };
    return (
      <React.Fragment>
        <Slider {...settings}>
          <div className="slickItem">
            <img src="/assets/images/plans/Amil.png" alt="Amil" />
          </div>
          <div className="slickItem">
            <img src="/assets/images/plans/Bradesco.png" alt="Bradesco" />
          </div>
          <div className="slickItem">
            <img src="/assets/images/plans/Unimed.png" alt="Unimed" />
          </div>
          <div className="slickItem">
            <img src="/assets/images/plans/SulAmerica.png" alt="Sul América" />
          </div>
        </Slider>
        <style>{`
          .slickItem img{
            height: 300px;
          }
          .slickItem{
            display:flex !important;
            flex-direction:column !important;
            justify-content: center !important;
            align-items: center;
          }
          @media(max-width: 769px){
            .slickItem img{
              width: 70vw;
              height: auto;
            }
            .slickItem{
              display:flex !important;
              flex-direction:column !important;
              justify-content: center !important;
              align-items: center;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default SimpleSlider
