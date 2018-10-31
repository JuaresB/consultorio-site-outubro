import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import Input from '../../components/input'
import CombobxWithSuggestion from '../../components/comboboxWithSuggestion'
import * as PrefHospitalAction from '../../action/form/PrefHospitalAction';
import * as SuggestionAction from '../../action/SuggestionAction'
import * as LoginAction from '../../action/LoginAction'
import * as AnswerAction from '../../action/AnswerAction'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BeatLoader } from 'react-spinners';

class Hospital extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      visibleBody: false,
      blink: '',
      loading: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    if(this.props.hospitalType){
      this.setState({
        visible:true,
      })
    }
    this.setState({
      visibleBody: true
    })
  }

  handleClick(e) {
    if(e.target.name === "bairro"){
      this.props.action.setHospitalTypeAction("bairro")
      this.props.action.setHospitalAction(this.props.regionList[0])
    }else if(e.target.name === "especifico"){
      this.props.action.setHospitalTypeAction("especifico")
      this.props.action.setHospitalAction(this.props.hospitalList[0])
    }
    this.setState({
      visible: true
    })
  }

  onChange(childAnswer, childName){
    if(childName === "bairro"){
      this.props.action.setHospitalTypeAction("bairro")
      this.props.action.setHospitalAction(childAnswer)
    }
    if(childName === "hospital"){
      this.props.action.setHospitalTypeAction("especifico")
      this.props.action.setHospitalAction(childAnswer)
    }
  }

  onClick(e){
    e.preventDefault()
    this.setState({
      loading: true
    })
    this.props.action.formEndAction()
  }

  render(){
    var formSignupMinHeight;
    var nextPage;
    const paraQuem = this.props.paraQuem
    const title = paraQuem === "personal"?"Eu prefiro ser atendido em":paraQuem === "other"?"Ele(a) prefere ser atendido em":paraQuem === "family"?"Minha família prefere ser atendida em":"Minha empresa prefere ser atendida em"

    if(this.state.bairroSelected||this.state.especificoSelected){
      nextPage = 'signup/hospital';
    }
    else{
      nextPage = '/suggestions';
    }
    if((this.props.hospitalType==="bairro")&&(this.props.regionList.length > 0)){
      formSignupMinHeight = "55vh";
      var hospitalPreferenceTopMargin;
      if(this.props.isCapital){
        hospitalPreferenceTopMargin = "75px";
      }else{
        hospitalPreferenceTopMargin = "0";
      }
    }else if((this.props.hospitalType==="especifico")&&(this.props.hospitalList.length > 0)){
      formSignupMinHeight = "55vh";
    }else{
      formSignupMinHeight = "auto";
    }
    return (
      <React.Fragment>
        <SignupLayout
          next= {'/' + nextPage}
          title= {title}
          onClick= {this.onClick}
          visible= {this.state.visible}
          visibleBody= {this.state.visibleBody}
          formSignupMinHeight= {formSignupMinHeight}
        >
          <div className="labelRegionPreference">
            <label className={`radio-box  ${(this.props.hospitalType==="bairro") ? 'checked' : ''}`} >Hospitais da região
              <input type="radio" name="bairro" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
            {(this.props.isCapital)&&(this.props.hospitalType==="bairro")&&(this.props.regionList.length > 0)&&
            (<div className="labelHospitalRegion">
              <CombobxWithSuggestion
                list={this.props.regionList}
                placeHolder="Bairro"
                default={this.props.hospital}
                name="bairro"
                callbackParent={this.onChange}
                onClick={this.onClick}
              />
            </div>)}
            {(this.props.hospitalType==="bairro")&&(this.props.regionList.length === 0)&&
            (<div>
              <Input
                type='bairro'
                placeholder='Qual seu bairro?'
                color='black'
                errorMessage='Esse campo deve ser preenchido'
                value={this.props.hospital}
                onChange={(e) => this.onChange(e.target.value, 'bairro')}/>
            </div>)}
          </div>
          <div className="labelHospitalPreference">
            <label className={`radio-box  ${(this.props.hospitalType==="especifico") ? 'checked' : ''}`} >Hospital específico
              <input type="radio" name="especifico" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
            {(this.props.hospitalType==="especifico")&&(this.props.hospitalList.length > 0)&&
            (<div className="labelHospitalSpecific">
              <CombobxWithSuggestion
                list={this.props.hospitalList}
                placeHolder="Hospital"
                default={this.props.hospital}
                name="hospital"
                callbackParent={this.onChange}
                onClick={this.onClick}
              />
            </div>)}
            {(this.props.hospitalType==="especifico")&&(this.props.hospitalList.length === 0)&&
            (<div>
              <Input
                type='especifico'
                placeholder='Quais hospitais?'
                color='black'
                errorMessage='Esse campo deve ser preenchido'
                value={this.props.hospital}
                onChange={(e) => this.onChange(e.target.value, 'hospital')}/>
            </div>)}

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
          .labelNoPreference,
          .labelRegionPreference {
            width: 100%;
            margin: 20px 0px;
          }
          .labelHospitalPreference {
            width: 100%;
            margin: ${hospitalPreferenceTopMargin} 0 20px;
          }
          .labelHospitalRegion {
            width: 100%;
            display: flex;
            position: absolute;
            z-index: 5;
            margin-top: 10px;
          }
          .labelHospitalSpecific {
            width: 100%;
            display: flex;
            position: absolute;
            z-index: 5;
            margin-top: 10px;
          }
          .label {
            width: 100%;
            margin: 20px 0;
          }
          .label span {
            font-size: 14px;
            font-weight: 400;
            margin-right: 10px;
          }
          .input {
            user-select: none;
            padding: 5px 20px;
            background: #FFF;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            font-weight: 300;
            width: 65%;
            position: relative;
            padding-left: 30px;
            display: inline-block;
            border-radius: 5px;
          }
          .input.full {
            width: 100%;
          }
          .input input {
            width: 100%;
            height: 40px;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            outline: none;
            font-weight: 300;
          }
          .input input[type="number"] {
            width: 40px;
          }
          /* end input */
          /* Radio Button */
          .radio-box {
            cursor: pointer;
            user-select: none;
            padding: 15px 20px;
            background: #FFF;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            outline: none;
            font-weight: 400;
            width: 100%;
            position: relative;
            display: flex;
            padding-left: 50px;
            border-radius: 5px;
          }
          .radio-box input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
          }
          .radio-box.checked {
            background-color: var(--pink);
            color: #FFF;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  hospital: state.prefHospitalReducer.hospital,
  hospitalType: state.prefHospitalReducer.hospitalType,
  hospitalList: state.locationReducer.hospitalList,
  regionList: state.locationReducer.regionList,
  isCapital: state.locationReducer.isCapital,
  suggestions: state.suggestionReducer.suggestions,
  paraQuem: state.paraQuemReducer.paraQuem,
  telephoneDDD: state.telephoneReducer.telephoneDDD,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...PrefHospitalAction, ...SuggestionAction, ...LoginAction, ...AnswerAction, ...FlowAction }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
