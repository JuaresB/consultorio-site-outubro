import React, { Component } from 'react'
import mixpanel from '../../components/mixpanel'
import SignupLayout from '../../components/layouts/signup'
import Input from '../../components/input'
import * as NameAction from '../../action/form/NameAction'
import * as EmailAction from '../../action/form/EmailAction'
import * as AnswerAction from '../../action/AnswerAction'
import * as LoginAction from '../../action/LoginAction'
import * as SuggestionAction from '../../action/SuggestionAction'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmailWithSuggestion from '../../components/emailWithSuggestion';
import { BeatLoader } from 'react-spinners'

class SignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      visibleBody: false,
      errorMessage: ""
    }
    this.onClick = this.onClick.bind(this)
    this.onChangeNome = this.onChangeNome.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.inputElement = React.createRef()
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visibleBody: true
    },()=>{
      setTimeout(()=>{
        this.inputElement.current.focus()
      }, 600)
    })
  }
  onChangeEmail(e){
    if(e.target.value && this.props.name){
      this.setState({
        visible: true
      })
    }
    this.props.action.setEmailAction(e.target.value)
  }
  onChangeNome(e){
    if(this.props.email && e.target.value){
      this.setState({
        visible: true
      })
    }
    this.props.action.setNameAction(e.target.value)
  }
  onClick(e){
    e.preventDefault()
    const emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(this.props.email.match(emailRegex)&&this.props.name){
      this.setState({
        loading: true
      })
      this.props.action.onSignUpButtonAction().catch(()=>{
        this.setState({
          loading: false,
          errorMessage: "Houve um erro com o seu cadastro."
        })
      })
    }
    else if(!this.props.email.match(emailRegex)){
      this.setState({
        errorMessage: "Esse não é um e-mail válido."
      })
    }
    else if(!this.props.name){
      this.setState({
        errorMessage: "Por favor, preencha seu nome."
      })
    }
  }
  render(){
    return(
      <React.Fragment>
        <SignupLayout
          next = "/signup"
          title = "Última etapa :)"
          onClick = {this.onClick}
          visible = {this.state.visible}
          visibleBody = {this.state.visibleBody}
          buttonMessage = "Mostrar recomendação"
          termos = {true}
        >
          <div className="signupNameInput">
            <Input
              type='text'
              placeholder='Nome'
              errorMessage='Esse campo deve ser preenchido'
              onChange={(e) => this.onChangeNome(e)}
              color = "#333"
              inputRef={this.inputElement}
              value = {this.props.name}
            />
          </div>
          <div className="signupEmailInput">
            <EmailWithSuggestion
              color = "#333"
              background-color = "#FFF"
              onClick = {(e) => this.onClick(e)}
              onChange = {(e) => this.onChangeEmail(e)}
            />
          </div>
          <span className="errorLabel">
            <p>{this.state.errorMessage}</p>
          </span>
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
            .signupNameInput {
              margin-bottom: 30px;
            }
            .errorLabel p{
              font-size: 15px !important;
              font-family: 'Roboto', sans-serif;
              color: #E74C3C;
              bottom: -5px;
              position: relative;
              padding-top: 10px;
              margin-top: -10px;
              margin-left: 10px;
            }
          `}</style>
        </SignupLayout>
        {this.state.loading &&
          <div className="load">
            <BeatLoader color={'var(--pink)'} loading={true} />
          </div>
        }
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  telephone: state.telephoneReducer.telephoneDDI,
  name: state.nameReducer.name,
  email: state.emailReducer.email,
  suggestions: state.suggestionReducer.suggestions
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...NameAction, ...EmailAction, ...AnswerAction, ...LoginAction, ...SuggestionAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
