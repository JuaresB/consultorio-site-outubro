import React from 'react';
import SignupLayout from '../../components/layouts/signup';
import cidades from '../../utils/cidades.json';
import estados from '../../utils/estados.json';
import * as LocationAction from '../../action/LocationAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CombobxWithSuggestion from '../../components/comboboxWithSuggestion';
import { BeatLoader } from 'react-spinners';

class City extends React.Component {
  constructor(props) {
    super(props);
    var stateOptions = estados.map(x => {
      return x.Nome;
    });
    var state = this.props.state;
    if(!state){
      state = stateOptions[0];
      this.props.action.setStateAction(state);
    }
    var cityOptions = cidades.estados.find(estadoElement => {return estadoElement.nome === state}).cidades;
    var city = this.props.city;
    if(!city){
      city = cityOptions[0];
      this.props.action.setCityAction(city);
      this.props.action.geoLocationIpAction().then( () => {
        this.props.action.geoLocationBrowserAction()
      }).catch(()=>{
        this.props.action.geoLocationBrowserAction()
      });
    }
    var isCapital = (city === cityOptions[0]);
    this.props.action.setIsCapitalAction(isCapital);
    this.state = {
      stateOptions: stateOptions,
      cityOptions: cityOptions,
      visible: false,
      visibleBody: false,
      loading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.props.action.viewPageAction()
    this.setState({
      visible:true,
      visibleBody: true
    });
  }

  onChange(childAnswer, childName){
    if(childName === 'state'){
      const state = childAnswer;
      const cityOptions = cidades.estados.find( estado => {return estado.nome === childAnswer}).cidades;
      var city = cityOptions[0];
      this.setState({
          cityOptions: cityOptions,
          isCapital: (city === cityOptions[0]),
      });
      this.props.action.setStateAction(state);
      this.props.action.setCityAction(city);
    }else{
      const city = childAnswer;
      const isCapital = (city === this.state.cityOptions[0]);
      this.props.action.setIsCapitalAction(isCapital);
      this.props.action.setCityAction(city);
    }
  }

  onClick(e){
    e.preventDefault();
     this.setState({
       loading: true
     });
    this.props.action.regionHospitalOccupationByState().then(()=>{
      this.setState({
        visibleBody: false,
        visible: false,
        loading: false
      },() => {
        setTimeout(() => this.props.action.formNextPageAction(),600)
      });
    });
  }

  render() {
    const cnpj = this.props.cnpj;
    const nextPage = (cnpj==="cnpj" || cnpj==='mei')?'hospital':'occupation';
    const paraQuem = this.props.paraQuem
    const title = paraQuem === "personal"?'Eu moro em':paraQuem === "other"?"Ele mora em":paraQuem === "enterprise"?"Minha empresa fica em":"Nós moramos em"
    return (
      <React.Fragment>
        <SignupLayout
          next={'/signup/'+nextPage}
          title={title}
          onClick={this.onClick}
          visible={this.state.visible}
          visibleBody={this.state.visibleBody}
          formSignupMinHeight = {"40vh"}
        >
          <div className="labelCityEstado">
            <span>Estado</span>
            <CombobxWithSuggestion
              list={this.state.stateOptions}
              placeHolder="Estado"
              default={this.props.state}
              name="state"
              callbackParent={this.onChange}
              onClick={this.onClick}
            />
          </div>
          <div className="labelCityCidade">
            <span>Cidade</span>
            <CombobxWithSuggestion
              list={this.state.cityOptions}
              placeHolder="Cidade"
              default={this.props.city}
              name="city"
              callbackParent={this.onChange}
              onClick={this.onClick}
            />
          </div>
        </SignupLayout>
        {this.state.loading &&
          <div className="load">
            <BeatLoader color={'var(--pink)'} loading={true} />
          </div>
        }
        <style jsx="true">{`
          .signup{
            -webkit-filter: ${this.state.loading?"blur(6px)":"0"};
            filter: ${this.state.loading?"blur(6px)":"0"};
          }
          .load{
            width: 60px;
            top: 50vh;
            right: 50vw;
            margin-right: -30px;
            position: fixed;
          }

          .labelCityEstado {
            width: 100%;
            display: flex;
            position: absolute;
            z-index: 10;
          }

          .labelCityCidade {
            width: 100%;
            margin: 70px 0;
            display: flex;
            position: absolute;
            z-index: 5;
          }

          .labelCityEstado span,
          .labelCityCidade span {
            font-size: 14px;
            font-weight: 400;
            margin-right: 10px;
            margin-top: 18px;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  state: state.locationReducer.state,
  city: state.locationReducer.city,
  cnpj: state.cnpjReducer.cnpj,
  paraQuem: state.paraQuemReducer.paraQuem
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...LocationAction, ...FlowAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(City);

