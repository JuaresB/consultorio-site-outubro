import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import mixpanel from '../../components/mixpanel'
import * as AcomodacaoAction from '../../action/form/AcomodacaoAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class IntermediaryPlan extends React.Component {
  constructor(props){
    super(props)
    this.state={
      blink: '',
      visible: false,
      visibleBody: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    var acomodacao
    if(this.props.showEnfermaria){
      acomodacao = 'Enfermaria'
    }else if(this.props.showApartamento){
      acomodacao = 'Apartamento'
    }else{
      acomodacao = ''
    }
    if(acomodacao){
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
    const roomType = type === 'Enfermaria' ? 'shared' : type === 'Apartamento' ? 'individual' : ""
    this.setState({
      blink: e.target.name,
    }, () => {
      setTimeout(() => {
        this.setState({
          blink:"",visibleBody:false
        }, () => setTimeout(() => {
          this.props.action.formNextPageAction()
        },600))
      },700)
    })
    if(type === 'Enfermaria'){
      this.props.action.setShowEnfermariaAction(true)
      this.props.action.setShowApartamentoAction(false)
    }else if(type === 'Apartamento'){
      this.props.action.setShowEnfermariaAction(false)
      this.props.action.setShowApartamentoAction(true)
    }else if(type === 'Ambos'){
      this.props.action.setShowEnfermariaAction(true)
      this.props.action.setShowApartamentoAction(true)
    }
  }

  onClick(e){
    e.preventDefault()
    this.setState({
      visible: false,
      visibleBody: false,
    }, ()=> {
      setTimeout(()=>{
        this.props.action.formNextPageAction()
      },600)
    })
  }

  render(){
    const nextPage = (this.props.showEnfermaria || this.props.showApartamento) ? '/signup/city' : '/signup/intermediary-plan'
    return(
      <SignupLayout
        next = {nextPage}
        title = "Você pagaria a mais para ter um quarto individual em caso de internação?"
        onClick = {this.onClick}
        visible = {this.state.visible}
        visibleBody = {this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
        <React.Fragment>
          <div className="label">
              <label className={`radio-box  ${(this.props.showEnfermaria && !this.props.showApartamento) ? 'checked' : ''} ${(this.state.blink === 'Enfermaria')?'blink':''}`}>Não, prefiro pagar mais barato e ficar em quarto coletivo
                <input type="radio" name="Enfermaria" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <div className="label">
              <label className={`radio-box  ${(!this.props.showEnfermaria && this.props.showApartamento) ? 'checked' : ''} ${(this.state.blink === 'Apartamento')?'blink':''}`}>Sim, faço questão de ter quarto individual
                <input type="radio" name="Apartamento" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <div className="label">
              <label className={`radio-box  ${( this.props.showEnfermaria && this.props.showApartamento) ? 'checked' : ''} ${(this.state.blink === 'Ambos')?'blink':''}`}>Não sei, quero ver ambas as opções
                <input type="radio" name="Ambos" onClick={this.handleClick} />
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
  showEnfermaria: state.acomodacaoReducer.showEnfermaria,
  showApartamento: state.acomodacaoReducer.showApartamento,
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...AcomodacaoAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IntermediaryPlan);
