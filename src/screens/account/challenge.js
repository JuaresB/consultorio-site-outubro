import React, { Component } from 'react'
import SignupLayout from '../../components/layouts/signup'
import Input from '../../components/input'
import * as LoginAction from '../../action/LoginAction'
import * as FlowAction from '../../action/FlowAction';
import AuthApi from '../../api/AuthApi'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BeatLoader } from 'react-spinners'

class Challenge extends Component {
  constructor(props){
    super(props)
    this.state = {
      visibleBody: false,
      visible: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickNotReceive = this.onClickNotReceive.bind(this)
    this.onClickNewCode = this.onClickNewCode.bind(this)
    this.inputElement = React.createRef()

    AuthApi.accountKitInit()
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visibleBody: true,
      visible: false
    },()=>{
      setTimeout(()=>{
        this.inputElement.current.focus()
      }, 600)
    })
  }

  onChange(e){
    const challengeAnswer = e.target.value
    this.props.action.setChallengeAnswerAction(challengeAnswer)
    if(challengeAnswer.length >= 6){
      this.props.action.onChallengeButtonAction()
    }
  }
  onClick(e){
    e.preventDefault()
    this.props.action.onChallengeButtonAction()
  }
  onClickNotReceive(e){
    e.preventDefault()
    this.props.action.onNotReceiveButtonAction()
  }
  onClickNewCode(e){
    e.preventDefault()
    this.props.action.onNewCodeButtonAction()
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
        bottomElement={<p className="termos1"><a href="#"onClick={this.onClickNotReceive}>Não recebi o código</a></p>}
        bottomElement2={<p className="termos2"><a href="#"onClick={this.onClickNotReceive}>Não recebi o código</a></p>}
        >
          <React.Fragment>
            <div className="occupation">
              <Input
                type='text'
                placeholder='Código'
                errorMessage=''
                onChange={(e) => this.onChange(e)}
                color = "#333"
                inputRef= {this.inputElement}
                value={this.props.challengeAnswer}
              />
            </div>
            <span className="errorLabel">
              {this.props.challengeErrorValue&&<p>Código inválido tente novamente <br /> ou gere um <a href="#"onClick={this.onClickNewCode}> novo código</a></p>}
            </span>
            <style jsx="true">{`
                .termos1{
                  width: 250px;
                  margin-top: 10px;
                  text-align: center;
                  font-weight: 200;
                }
                .termos1 a{
                  color: var(--blue);
                }
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
                  text-align: center;
                }
                .occupation input{
                  text-align:center;
                }
                ::placeholder{
                  color: #DDD;
                  text-align: center
                }
                .signup{
                  -webkit-filter: ${this.props.challengeLoadingValue?"blur(6px)":"0"};
                  filter: ${this.props.challengeLoadingValue?"blur(6px)":"0"};
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
        {this.props.challengeLoadingValue &&
          <div className="load">
            <BeatLoader color={'var(--pink)'} loading={true} />
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  challengeAnswer: state.loginReducer.challengeAnswer,
  challengeErrorValue: state.challengeReducer.challengeErrorValue,
  challengeLoadingValue: state.challengeReducer.challengeLoadingValue
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...LoginAction, ...FlowAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
