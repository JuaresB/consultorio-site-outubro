import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import MultiCombobox from '../../components/multiCombobox'
import * as FlowAction from '../../action/FlowAction';
import * as RegionAction from '../../action/form/RegionAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Region extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      visibleBody: false,
      regionList: [],
      error: false
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
    },()=>{
      setTimeout(()=>{
        this.inputElement.current.focus()
      }, 600)
    });
  }
  onChangeAnswers(answers){
    this.props.action.setRegions(answers)
  }
  onClick(e){
    e.preventDefault()
    if(this.props.regions.length > 0){
      this.setState({
        visibleBody: false,
        visible: false
      },()=>{
        setTimeout(()=>{
          this.props.action.formNextPageAction()
        }, 600)
      })
    } else {
      this.setState({
        error: true,
        errorMessage: "Por favor, preencha o campo para prosseguir"
      })
    }
  }
  render(){
    return(
      <SignupLayout
        next= {'/signup/newregion'}
        title= "Em quais regiões deseja atendimento?"
        onClick= {this.onClick}
        visible= {this.state.visible}
        visibleBody= {this.state.visibleBody}
      >
        <MultiCombobox
          list = {this.props.regionList}
          error = {this.state.error}
          errorMessage = {this.state.errorMessage}
          inputRef = {this.inputElement}
          callbackParent = {this.onChangeAnswers}
        />
      </SignupLayout>
  )}
}
const mapStateToProps = (state) => ({
  regionList: state.locationReducer.regionList,
  regions: state.regionReducer.regions
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({...RegionAction, ...FlowAction}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Region);
