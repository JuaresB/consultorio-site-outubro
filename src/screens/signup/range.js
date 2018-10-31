import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import * as AbrangenciaAction from '../../action/form/AbrangenciaAction'
import * as FlowAction from '../../action/FlowAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Range extends React.Component {
  constructor(props){
    super(props)
    this.state={
      blink:'',
      visible: false,
      visibleBody: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    var abrangencia
    if(this.props.showRegional){
      abrangencia = 'Regional'
    }else if(this.props.showNacional){
      abrangencia = 'Nacional'
    }else{
      abrangencia = ''
    }

    if(abrangencia){
      this.setState({
        visible:true,
      })
    }
    this.setState({
      visibleBody: true
    })
  }

  handleClick(e) {
    const type = e.target.name
    const rangeType = type === 'Regional'?'local': type === 'Nacional'? 'national':""
    this.setState(
      {blink: e.target.name},
      () => { setTimeout(() => {
        this.setState({
          blink:"",
          visibleBody:false
        }, ()=>setTimeout(()=>{
          this.props.action.formNextPageAction()
        },600))
      },700)
    })
    if(type === 'Regional'){
      this.props.action.setShowRegionalAction(true)
      this.props.action.setShowNacionalAction(false)
    }else if(type === 'Nacional'){
      this.props.action.setShowRegionalAction(false)
      this.props.action.setShowNacionalAction(true)
    }
  }

  onClick(e){
    e.preventDefault()
    this.setState({
      visible: false,
      visibleBody: false
    }, ()=>{
      setTimeout(()=>{
        this.props.action.formNextPageAction()
      },600)
    })
  }

  render(){
    const nextPage = (this.props.showNacional || this.props.showRegional) ? '/signup/intermediary-plan' : '/signup/range'

    return(
      <SignupLayout
        next = {nextPage}
        title = "Você pagaria a mais para ser atendido em todo o país ou prefere ter acesso apenas aos hospitais da sua cidade?"
        onClick = {this.onClick}
        visible = {this.state.visible}
        visibleBody = {this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
          <React.Fragment>
          <div className="label">
              <label className={`radio-box  ${this.props.showRegional ? 'checked' : ''} ${(this.state.blink === 'Regional')?'blink':''}`}>
                <div>Prefiro pagar menos e ter um atendimento <strong>regional</strong></div>
                <input type="radio" name="Regional" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <div className="label">
              <label className={`radio-box  ${this.props.showNacional ? 'checked' : ''} ${(this.state.blink === 'Nacional')?'blink':''}`}>
                <div>Aceito pagar mais e ter um atendimento <strong>nacional</strong></div>
                <input type="radio" name="Nacional" onClick={this.handleClick} />
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
      </SignupLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  showRegional: state.abrangenciaReducer.showRegional,
  showNacional: state.abrangenciaReducer.showNacional,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...AbrangenciaAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Range);
