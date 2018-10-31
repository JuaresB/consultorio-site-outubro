import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import mixpanel from '../../components/mixpanel'
import * as ReasonAction from '../../action/form/ReasonAction'
import * as FlowAction from '../../action/FlowAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Reason extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errorMessage: '',
      blink: '',
      visible: false,
      visibleBody: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    const reason = this.props.reason
    this.setState({
      visibleBody: true,
    })
    if(reason){
      this.setState({
        visible:true,
      })
    }
  }
  handleClick(e){
    const reason = e.target.name
    this.props.action.setReasonAction(reason)
    this.setState({
      blink: reason,
    }, () => {
      setTimeout(() => {
        this.setState({
          blink:"",visibleBody:false
        }, ()=>setTimeout(()=>{
          this.props.action.formNextPageAction()
        },600))
      },700)
    })
  }

  onClick(e){
    e.preventDefault()
    this.setState({
      visible: false,
      visibleBody: false,
    },() => {
      setTimeout(()=>{
        this.props.action.formNextPageAction()
      },600)
    })
  }
  render(){
    const paraQuem = this.props.paraQuem
    const reason = this.props.reason
    return (
      <SignupLayout
        next= '/signup/'
        title= "Qual sua motivação para procurar o plano de saúde hoje?"
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
        <React.Fragment>
          {!(paraQuem === "enterprise")&&<div className="label">
            <label className={`radio-box  ${(reason==='losingPlan') ? 'checked' : ''} ${(this.state.blink === 'losingPlan')?'blink':''}`} >{paraQuem === "personal"?"Vou":paraQuem === "other"?"Vai":paraQuem === "family"? "Vamos":""} deixar de ter plano
              <input type="radio" name="losingPlan" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>}
          <div className="label">
            <label className={`radio-box  ${(reason==='leavingRegion') ? 'checked' : ''} ${(this.state.blink === 'leavingRegion')?'blink':''}`} >{paraQuem === "personal"?"Mudei":paraQuem === "other"?"Mudança":paraQuem === "enterprise"?"Minha empresa mudou":"Mudamos"} de região
              <input type="radio" name="leavingRegion" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(reason==='cheaper') ? 'checked' : ''} ${(this.state.blink === 'cheaper')?'blink':''}`} >Quero um plano mais barato
              <input type="radio" name="cheaper" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(reason==='better') ? 'checked' : ''} ${(this.state.blink === 'better')?'blink':''}`} >Quero um plano melhor
              <input type="radio" name="better" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <style jsx="true">{`
            @-webkit-keyframes blinker {
              from {opacity: 1.0;}
              to {opacity: 0.0;}
            }
            .blink{
              text-decoration: blink;
              -webkit-animation-name: blinker;
              -webkit-animation-duration: 0.2s;
              -webkit-animation-iteration-count:infinite;
              -webkit-animation-timing-function:ease-in-out;
              -webkit-animation-direction: alternate;
            }

            .label {
              width: 100%;
              margin: 20px 0px;
              display: flex;
              justify-content: center;
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
              border-radius: 10px;

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
              max-width: 400px;
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
      </SignupLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cnpj: state.cnpjReducer.cnpj,
  vidas: state.vidasReducer.vidas,
  paraQuem: state.paraQuemReducer.paraQuem,
  reason: state.reasonReducer.reason
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...ReasonAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Reason);
