import React from 'react'
import UserDashLayout from '../../components/layouts/userDash'
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class EndUserDash extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visible: true,
      visibleBody: true,
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    e.preventDefault()
    this.props.action.onWhatsContact()
  }
  render(){
    const buttonBody = <div className='buttonBody'><p>Entrar em contato</p><img alt='' className="whatsappIcon" width='20' src='/assets/images/whatsapp-logo.svg' /></div>
    return (
      <UserDashLayout
        next= ''
        title={"Parabéns você está muito perto de ter o seu plano de saúde!"}
        subtitle= {""}
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
        buttonMessage={buttonBody}
      >
        <React.Fragment>
          <div className="textHolder">
            <p></p>
            <br/>
            <p>Iremos conferir a documentação enviada, e se estiver tudo ok seu contrato será submetido à operadora.</p>
            <br/>
            <p>Vamos te mantendo informado.</p>
            <br/>
            <p>Caso queira tirar alguma dúvida durante o processo, já conhece o nosso canal.</p>
          </div>
          <style jsx="true">{`
            .buttonBody{
              display: flex;
              align-items: center;
            }
            .buttonBody p{
              margin-right: 10px;
            }
            .textHolder p{
              font-size: 18px;
              text-align: center;
              font-family: 'Roboto', sans-serif;
              font-weight: 200;
            }
            @font-face {
              font-family: 'GothamRoundedBold';
              src: url('/assets/images/new-landing/GothamRnd-Bold.otf')
            }
            @font-face {
              font-family: 'GothamRoundedLight';
              src: url('/assets/images/new-landing/GothamRnd-Light.otf')
            }
            @font-face {
              font-family: 'GothamRoundedMedium';
              src: url('/assets/images/new-landing/GothamRnd-Medium.otf')
            }
          `}</style>
        </React.Fragment>
      </UserDashLayout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cnpj: state.cnpjReducer.cnpj,
  vidas: state.vidasReducer.vidas
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EndUserDash);
