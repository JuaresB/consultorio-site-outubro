import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import * as PlanoAnteriorAction from '../../action/form/PlanoAnteriorAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PreviousPlan extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      visibleBody: false,
      blink: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    if(this.props.planoAnterior){
      this.setState({
        visible: true
      })
    }
    this.setState({
      visibleBody: true
    })
  }
  handleClick(e){
    this.props.action.setPlanoAnteriorAction(e.target.name)
    this.setState({
      blink: e.target.name,
    }, () => {
      setTimeout(() => {
        this.setState(
          {
            blink:"",
            visibleBody:false
          }, ()=>
          setTimeout(()=>{
            this.props.action.formNextPageAction()
          },600)
        )
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
    const planoAnterior = this.props.planoAnterior
    const paraQuem = this.props.paraQuem
    return(
      <SignupLayout
        next= '/signup/'
        title= {paraQuem === "personal"? "Você tem plano de saúde?":paraQuem === "other"?"Ele(a) tem plano de saúde?": paraQuem === "family"? "Vocês têm plano de saúde?": "Sua empresa tem plano de saúde?"}
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
        <React.Fragment>
          <div className="label">
            <label className={`radio-box  ${(planoAnterior=== 'tem') ? 'checked' : ''} ${(this.state.blink === 'tem')?'blink':''}`} >{paraQuem === "personal"?"Tenho":paraQuem === "other"?"Tem":paraQuem === "family"? "Temos": "Tem"}
              <input type="radio" name="tem" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(planoAnterior==='teve') ? 'checked' : ''} ${(this.state.blink === 'teve')?'blink':''}`} >{paraQuem === "personal"?"Já tive":paraQuem === "other"?"Já teve":paraQuem === "family"? "Já tivemos": "Já teve"}
              <input type="radio" name="teve" onClick={this.handleClick} />
              <i className="checkmark"></i>
            </label>
          </div>
          <div className="label">
            <label className={`radio-box  ${(planoAnterior==='nuncaTeve') ? 'checked' : ''} ${(this.state.blink === 'nuncaTeve')?'blink':''}`} >{paraQuem === "personal"?"Nunca tive":paraQuem === "other"?"Nunca teve":paraQuem === "family"? "Nunca tivemos": "Nunca teve"}
              <input type="radio" name="nuncaTeve" onClick={this.handleClick} />
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
  paraQuem: state.paraQuemReducer.paraQuem,
  planoAnterior: state.planoAnteriorReducer.planoAnterior,
  cnpj: state.cnpjReducer.cnpj
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...PlanoAnteriorAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviousPlan)
