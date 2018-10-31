import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from 'react-transition-group'

class SignupLayout extends Component {
  render(){
    const durationButton = 300

    const durationFadeIn = 200

    const defaultStyle = {
      transition: `opacity ${durationButton}ms ease-in-out`,
      opacity: 0,
    }

    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    }

    const defaultStyleBody = {
      transition: `opacity ${durationFadeIn}ms ease-in-out`,
      opacity: 0,
    }

    const transitionStylesBody = {
      entering: {
        opacity: 0.01,
        transform: "scale(1) translateX(50%)"
      },
      entered:  {
        opacity: 1,
        transform: "scale(1) translateX(0%)",
        transition: "all 300ms ease-out"
      },
      exiting: {
        opacity: 1,
        transform: "scale(1) translateX(0%)"
      },
      exited: {
        opacity: 0.01,
        transform: "scale(1) translateX(-50%)",
        transition: "all 300ms ease-out"
      },
    }

    return(
      <React.Fragment>
        <div className="signup">
          <div>
            <div className="contatiner-logo">
              <img style ={{marginBottom:10, marginTop: 10}} src="/assets/images/logo-full1.png" alt="" height="35" width ="230"/>
            </div>
            <div className="form-signup">
              <div className="center-signup">
                <p>{this.props.title}</p>
              </div>
              <small className="subtitle" >{this.props.subtitle}</small>
              <Transition in={this.props.visibleBody} timeout={durationFadeIn}>
              {(state) => (
                <div style={{
                  ...defaultStyleBody,
                  ...transitionStylesBody[state]
                }}>
                  {this.props.children}
              </div>
              )}
              </Transition>
            </div>
          </div>
          {this.props.bottomElement2}
          <Transition in={this.props.visible} timeout={durationButton}>
            {(state) => (
              <div
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}
                className="footer">
                <Link
                  to={this.props.next}
                  className={`button clean ${this.props.active ? 'activeButton' : ''}`}
                  onClick={this.props.onClick}
                  >
                  {this.props.buttonMessage ? this.props.buttonMessage : "Prosseguir"}
                </Link>
                {this.props.termos &&<p className="termos">Ao clicar no botão você aceita os </p>}
                {this.props.termos &&<p><a href="http://consultorio-site.s3-website-us-east-1.amazonaws.com/assets/Termos_de_Uso.pdf">termos de uso</a>.</p>}
                {this.props.bottomElement}
              </div>
            )}
          </Transition>
        </div>
        <style jsx="true">{`
          .termos2{
            text-align: center;
            font-size: 15px !important;
            font-family: 'Roboto', sans-serif;
          }
          .termos{
            max-width: 400px;
            margin-top: 25px;
            text-align: center;
            font-weight: 200;
          }
          .termos a{
            color: var(--blue);
          }
          .subtitle {
            font-size: 16px;
            font-weight: 300;
            font-family: 'Roboto', sans-serif;
            text-align: center;
            display: flex;
            flex-direction: column;
            color: 	#808080;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
          }
          .form-signup {
            min-height: ${this.props.formSignupMinHeight} !important;
          }
          /* Structure */
          .signup {
            width: 90%;
            margin: 0px auto 0px auto;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 6vh;
            padding-bottom: 20vh;
          }
          .center-signup {
            font-weight: 300;
            text-align: center;
            font-size: 19px;
          }
          .center-signup h1 {
            font-size: 36px;
            font-weight: 500;
            line-height: 60px;
          }
          .form-signup {
            width: 80%;
            margin: 4vh auto;
            min-height: 45vh;
          }

          @media (min-width: 769px){
            .signup {
              width: 35%!important;
            }
            .contatiner-logo{
              opacity: 0;
            }
          }
          /* End Cards */

          .contatiner-logo {
            display: flex;
            justify-content: center;
          }

          /* Button */

          .button {
            border: 2px solid #FFF;
            background: none;
            text-align: center;
            color: #FFF;
            border-radius: 5px;
            outline: none;
            height: 50px;
            font-size: 18px;
            padding: 0 30px;
          }
          a.button {
            padding: 10px 30px;
            text-decoration: none;
            font-weight: 400;
          }
          .button.clean {
            border-color: var(--pink);
            color: var(--pink);
            padding: 12px 50px;
          }

          .footer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 8px;
            margin-left: auto;
            margin-right: auto;
          }

          .radio-box.checked .checkmark {
            background-color: var(--pink);
            box-shadow: none;
            border: 5px solid #FFF;
          }

          .checkmark {
            position: absolute;
            top: 35%;
            left: 15px;
            height: 20px;
            width: 20px;
            background-color: #FFF;
            border-radius: 50%;
            box-shadow: inset 0px 0px 10px #EBE8E8;
            //border: 2px solid var(--pink);

          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default SignupLayout;
