import React, { Component } from 'react'
import SignupLayout from '../../components/layouts/signup'
import Input from '../../components/input'
import * as TelephoneAction from '../../action/form/TelephoneAction'
import * as LoginAction from '../../action/LoginAction'
import * as AnswerAction from '../../action/AnswerAction'
import * as SuggestionAction from '../../action/SuggestionAction'
import * as FlowAction from '../../action/FlowAction';
import AuthApi from '../../api/AuthApi'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Phone from '../../utils/phone'
import { BeatLoader } from 'react-spinners'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputPhoneValue: "",
      visibleBody: false,
      visible: false,
      error: false,
      loading: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.inputElement = React.createRef()

    AuthApi.accountKitInit()
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

  onChange(e){
    const inputPhoneValue = Phone.format(e.target.value)
    this.setState({ inputPhoneValue: inputPhoneValue })
    const phoneRegex = /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9)\d{4})\-?(\d{4}))$/g
    const a = inputPhoneValue.slice(1,3)
    const b = inputPhoneValue.slice(5,10)
    const c = inputPhoneValue.slice(11,15)

    const telephoneDDD = a+b+c
    const telephoneDDI = "+55"+a+b+c

    this.props.action.setTelephoneDDIAction(telephoneDDI)
    this.props.action.setTelephoneDDDAction(telephoneDDD)

    if(inputPhoneValue.match(phoneRegex)){
      this.setState({
        error: false,
      }, ()=> {
        setTimeout(()=>{
          this.onClick()
        },400)
      })
    }
  }
  onClick(){
    const phoneRegex = /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9)\d{4})\-?(\d{4}))$/g

    if(this.props.telephoneDDD.match(phoneRegex)){
      this.setState({
        loading: true
      })
      this.props.action.onLoginButtonAction()
    }
    else{
      this.setState({
        error: true,
      })
    }
  }
  render(){
    return(
      <React.Fragment>
        <SignupLayout
        next = "/login"
        title = "Falta muito pouco!"
        subtitle = "Preencha seus dados para ativar a tela de recomendações."
        onClick = {this.onClick}
        visible = {this.state.visible}
        visibleBody = {this.state.visibleBody}
        buttonMessage = "Confirmar"
        termos = {false}
        >
          <React.Fragment>
            <div className="occupation">
              <Input
                type='telefone'
                placeholder='Celular'
                onChange={(e) => this.onChange(e)}
                color = "#333"
                inputRef= {this.inputElement}
                pattern = "[0-9]*"
                value={this.state.inputPhoneValue}
              />
            </div>
            <span className="errorLabel">
              <p>{this.state.error&& "Por favor, digite um número válido"}</p>
            </span>
            <style jsx="true">{`
                .subtitle{
                  font-weight: bold !important;
                }
                .errorLabel p{
                  font-size: 15px !important;
                  font-family: 'Roboto', sans-serif;
                  color: #E74C3C;
                  bottom: -5px;
                  position: relative;
                  padding-top:10px;
                  margin-left: 10px;
                }
                .occupation input{
                  text-align:center;
                }
                ::placeholder{
                  color: #DDD;
                  text-align: center
                }
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
            `}</style>
          </React.Fragment>
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
  telephoneDDI: state.telephoneReducer.telephoneDDI,
  telephoneDDD: state.telephoneReducer.telephoneDDD,
  suggestions: state.suggestionReducer.suggestions
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...TelephoneAction, ...LoginAction, ...AnswerAction, ...SuggestionAction, ...FlowAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
