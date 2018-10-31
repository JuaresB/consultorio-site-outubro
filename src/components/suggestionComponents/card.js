import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './rating';
import PlanImage from './planImage';
import { Transition } from 'react-transition-group'
import Icons from '../../components/icons'
import {ICONS} from '../../utils/ICONS';

export default class Suggestions extends React.Component {
  constructor(props){
    super(props);
    this.state={
      animation: false,
      infoMessage: "",
      showLink: true,
      labsAvailable: this.props.planDetail.numLaboratorios > 0,
    }
    this.handleQuestion = this.handleQuestion.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.onContract = this.onContract.bind(this);
  }
  componentDidMount(){
    if(this.props.animation){
      this.setState({
        animation: true
      }, ()=>{
        setTimeout(() =>{
          this.setState({
            animation: false
          })
        }, 1300)
      })
    }
  }

  handleQuestion(e){
    if(e.target.id === "abrangencia" && this.props.planDetail.abrangencia === "Nacional"){
      this.setState({
        infoMessage: 'Abrange Hospitais, Clínicas e Laboratórios credenciados ao Plano em Território Nacional. É indicado para quem costuma viajar.',
        showLink: false
      });
    }
    else if(e.target.id === "abrangencia" && this.props.planDetail.abrangencia === "Regional"){
      this.setState({
        infoMessage: 'A cobertura deste plano inclui somente Hospitais, Clínicas e Laboratórios credenciados ao Plano na sua região. É indicado para quem não costuma viajar muito.',
        showLink: false
      });
    }
    else if(e.target.id === "rede"){
      var infoLabs;
      if(this.state.labsAvailable){
        infoLabs = `e ${this.props.planDetail.numLaboratorios} laboratórios`;
      }else{
        infoLabs = ``;
      }
      this.setState({
        infoMessage: `A Rede Credenciada deste plano conta com ${this.props.planDetail.numHospitais} hospitais ${infoLabs}. Para conferir a lista completa `,
        showLink: true,
      });
    }
    else if(e.target.id === "acomodacao" && this.props.planDetail.acomodacao === "Apartamento"){
      this.setState({
        infoMessage: 'No caso de internação, esta acomodação dá direito a um quarto particular, com banheiro próprio e privacidade. O direito de acompanhante depende do contrato, mas costuma ser permitido ao acompanhante permanecer no quarto em tempo integral. Para saber mais ',
        showLink: true
      });
    }
    else if(e.target.id === "acomodacao" && this.props.planDetail.acomodacao === "Enfermaria"){
      this.setState({
        infoMessage: 'Enfermaria é um tipo de acomodação menos exclusivo. Se o beneficiário precisar ser internado para a realização de algum exame ou procedimento, como uma cirurgia por exemplo, ele ficará em um ambiente com outros pacientes. Para mais informações ',
        showLink: true
      });
    }
    else if(e.target.id === "precoMedio"){
      this.setState({
        infoMessage: 'Este valor se refere a uma média por pessoa no contrato do Plano (valor total dividido pelo número de pessoas). Ele pode sofrer alterações devido a reajustes nas próximas mensalidades.',
        showLink: false
      });
    }
    else if(e.target.id === "precoTotal"){
      this.setState({
        infoMessage: 'Este valor se refere à mensalidade total a ser paga e é calculado como soma do valor referente a cada vida em contrato.',
        showLink: false
      });
    }
    if(this.props.updateParent){
      this.props.updateParent();
    }
  }

  handleDetails(e){
    e.preventDefault();
    const planoId = this.props.planDetail.planoId;
    this.props.onHandleDetails(planoId);
  }

  onContract(e){
    e.preventDefault()
    const planoId = this.props.planDetail.planoId;
    this.props.onContract(planoId);
  }

  render(){
    const durationFadeOut = 700
    const defaultStyle = {
      transition: `background-color ${durationFadeOut}ms ease-in-out`,
      backgroundColor: "#FFF",
      borderRadius: 5,
    }
    const transitionStyles = {
      entering: { backgroundColor: "#FFF" },
      entered:  { backgroundColor: "#E5F2F8" },
      exiting: { backgroundColor: "#E5F2F8" },
      exited: { backgroundColor: "#FFF" }
    }
    var displayLaboratorios;
    if(this.state.labsAvailable > 0){
      displayLaboratorios = this.props.planDetail.numLaboratorios;
    }else{
      displayLaboratorios = "Indisponível";
    }
    return(
    <React.Fragment>
      <div className="containerSuggestions">
        <div className="overview">
          <PlanImage operadora={this.props.planDetail.nomeOperadoraFantasia} onClick={this.handleDetails}/>
          <div className="title">
            <h3 onClick={this.handleDetails}>{this.props.planDetail.planoNome}</h3>
            <h3 onClick={this.handleDetails}>{this.props.planDetail.nomeOperadoraFantasia}</h3>
            <Rating value={this.props.planDetail.nota} color="var(--pink)" size={11}/>
          </div>
        </div>
        <span className="bar"></span>
        <div className="info">
          <div className="infoList">
            <Transition in={this.state.animation} timeout={durationFadeOut}>
            {state => (
              <div
                style={{
                ...defaultStyle,
                ...transitionStyles[state]
                }}
                className="infoItem"
              >
                <h3>
                  <Icons icon={ICONS.ABRANGENCIA} color={"var(--blue)"} />
                  <strong onClick={this.handleQuestion} id="abrangencia">
                    {this.props.planDetail.abrangencia}
                  </strong>
                </h3>
              </div>
            )}
            </Transition>
            <div className="infoItem">
              <h3 onClick={this.handleQuestion} id="rede">
                <Icons icon={ICONS.HOSPITAIS} color={"var(--blue)"} />
                Hospitais
              </h3>
              <span>{this.props.planDetail.numHospitais}</span>
            </div>
            <div className="infoItem">
              <h3 onClick={this.handleQuestion} id="precoMedio">
              <Icons icon={ICONS.PRECO_MEDIO} color={"var(--blue)"} />
              * Preço Médio
              </h3>
              <span>R${parseFloat(this.props.planDetail.media).toFixed(2)}</span>
            </div>
          </div>
          <div className="infoList">
            <div className="infoItem">
              <h3>
                <strong onClick={this.handleQuestion} id="acomodacao">
                  <Icons icon={ICONS.ACOMODACAO} color={"var(--blue)"} />
                  {this.props.planDetail.acomodacao}
                </strong>
              </h3>
            </div>
            <div className="infoItem">
              <h3 onClick={this.handleQuestion} id="rede">
                <Icons icon={ICONS.LABORATORIOS} color={"var(--blue)"} />
                Laboratórios
              </h3>
              <span>{displayLaboratorios}</span>
            </div>
            <div className="infoItem priceItem">
              <h3 onClick={this.handleQuestion} id="precoTotal">
                <Icons icon={ICONS.PRECO_TOTAL} precoTotal={true} color={"var(--blue)"} />
                * Preço Total
              </h3>
              <span>R${parseFloat(this.props.planDetail.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
        {(this.state.infoMessage)&&
          <React.Fragment>
            <span className="bar"></span>
            <div className="addInfo">
              <p>{this.state.infoMessage}{this.state.showLink && <a to="/suggestionDetails" onClick={this.handleDetails}>clique aqui.</a>}</p>
            </div>
          </React.Fragment>
        }
        <span className="bar"></span>
        <div className="footerSuggestion">
          <Link onClick={this.onContract} to="/contract" className="buttonSuggestion">Tenho Interesse</Link>
          <div className="details" onClick={this.handleDetails}>
            <a>Saiba mais</a>
          </div>
        </div>
        {this.props.planDetail.entidadeClasseNome&&(
          <span className="observation">- plano por adesão pela {this.props.planDetail.administradora} e {this.props.planDetail.entidadeClasseNome}</span>
        )}
        {this.props.showHospitalar&&this.props.planDetail.hospitalar === "Sim" &&(
          <span className="observation">- plano hospitalar</span>
        )}
        {this.props.showAmbulatorial&&this.props.planDetail.ambulatorial === "Sim" &&(
          <span className="observation">- plano ambulatorial</span>
        )}
        {this.props.showCoparticipacao&&(this.props.planDetail.coparticipacao === "Sim")&&(
          <span className="observation">- plano com coparticipação</span>
        )}
        {this.props.showWithoutHospital&&!this.props.planDetail.satisfazPreferencia&&(
          <span className="observation">- plano sem sua preferência de hospital</span>
        )}
      </div>
      <style jsx="true">{`
        .containerSuggestions p{
          text-indent: 2em;
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
          padding: 24px;
          border-radius: 5px;
          box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          background-size: cover;
          margin-top: 2vh;
          opacity: 0.95;
          width: 90vw;
          max-width: 400px;
          position: relative;
        }
        .presentation{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .overview{
          display: flex;
          justify-content: flex-start;
          min-width: 100%;
          margin-bottom: 17px;
        }
        .title{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          margin: 2px 0px 0px 20px;
        }
        .title h3{
          margin: 0px 0px 2px 0px !important;
          font-family: "Gotham" !important;
          color: black !important;
          font-weight: normal !important;
        }

        .info{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .infoList{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .infoItem{
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-family: 'Gotham';
          padding: 10px 0px;
          cursor: pointer;
        }
        .infoItem span{
          font-size: 14px;
          display: flex;
          justify-content: space-evenly;
          color:  var(--lightGrey);
        }
        .infoItem h3{
          font-family: 'Gotham' !important;
          color: #000 !important;
        }
        .infoItem svg{
          margin-right: 5px;
        }
        .infoItem img{
          height: 30px;
        }
        .material-icons{
          color: var(--pink);
        }
        .add{
          font-size: 17px;
          margin-left:2px;
          vertical-align: sub;
        }
        .prices{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .buttonSuggestion {
          border-radius: 5px;
          text-align: center;
          font-size: 13px;
          width: 130px;
          height: 42px;
          background-color: var(--pink);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content:center;
          margin-right: 5px;
        }
        .footerSuggestion{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 17px;
          display: flex;
          font-family: 'Gotham';
          height: 42px;
        }
        .footerSuggestion a{
          text-decoration: none;
          font-size: 13px;
        }
        .details{
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pink);
          font-size: 14px;
          border-radius: 5px;
          border: solid 1px var(--pink);
          width: 116px;
          height: 42px;
        }
        .details a{
          vertical-align: middle;
        }
        .details i{
          margin-left: 10px;
          color: #989898;
          font-size: 14px;
        }
        .addInfo{
          padding: 15px 0px;
        }
        .addInfo p{
          text-align: left;
        }
        .addInfo a{
          text-decoration: underline;
          color: var(--blue);
          cursor: pointer;
        }
        .containerSuggestions h3 {
          font-size: 14px;
          color: var(--pink);
          margin: 0px 0;
          font-weight: normal;
          font-family: Roboto;
        }

        .infoTipo h3 {
          font-weight: bold;
        }
        .containerSuggestions h2 {
          font-family: 'Gotham';
          font-weight: bold;
          font-size: 24px;
          //max-width:60%
        }
        strong {
          font-weight: 401;
        }
        .plan-card{
          background-color: var(--blue);
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
        .observation{
          margin-top: 10px;
          font-family: Gotham;
          font-size: 13px;
        }
        .bar {
          content:"";
          height: 1px;
          background-color: #EDEDED;
        }
      `}</style>
    </React.Fragment>
    )
  }
}
