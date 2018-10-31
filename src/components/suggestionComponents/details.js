import React from 'react';
import Prices from './prices';
import PlanDetailsImage from './planDetailsImage';
import Hospitals from './hospitals';
import Laboratories from './laboratories';
import Range from './range';
import Icons from '../icons';
import { ICONS } from '../../utils/ICONS';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as SuggestionAction from '../../action/SuggestionAction';

class Details extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showHospitals: false,
      showLabs: false,
    };
    this.handleHospitals = this.handleHospitals.bind(this);
    this.handleLabs = this.handleLabs.bind(this);
    this.returnPage = this.returnPage.bind(this);
    this.onContract = this.onContract.bind(this);
  }

  onContract(e){
    e.preventDefault()
    this.props.action.saveSuggestionPickAction().then(()=>{
      this.props.history.push('/contract');
    })
  }

  handleHospitals(){
    this.setState({
      showHospitals: !this.state.showHospitals
    });
  }

  handleLabs(){
    this.setState({
      showLabs: !this.state.showLabs
    });
  }

  returnPage(){
    this.props.history.push('/suggestions');
  }

  render(){
    var numHospitais = 0;
    for(let hospitaisPorRegiao of this.props.planDetail.hospitais){
      numHospitais += hospitaisPorRegiao.hospitais.length;
    }

    var numLabs = 0;
    for(let laboratoriosPorRegiao of this.props.planDetail.laboratorios){
      numLabs += laboratoriosPorRegiao.laboratorios.length;
    }

    var operadora = this.props.suggestions.find(suggestionElement => {
      return (suggestionElement.operadora === this.props.planDetail.operadoraNomeFantasia)
    })

    var suggestion = operadora.plans.find(plan =>{
      return (plan.planoId === this.props.planoId);
    });

    var rating
    this.props.suggestions.forEach( e => {
      e.plans.forEach( plan => {
        if(plan.planoId === this.props.planDetail.planoId){
          rating = parseFloat(plan.nota).toFixed(2)
        }
      })
    });

    return(
      <React.Fragment>
        <div className="containerSuggestions">
          <PlanDetailsImage
            operadora={this.props.planDetail.operadoraNomeFantasia}
            plano={this.props.planDetail.planoNome}
            onClickReturn={this.returnPage}
            onContract={this.onContract}
            rating={rating}
          />
            <div className="infoField">
              <Prices
                preco0 = {this.props.planDetail.preco0}
                preco19 = {this.props.planDetail.preco19}
                preco24 = {this.props.planDetail.preco24}
                preco29 = {this.props.planDetail.preco29}
                preco34 = {this.props.planDetail.preco34}
                preco39 = {this.props.planDetail.preco39}
                preco44 = {this.props.planDetail.preco44}
                preco49 = {this.props.planDetail.preco49}
                preco54 = {this.props.planDetail.preco54}
                preco59 = {this.props.planDetail.preco59}
              />
            </div>
            <span className="bar"></span>
            <div className="infoField">
              <Range
                abrangencia={this.props.planDetail.planoAbrangencia}
                numHospitais={numHospitais}
                numLabs={numLabs}
                numHospitaisNaRegiao={suggestion.nrHospitaisNaRegiao}
                preference={this.props.preference}
                satisfazPreferencia={suggestion.satisfazPreferencia}
              />
            </div>
            <span className="bar"></span>
            <div className="infoField">
              <h2><Icons icon={ICONS.ACOMODACAO} color={"var(--pink)"}/> Acomodação: {this.props.planDetail.planoAcomodacao}</h2>
              {this.props.planDetail.planoAcomodacao==="Apartamento"&&<p>No caso de internação, esta acomodação dá direito a um quarto particular, com banheiro próprio e privacidade. O direito de acompanhante depende do contrato, mas costuma ser permitido ao acompanhante permanecer no quarto em tempo integral.</p>}
              {this.props.planDetail.planoAcomodacao==="Enfermaria"&&<p>No caso de internação, esta acomodação dá direito a um quarto coletivo, podendo ser compartilhado, geralmente, com até quatro pessoas do mesmo sexo. O direito de acompanhante depende do contrato, mas costuma ser preciso cumprir com o horário de visita.</p>}
              <p><a href="https://consultorio.com/blog/2018/06/13/acomodacao-apartamento-ou-enfermaria/" target="_blank" rel="noopener noreferrer">Saiba mais.</a></p>
            </div>
            {/*<span className="bar"></span>
            <div className="infoField">
              <h2>Quem pode contratar?</h2>
              <h4>-Estudantes;</h4>
              <h4>-Trabalhadores com carteira assinada;</h4>
              <h4>-Engenheiros com CREA.</h4>
              <p><a>Saiba mais.</a></p>
            </div>*/}
            <span className="bar"></span>
            <div className="infoField">
              <Hospitals hospitais={this.props.planDetail.hospitais} showHospitals={this.state.showHospitals} onClick={this.handleHospitals}/>
            </div>
            <span className="bar"></span>
            <div className="infoField">
              <Laboratories laboratorios={this.props.planDetail.laboratorios} showLabs={this.state.showLabs} onClick={this.handleLabs} />
            </div>
          </div>
          <div className="detailsFooter">
            <Link onClick={this.onContract} to="/contract" className="submitButton">Tenho Interesse</Link>
          </div>
          <div className="priceAlert">
            <span>* Podem haver divergências entre o preço real e o informado devido a atualizações.</span>
          </div>
      <style>{`
        .firstLine{
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .firstLine i{
          cursor: pointer;
          font-size: 24px;
          color: var(--pink);
        }
        .priceAlert{
          padding: 0px 20px 2vh;
          position: relative;
          font-family: Gotham;
        }
        .priceAlert span{
          font-size: 10px;
          font-weight: bold
        }
        @font-face {
          font-family: 'Gotham';
          src: url('/assets/fonts/GothamRoundedMedium_21022.ttf')
        }
        .fa-question-circle-o{
          font-size: 16px;
          margin-left: 5px;
        }
        .containerSuggestions{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0.95;
          width: 100vw;
          max-width: 400px;
          position: relative;
        }
        .presentation{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .plan{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .overview{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 100%
        }
        .title{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .rating {
          display: flex;
          justify-content: flex-start;
          margin: 20px 0;
          font-size: 20px !important;
        }
        .infoField{
          margin: 20px 20px;
        }
        .infoField h2{
          font-family: 'Gotham-Bold';
          font-weight: bold;
          font-size: 16px;
          padding-bottom: 1.5vh;
          display: flex;
          align-items: center;
          text-transform: uppercase;
        }
        .infoField svg{
          margin-right: 10px;
        }
        .infoField p{
          padding-bottom: 1vh;
        }
        .infoField h4{
          padding-bottom: 1vh;
          font-family: 'Roboto'
        }
        // .detailsFooter{
        //   display: flex;
        //   justify-content: center;
        //   align-items: center;
        //   position: fixed;
        //   bottom:0px;
        //   width: 100vw;
        //   background-color: var(--blue);
        //   text-align: center;
        //   vertical-align: middle;
        //   padding-left: 1em;
        //   padding-right: 1em;
        //   padding-bottom: 1.5vh;
        //   padding-top: 1.5vh;
        // }
        // .detailsFooter a{
        //   text-decoration: none;
        //   color: #fff;
        // }
        .detailsFooter{
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Gotham';
          font-size: 15px;
          color: var(--pink);
          width: 168px;
          height: 51px;
          border-radius: 5px;
          background-color: var(--pink);
          margin-top: 2vh;
          margin-bottom: 2vh;
          opacity: 0.95;
          position: relative;
        }
        .detailsFooter a{
          text-decoration: none;
          color: #fff;
        }
        @media(min-width: 769px){
          // .detailsFooter{
          //   position: static;
          //   background-color: transparent;
          // }
          // .detailsFooter a{
          //   background: white;
          //   color: #000;
          // }
          .containerSuggestions {
            margin-top: 10px;
            border-radius: 5px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          }
        }
        @media(max-width: 769px){
          .detailsFooter{
            margin-top: 0px;
          }
        }
        // .submitButton {
        //   border: 2px solid #FFF;
        //   border-radius: 30px;
        //   text-align: center;
        //   height: 50px;
        //   font-size: 18px;
        //   width: 30vh;
        //   border-color: #fff;
        //   color: var(--pink);
        //   display: flex;
        //   flex-direction: column;
        //   justify-content:center;
        // }
        .material-icons{
          color: var(--pink);
        }
        .star{
          font-size: 30px;
        }
        .rating span{
          margin-right: 5px;
        }
        .containerSuggestions h3 {
          font-size: 16px;
          color: var(--pink);
          margin: 10px 0;
          font-weight: normal;
          font-family: 'Roboto';
        }
        .title h2 {
          font-family: 'Gotham';
          font-weight: bold;
          font-size: 2em;
        }
        strong {
          font-weight: 401;
        }
        .plan-card{
          background-color: #0da6ca;
          display: inline-block;
          white-space: pre;
          vertical-align: middle;
          height: 30px;
          line-height: 30px;
          position: absolute;
          padding-right: 0;
          right: -.39rem;
          padding-left: 1.5rem;
          color: #fff;
          margin-top: 6vh;
          background-clip: content-box;
        }
        .plan-card:before {
          content: " ";
          display: block;
          height: 0;
          width: 0;
          border-style: solid;
          border-width: 15px 9px 15px 15px;
          border-color: #0da6ca;
          border-left-color: transparent;
          position: absolute;
          left: 0;
          top: 0;
        }
        .plan-card:after {
          content: "";
          position: absolute;
          display: block;
          border-style: solid;
          bottom: -.39rem;
          right: 0;
          border-width: .39rem .39rem 0 0;
          border-color: #0da6ca transparent transparent;
        }
        .suggestionImage {
          min-height: 100vh;
          padding-top: 0;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bar {
          content:"";
          height:1px;
          background-color: #EDEDED;
          margin: 0px 20px;
        }
        a {
          text-decoration:underline;
          color:var(--pink);
        }
      `}</style>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  suggestions: state.suggestionReducer.suggestions,
  planoId: state.suggestionDetailsReducer.planoId,
  planDetail: state.suggestionDetailsReducer.planDetails,
  preference: state.prefHospitalReducer,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...SuggestionAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Details));
