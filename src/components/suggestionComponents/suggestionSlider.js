import React from "react";
import Slider from "react-slick";
import SuggestionCard from './card';

class SuggestionSlider extends React.Component {
  update(){
    this.forceUpdate();
  }

  onContract(planoId){
    this.props.onContract(planoId);
  }

  render(){
    const WindowWidth = window.innerWidth
    var settings = {
      adaptiveHeight: true,
      dots: true,
      infinite: true,
      speed: parseInt(window.innerWidth,10)>parseInt(769,10)?1500:500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      arrows: WindowWidth > 769,
    };

    let rows = this.props.plans.map((plan, index)=> {
      return (
        <div className="slickItem" key = {plan.planoId}>
          <SuggestionCard
            animation = {index === 0 && this.props.animation}
            planDetail = {plan}
            recomendado = {false}
            onHandleDetails = {this.props.onHandleDetails}
            showHospitalar = {this.props.showHospitalar}
            showAmbulatorial = {this.props.showAmbulatorial}
            showCoparticipacao = {this.props.showCoparticipacao}
            showWithoutHospital = {this.props.showWithoutHospital}
            updateParent = {this.update.bind(this)}
            onContract = {this.onContract.bind(this)}
          />
        </div>
      );
    });

    return (
      <React.Fragment>
        <Slider {...settings}>
          {rows}
        </Slider>
        <style>{`
          .suggestionSlider{
          }
          .slickItem{
            outline: none;
            display:flex !important;
            flex-direction:column !important;
            justify-content: center !important;
            align-items: center;
            margin-bottom: 5px;
          }
          .slick-dots li button:before {
            color: #D50361;
          }
          .slick-dots li.slick-active button:before {
            color: #D50361 !important;
          }
          @media(min-width: 769px){
            .slick-prev{
              left: 3vh;
              z-index: 1;
            }
            .slick-next{
              right: 15vh;
              z-index: 1;
            }
            .slick-prev:before,
            .slick-next:before {
              color: #D50361;
              font-size: 15vh;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default SuggestionSlider
