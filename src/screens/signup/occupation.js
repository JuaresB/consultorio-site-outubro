import React from 'react';
import SignupLayout from '../../components/layouts/signup';
import profissoes from '../../utils/profissoes.json';
import * as OcupacaoAction from '../../action/form/OcupacaoAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MultiCombobox from '../../components/multiCombobox';
import Input from '../../components/input';

class Occupation extends React.Component {
  constructor(props){
    super(props);

    var occupationList = this.props.occupationList;
    if(occupationList.length <= 2){
      occupationList = profissoes;
    }

    var occupationNotFound = this.props.occupationNotFound;
    this.props.action.setOccupationNotFoundAction(occupationNotFound);

    this.state={
      occupationList: occupationList,
      occupationNotFound: occupationNotFound,
      visible: false,
      visibleBody: false,
      error: false,
      errorMessage: ""
    }
    this.onChange = this.onChange.bind(this);
    this.onClick =this.onClick.bind(this);
    this.onChangeOccupationNotFound = this.onChangeOccupationNotFound.bind(this);
    this.inputElement = React.createRef()
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visible:true,
      visibleBody: true
    },()=>{
      setTimeout(()=>{
        this.inputElement.current.focus()
      }, 600)
    });
  }

  onChange(childAnswer){
    this.props.action.setOcupacaoAction(childAnswer);
  }

  onChangeOccupationNotFound(event){
    this.setState({
      occupationNotFound: event.target.value,
    });
    this.props.action.setOccupationNotFoundAction(event.target.value);
  }

  onClick(e){
    e.preventDefault()
    if(this.props.ocupacao.length > 0){
      this.setState({
        visible:false,
        visibleBody: false
      }, () => {
        setTimeout(() => this.props.action.formNextPageAction(),600)
      });
    }
    else {
      this.setState({
        error: true,
        errorMessage: "Por favor, preencha o campo para prosseguir"
      })
    }
  }

  render(){
    const ocupacao = this.props.ocupacao[0];
    const paraQuem = this.props.paraQuem
    const title = paraQuem === "other"?"Qual a ocupação, formação ou profissão dele(a)?":"Qual sua ocupação, formação ou profissão atual?"

    return(
      <React.Fragment>
        <SignupLayout
          next = "/signup/hospital"
          title = {title}
          subtitle = "*O preço pode variar de acordo com a profissão"
          onClick = {this.onClick}
          visible = {this.state.visible}
          visibleBody = {this.state.visibleBody}
          formSignupMinHeight = {"27.5vh"}
        >
            <MultiCombobox
              list = {this.state.occupationList}
              error = {this.state.error}
              errorMessage = {this.state.errorMessage}
              //placeHolder = "Profissão"
              default = {ocupacao}
              name = "occupation"
              callbackParent = {this.onChange}
              //onClick = {this.onClick}
              inputRef = {this.inputElement}
              fixedOption = 'Não encontrei minha profissão'
            />
            {ocupacao === 'Não encontrei minha profissão' && (
            <div className="ocupationInput">
              <Input
                type = 'text'
                placeholder = 'Profissão'
                errorMessage = 'Esse campo deve ser preenchido'
                color = "#333"
                onChange = {this.onChangeOccupationNotFound}
                value = {this.state.occupationNotFound}
              />
               </div>
            )}
        </SignupLayout>
        <style jsx="true">{`
          .labelOccupation {
            width: 100%;
            display: flex;
            justify-content: center;
            position: absolute;
            z-index: 10;
          }
          .ocupationInput{
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 3vh 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ocupacao: state.ocupacaoReducer.ocupacao,
  occupationNotFound: state.ocupacaoReducer.occupationNotFound,
  occupationList: state.locationReducer.occupationList,
  paraQuem: state.paraQuemReducer.paraQuem
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...OcupacaoAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Occupation);
