import React from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

class Instutional extends React.Component{
  constructor(props){
    super(props)
    this.state={
      visible: false
    }
    this.props.action.abLoginAction()
    this.onClick = this.onClick.bind(this)
  }

  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visible: true
    })
  }

  onClick(e){
    e.preventDefault()
    this.setState({
      visible: false
    }, ()=>{
      setTimeout(()=>{
        this.props.action.formNextPageAction()
      },400)
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
          className="landingImage">
          <div className="landing">
            <div className="holder-content">
              <h2 className="logo">consultorio.com</h2>
              <div className="landing-text">
                <h1><strong>Plano de Saúde</strong></h1>
                <h1><strong>do seu Jeito!</strong></h1>
              </div>
            </div>
            <div className="footer">
              <Link to="/signup/cnpj" className="buttonLanding" onClick={this.onClick}>COTE AGORA</Link>
            </div>
          </div>
          <style jsx="true">{`
            .buttonLanding{
              background-color: var(--pink);
              font-weight: bold;
              text-align: center;
              padding-top: 12px;
              color: #FFF;
              border-radius: 5px;
              outline: none;
              height: 50px;
              font-size: 18px;
              text-decoration: none;
              margin-top: 5vh;
              width: 60vw;
              max-width: 250px;
            }

            .landingImage{
              background: url(/assets/images/product-landing.png) top center fixed;
              background-size: cover;
              height: 100vh;
            }
            .landing {
              display: flex;
              flex-direction: column;
              color: var(--pink);
              height: 100vh;
              background: rgba(255, 255, 255, 0.65);
            }

            .landing h1 {
              margin: 20px 0;
              font-size: 36px;
              font-family: 'Gotham', 'Varela Round', sans-serif;
              text-transform: uppercase;
              line-height: 39px;
            }

            .landing p {
              font-size: 20px;
              line-height: 1.5em;
              font-weight: 300;
            }

            .footer {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-bottom: 8vh;
              margin-left: auto;
              margin-right: auto;
            }

            @font-face {
              font-family: 'Gotham';
              src: url('/assets/fonts/GothamRoundedMedium_21022.ttf')
            }
            .landing-text{
              text-align: center;
            }
            .landing-text h1{
              white-space: nowrap ;
            }
            @media(max-width: 768px){
              .landing-text{
                margin-top: 22vh;
                text-align: center;
              }
              .landing-text h1{
                line-height: 20px;
                margin-left:auto;
                margin-right:auto;
              }
            }
            @media(min-width: 769px){
              .logo{
                margin-left: auto !important;
                margin-right: auto !important;
              }
              .holder-content{
                margin-left: auto;
                margin-right: auto;
              }
              .landing h1 {
                font-size: 55px;
                line-height: 60px;
              }
              .footer{
                display: flex;
                flex-direction: row;
                justify-content: center;
              }
              .landing .logo {
                margin-top: 20vh;
                margin-bottom: 3vh;
              }
            }
            @media(max-width: 370px){
              .landing h1{
                font-size: 30px;
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Instutional));
