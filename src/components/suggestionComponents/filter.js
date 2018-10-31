import React, { Component } from 'react'
import * as SuggestionAction from '../../action/SuggestionAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Filter extends Component{
  constructor(props){
    super(props)
    this.state = {
      active: false,
    }
    this.onClick = this.onClick.bind(this)
    this.showFilter = this.showFilter.bind(this)
    this.hideFilter = this.hideFilter.bind(this)
  }

  onClick(e){
    this.props.onClick(e)
  }

  showFilter(){
    this.setState({
      active: true
    })
  }

  hideFilter(){
    this.setState({
      active: false
    })
  }

  render(){
    const activeEnfermaria = this.props.showEnfermaria ? "activePink" : ""
    const activeApartamento = this.props.showApartamento ? "activePink" : ""
    const activeRegional = this.props.showRegional ? "activePink" : ""
    const activeNacional = this.props.showNacional ? "activePink" : ""
    const activeCooparticipacao = this.props.showCoparticipacao ? "activeBlue" : ""
    const activeHospital = this.props.showWithoutHospital ? "activeBlue" : ""
    const activeRegion = this.props.showOutsideRegion ? "activeBlue" : ""
    const activeHospitalar = this.props.hospitalar ? "activeBlue" : ""
    const activePreferencia = this.props.showWithoutHospital ? "activeBlue"  : ""

    return(
      <div className="filter">
        <div className="filterHead" >
          <div className="filterLabel"  onClick={this.showFilter}>
            <i className="fa fa-filter"></i>
            <h3>Filtro</h3>
          </div>
          {this.state.active&& <i className="material-icons" onClick={this.hideFilter}>clear</i>}
        </div>

        {this.state.active&&
          <div className="filterOptions">
            <div className="filterSet">
              <div
                className={"filterCard pinkCard "+activeRegional}
                id="regional"
                onClick={this.onClick}>
                Regional
              </div>
              <div
                className={"filterCard pinkCard "+activeNacional}
                id="nacional"
                onClick={this.onClick}>
                Nacional
              </div>
            </div>
            <div className="filterSet">
              <div
                className={"filterCard pinkCard "+activeEnfermaria}
                id="enfermaria"
                onClick={this.onClick}>
                Enfermaria
              </div>
              <div
                className={"filterCard pinkCard "+activeApartamento}
                id="apartamento"
                onClick={this.onClick}>
                Apartamento
              </div>
            </div>
            <div className="filterSet blueSet">
              <div
                id="cooparticipacao"
                className={"filterCard blueCard "+activeCooparticipacao}
                onClick={this.onClick}>
                Com Cooparticipação
              </div>
              {(this.props.hospitalType ==="bairro" && this.props.abVariation === "Single-Preference") &&
                <div
                  id="preferencia"
                  className={"filterCard blueCard "+activePreferencia}
                  onClick={this.onClick}>
                  Sem Hospitais em {this.props.hospital}
                </div>
              }
              {(this.props.hospitalType ==="especifico" && this.props.abVariation === "Single-Preference") &&
                <div
                  id="preferencia"
                  className={"filterCard blueCard "+activePreferencia}
                  onClick={this.onClick}>
                  Sem {this.props.hospital}
                </div>
              }
              {this.props.abVariation === "Multiple-Preferences" &&
                <div
                  id="regioes"
                  className={"filterCard blueCard "+activeRegion}
                  onClick={this.onClick}>
                  Fora das minhas regiões
                </div>}
              {(this.props.hospitals[0] !== "Não tenho preferêcia por nenhum hospital" && this.props.abVariation === "Multiple-Preferences") &&
                <div
                  id="hospitais"
                  className={"filterCard blueCard "+activeHospital}
                  onClick={this.onClick}>
                  Sem meus hospitais
                </div>}
              <div
                id="hospitalar"
                className={"filterCard blueCard "+activeHospitalar}
                onClick={this.onClick}>
                Hospitalares
              </div>
            </div>
          </div>
        }
        <style jsx="true">{`
          .material-icons{
            cursor: pointer;
          }
          .filter{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 15px 20px 15px 20px;
            border-radius: 5px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            background-size: cover;
            margin-top: 2vh;
            opacity: 0.95;
            width: 90vw;
            max-width: 400px;
            position: relative;
          }
          .filterHead{
            display: flex;
            justify-content: space-between;
          }
          .filterLabel{
            display: flex;
          }
          .filterLabel h3{
            font-family: 'Gotham','Roboto';
            color: ${this.state.active?"var(--pink)":"var(--lightGrey)"};
            font-weight: 100;
            font-size: 15px;
            padding-left: 5px;
            line-height: 16px;
          }
          .fa-filter{
            font-size: 15px;
            color: ${this.state.active?"var(--pink)":"var(--lightGrey)"};
            vertical-align: middle;
          }
          .filterOptions{
            display: flex;
            flex-direction: column;
          }
          .filterOptions p{
            margin-top: 10px;
            font-family: 'Gotham';
            font-weight: 100;
          }
          .filterSet{
            display: flex;
          }
          .blueSet{
            flex-wrap: wrap;
          }
          .filterCard{
            cursor: pointer;
            padding: 10px 15px 10px 15px;
            border-radius: 5px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            background-size: cover;
            margin-top: 2vh;
            margin-right: 10px;
            opacity: 0.95;
            max-width: 400px;
            position: relative;
            font-family: 'Gotham';
            font-size: 13px;
            height: 43px;
            display: flex;
            align-items: center;
          }
          .pinkCard{
            color: var(--pink);
          }
          .blueCard{
            color: var(--blue);
          }
          .activePink{
            color: white;
            background-color: var(--pink);
          }
          .activeBlue{
            color: white;
            background-color: var(--blue);
          }
        `}</style>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  showRegional: state.suggestionReducer.showRegional,
  showNacional:state.suggestionReducer.showNacional,
  showEnfermaria: state.suggestionReducer.showEnfermaria,
  showApartamento: state.suggestionReducer.showApartamento,
  showCoparticipacao: state.suggestionReducer.showCoparticipacao,
  showWithoutHospital: state.suggestionReducer.showWithoutHospital,
  showOutsideRegion: state.suggestionReducer.showOutsideRegion,
  hospitalType: state.prefHospitalReducer.hospitalType,
  hospital: state.prefHospitalReducer.hospital,
  hospitals: state.hospitalReducer.hospitals,
  hospitalar: state.suggestionReducer.showHospitalar,
  abVariation: state.abReducer.abPreference
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...SuggestionAction}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
