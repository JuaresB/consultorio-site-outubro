import React from 'react'
import mixpanel from '../../components/mixpanel'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

class Landing extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false
    }
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visible: true
    })
  }

  render() {
    const durationFadeOut = 200
    const defaultStyle = {
      transition: `opacity ${durationFadeOut}ms ease-in-out`,
      opacity: 0,
    }
    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    }
    return(
      <Transition in={this.state.visible} timeout={durationFadeOut}>
        {state => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state]
          }}
          className="plansImage">
          <div className="plans">
            <div className="holder-content">
              <h2 className="logo">consultorio.com</h2>
            </div>
              <div className="contractCPW">
                <h1>Parabéns!</h1>
                <p>Já estamos confeccionando seu contrato, muito em breve entraremos em contato com você.</p>
                <p>Se quiser falar com a gente nosso telefone é: (21) 98153-8777.</p>
                <p>O horário de atendimento é de segunda a sexta, das 8h00 às 20h00.</p>
            </div>
            <div className='whatsappContainer'>
              <a href="https://api.whatsapp.com/send?1=pt_BR&phone=5521981538777" onClick={()=>mixpanel.track("Click-WhatsApp",{
                "urlPath": this.props.location.pathname,
                "urlTitle": document.title})}><b>WhatsApp</b>
              <img alt='' className="whatsappIcon" width='20' src='/assets/images/whatsapp-logo.svg' /></a>
            </div>
          </div>
          <style jsx="true">{`
            .contractCPW{
              margin: 0 20px;
            }
            .contractCPW h1 {
              font-family: Gotham;
              margin-bottom: 20px;
            }
            .contractCPW p{
              font-weight: 500;
              margin-bottom: 5px;
            }
            .whatsappIcon{
            }
            .whatsappContainer{
              margin: 2vh auto;
            }
            .whatsappContainer a{
              color: var(--pink);
              display: flex;
              flex-direction: row;
              align-items: center;
              font-family: Gotham;
              font-weight: bold;
            }
            .whatsappContainer a img{
              margin-left: 5px;
            }
            .plansImage{
              background: url(/assets/images/product-landing.png) top center fixed;
              background-size: cover;
              height: 100vh;
            }
            .plans {
              display: flex;
              flex-direction: column;
              color: var(--pink);
              height: 100vh;
              background: rgba(255, 255, 255, 0.65);
            }

            .plans p {
              font-size: 20px;
              line-height: 1.5em;
              font-weight: 300;
            }

            @font-face {
              font-family: 'Gotham';
              src: url('/assets/fonts/GothamRoundedMedium_21022.ttf')
            }
            .plans-text{
              text-align: center;
            }
            .plans-text h1{
              //white-space: nowrap ;
            }
            @media(max-width: 768px){
              .plans-text{
                margin-top: 22vh;
                text-align: center;
              }
              .plans-text h1{
                line-height: 20px;
                margin-left:auto;
                margin-right:auto;
              }
            }
            @media(min-width: 769px){
              .contractCPW {
                margin: 0 auto;
                text-align: center;
              }
              .contractCPW h1 {
                font-size: 36px;
              }
              .whatsappContainer{
                margin: 3vh auto;
              }
              .logo{
                margin-left: auto !important;
                margin-right: auto !important;
              }
              .holder-content{
                margin-left: auto;
                margin-right: auto;
              }
              .footer{
                display: flex;
                flex-direction: row;
                justify-content: center;
              }
              .plans .logo {
                margin-top: 20vh;
                margin-bottom: 3vh;
              }
            }

            .logo {
              background: url(/assets/images/icon-logo1.png) no-repeat;
              width: 4em;
              height: 4em;
              display: block;
              text-indent: -99999px;
              background-size: 75px;
              margin-bottom: 10vh;
              margin-top: 20px;
              margin-left: 20px;
            }
          `}</style>
        </div>)}
        </Transition>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));
