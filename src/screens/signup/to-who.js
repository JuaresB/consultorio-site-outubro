import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import mixpanel from '../../components/mixpanel'
import * as VidasAction from '../../action/form/VidasAction';
import * as CnpjAction from '../../action/form/CnpjAction';
import * as ParaQuemAction from '../../action/form/ParaQuemAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ToWho extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      choice: '',
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
    const choice = this.props.paraQuem
    this.setState({
      visibleBody: true,
    })
    if(choice){
      this.setState({
        visible:true,
      })
    }
  }
  handleClick(e){
    const choice = e.target.name
    const vidas = this.props.vidas
    this.props.action.setParaQuemAction(choice)
    if(vidas === 1){
      this.props.action.setCnpjAction("noCnpj")
    }
    else if(choice === "enterprise"){
      this.props.action.setCnpjAction("cnpj")
    }
    this.setState({
      blink: choice,
    }, () => {
      setTimeout(() => {
        this.setState({
          blink:"",
          visibleBody:false
        },() => setTimeout( ()=> {
          this.props.action.formNextPageAction()
        }, 600))
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
    const choice = this.props.paraQuem
    const vidas  = this.props.vidas

    return (
      <SignupLayout
        next='/signup/to-who'
        title='Eu quero um plano:'
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
        <React.Fragment>
          {vidas === 1 && <React.Fragment>
          <div className="label">
            <label className={`radio-box  ${(choice==='personal') ? 'checked' : ''} ${(this.state.blink === 'personal')?'blink':''}`} >Para mim
              <input type="radio" name="personal" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(choice==='other') ? 'checked' : ''} ${(this.state.blink === 'other')?'blink':''}`} >Para outra pessoa
              <input type="radio" name="other" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          </React.Fragment>}
          {vidas > 1 && <React.Fragment>
          <div className="label">
            <label className={`radio-box  ${(choice==='family') ? 'checked' : ''} ${(this.state.blink === 'family')?'blink':''}`} >Minha Família
              <input type="radio" name="family" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(choice==='enterprise') ? 'checked' : ''} ${(this.state.blink === 'enterprise')?'blink':''}`} >Minha Empresa
              <input type="radio" name="enterprise" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          </React.Fragment>}
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
  vidas: state.vidasReducer.vidas,
  paraQuem: state.paraQuemReducer.paraQuem,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...VidasAction, ...ParaQuemAction, ...CnpjAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ToWho);
