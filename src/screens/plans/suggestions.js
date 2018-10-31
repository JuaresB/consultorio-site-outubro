import React from 'react';
import mixpanel from '../../components/mixpanel';
import Filter from '../../components/suggestionComponents/filter';
import Header2 from '../../components/header-desktop/header2';
import { withRouter } from 'react-router-dom';
import * as SuggestionAction from '../../action/SuggestionAction';
import * as SuggestionDetailsAction from '../../action/SuggestionDetailsAction';
import * as HuggyAction from '../../action/HuggyAction'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BeatLoader } from 'react-spinners';
import SuggestionSlider from '../../components/suggestionComponents/suggestionSlider';

class Suggestions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
    };
    this.onClick = this.onClick.bind(this);
    this.dbRequest = this.dbRequest.bind(this);
    this.onHandleDetails = this.onHandleDetails.bind(this);
    this.onContract = this.onContract.bind(this);
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    this.props.action.addHuggyWidgetAction()
  }

  dbRequest(){
    this.props.action.getSuggestionsAction();
  }

  async onClick(e){
    if(e.target.id==='regional'){
      this.props.action.setSuggestionShowRegionalAction(!this.props.suggestionShowRegional);
    }else if(e.target.id==='nacional'){
      this.props.action.setSuggestionShowNacionalAction(!this.props.suggestionShowNacional);
    }else if(e.target.id==='enfermaria'){
      this.props.action.setSuggestionShowEnfermariaAction(!this.props.suggestionShowEnfermaria);
    }else if(e.target.id==='apartamento'){
      this.props.action.setSuggestionShowApartamentoAction(!this.props.suggestionShowApartamento);
    }else if(e.target.id === 'cooparticipacao'){
      this.props.action.setShowCoparticipacaoAction(!this.props.showCoparticipacao);
    }else if(e.target.id === 'hospitais'){
      this.props.action.setShowWithoutHospitalAction(!this.props.showWithoutHospital);
    }else if(e.target.id === 'preferencia'){
      this.props.action.setShowWithoutHospitalAction(!this.props.showWithoutHospital);
    }else if(e.target.id === 'hospitalar'){
      this.props.action.setShowHospitalarAction(!this.props.showHospitalar);
    }else if(e.target.id === 'regioes'){
      this.props.action.setShowOutsideRegionAction(!this.props.showOutsideRegion)
    }
    this.dbRequest();
  }

  onHandleDetails(planoId){
    this.setState({
      loading: true
    });
    this.props.action.onSuggestionDetailsButtonAction(planoId)
  }

  onContract(planId){
    this.props.action.onSuggestionPickButtonAction(planId);
  }

  render(){
    let rows
    rows = this.props.suggestions.map((e, index) => {
    return(
      <div className="suggestionSlider" key = {e.operadora}>
        <SuggestionSlider
          animation = {index === 0}
          plans = {e.plans}
          showHospitalar = {this.props.showHospitalar}
          showAmbulatorial = {this.props.showAmbulatorial}
          showCoparticipacao = {this.props.showCoparticipacao}
          showWithoutHospital = {this.props.showWithoutHospital}
          onHandleDetails = {this.onHandleDetails}
          onContract = {this.onContract}
        />
      </div>);
    });

    let numPlans = 0;
    for(let suggestion of this.props.suggestions){
      numPlans += suggestion.plans.length;
    }

    return(
    <React.Fragment>
      <div className="suggestionImage">
        <Header2 />
        {(rows.length === 0)&&(
          <div className="suggestionText">
            <div className="initialText">
              Não achamos planos para você, experimente mudar suas opções de filtro
            </div>
            <Filter
              onClick={this.onClick}
            />
          </div>
        )}
        {rows.length !==0 &&
          <React.Fragment>
            <div className="suggestionText">
              <div className="initialText">
                Achamos {numPlans === 1 ? 'um' : numPlans} plano{numPlans === 1 ? '' : 's'} perfeito{numPlans === 1 ? '' : 's'} para você!
              </div>
              <Filter
                onClick={this.onClick}
              />
            </div>
            {rows}
            <div className="suggestionText">
              <div className="priceAlert">
                <span>* Podem haver divergências entre o preço real e o informado devido a atualizações.</span>
              </div>
            </div>
          </React.Fragment>
        }
      </div>
      {this.state.loading&&<div className="loadAnimation">
        <BeatLoader color={'var(--pink)'} loading={true} />
      </div>}
      <style jsx="true">{`
        .initialText{
          font-family: 'Gotham', 'Roboto';
          font-size: 16px;
          color: var(--pink);
          width: 90vw;
          text-align: center;
        }
        .priceAlert{
          font-family: 'Gotham';
          font-size: 11px;
          padding: 20px 5vh 20px 5vh;
        }
        .priceAlert span{
          font-size: 12px;
          font-weight: bold
        }
        .checkbox, .radio{
          margin: 5px;
        }
        .suggestionImage {
          height: auto;
          min-height: 100vh;
          -webkit-filter: ${this.state.loading?"blur(6px)":"0"};
          filter: ${this.state.loading?"blur(6px)":"0"};
        }
        .suggestionText{
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .suggestionSlider{
          margin-bottom: 20px;
        }
        .loadAnimation{
          width: 60px;
          top: 50vh;
          right: 50vw;
          margin-right: -30px;
          position: fixed;
        }
        .returnIcon{
          color: #fff;
          vertical-align: sub;
        }
        .return{
          margin-top: 2vh;
          padding-left: 2vh;
          color: #fff;
          font-size: 20px;
          font-family: gotham;
          align-self: flex-start;
        }
        @media(max-width: 360px){
          .initialText{
            font-size: 14px;
          }
        }
      `}</style>
    </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  suggestionShowRegional: state.suggestionReducer.showRegional,
  suggestionShowNacional:state.suggestionReducer.showNacional,
  suggestionShowEnfermaria: state.suggestionReducer.showEnfermaria,
  suggestionShowApartamento: state.suggestionReducer.showApartamento,
  suggestions: state.suggestionReducer.suggestions,
  hospitalType: state.prefHospitalReducer.hospitalType,
  showRegional: state.abrangenciaReducer.showRegional,
  showNacional:state.abrangenciaReducer.showNacional,
  showEnfermaria: state.acomodacaoReducer.showEnfermaria,
  showApartamento: state.acomodacaoReducer.showApartamento,
  showHospitalar: state.suggestionReducer.showHospitalar,
  showAmbulatorial: state.suggestionReducer.showAmbulatorial,
  showCoparticipacao: state.suggestionReducer.showCoparticipacao,
  showWithoutHospital: state.suggestionReducer.showWithoutHospital,
  showOutsideRegion: state.suggestionReducer.showOutsideRegion,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...SuggestionAction, ...SuggestionDetailsAction, ...HuggyAction, ...FlowAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Suggestions));

