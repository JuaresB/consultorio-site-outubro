import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import MultiCombobox from '../../components/multiCombobox'
import * as HospitalAction from '../../action/form/HospitalAction';
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
      error: false,
      errorMessage: "",
      loading: false
    }
    if(this.props.hospitals.length === 0){
      this.props.action.setHospitals(["Não tenho preferêcia por nenhum hospital"])
    }
    this.inputElement = React.createRef()
    this.onChangeAnswers = this.onChangeAnswers.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visibleBody: true,
      visible: true,
    });
  }
  onChangeAnswers(answers){
    this.props.action.setHospitals(answers)
  }
  onClick(e){
    e.preventDefault()
    if(this.props.hospitals.length === 0){
      this.setState({
        visible:false,
        visibleBody: false
      }, () => {
        setTimeout(() => {
          this.props.action.setHospitals(["Não tenho preferêcia por nenhum hospital"])
          this.props.action.AB_formEndAction()
        },600)
      });
    } else {
      this.setState({
        visible:false,
        visibleBody: false
      }, () => {
        setTimeout(() => this.props.action.formEndAction(),600)
      });
    }
  }
  render(){
    var list = this.props.hospitalList.slice()
    list.unshift("Não tenho preferêcia por nenhum hospital")
    return(
      <React.Fragment>
        <SignupLayout
          next= {'/signup/region'}
          title= "Em quais hospitais deseja atendimento?"
          onClick= {this.onClick}
          visible= {this.state.visible}
          visibleBody= {this.state.visibleBody}
        >
          <MultiCombobox
            list = {list}
            inputRef = {this.inputElement}
            callbackParent = {this.onChangeAnswers}
            error = {this.state.error}
            errorMessage = {this.state.errorMessage}
            fixedOption = "Não tenho preferêcia por nenhum hospital"
          />
        </SignupLayout>
        {this.state.loading &&
          <div className="load">
            <BeatLoader color={'var(--pink)'} loading={true} />
          </div>
        }
        <style jsx="true">{`
          .load{
            width: 60px;
            top: 50vh;
            right: 50vw;
            margin-right: -30px;
            position: fixed;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  hospitalList: state.locationReducer.hospitalList,
  hospitals: state.hospitalReducer.hospitals
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({...HospitalAction, ...FlowAction}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Hospital);
