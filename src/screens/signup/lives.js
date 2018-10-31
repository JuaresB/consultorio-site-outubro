import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import mixpanel from '../../components/mixpanel'
import Input from '../../components/input'
import Counter from '../../components/counter'
import * as IdadePFAction from '../../action/form/IdadePFAction';
import * as VidasAction from '../../action/form/VidasAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Lives extends React.Component {
  constructor(props){
    super(props)
    this.state={
      error: false,
      errorMessage: "Insira um número válido para prosseguir",
      visibleBody: false,
      visible: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickMinus = this.onClickMinus.bind(this)
    this.onClickPlus = this.onClickPlus.bind(this)

    this.inputElement = React.createRef()
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    this.setState({
      visibleBody: true,
      visible: true
    },()=>{
      setTimeout(()=>{
        this.inputElement.current.focus()
      }, 600)
    })
  }
  onClickPlus(){
    this.props.action.setVidasAction(this.props.vidas+1)
  }
  onClickMinus(){
    if(this.props.vidas>1){
      this.props.action.setVidasAction(this.props.vidas-1)
    }
  }
  onChange(e){
    var value = e.target.value
    this.setState({
      visible: true
    })
    this.props.action.setVidasAction(parseInt(value))
  }
  onClick(e){
    e.preventDefault()
    if(this.props.vidas === ""||isNaN(this.props.vidas)){
      this.setState({
        error: true,
        errorMessage: "Insira um valor para prosseguir"
      })
    }
    else if(this.props.vidas<1 || this.props.vidas>999){
      this.setState({
        error: true
      })
    }
    else{
      this.setState({
        visibleBody: false,
        visible: false
      },()=>{
        setTimeout(()=>{
          this.props.action.formNextPageAction()
        }, 600)
      })
    }
  }
  render(){
    return(
      <SignupLayout
        next = "/signup/email"
        title = "Eu estou procurando um plano para"
        onClick={this.onClick}
        formSignupMinHeight = {"auto"}
        visible = {this.state.visible}
        visibleBody = {this.state.visibleBody}
      >
          <React.Fragment>
          <div  className="top-plan">
            {/* <Input
              type='number'
              placeholder='Número de vidas'
              onChange={(e) => this.onChange(e)}
              color = "#333"
              inputRef= {this.inputElement}
              pattern = "[0-9]*"
              value={this.state.value}
              min= {1}
              max={999}
            /> */}
            <Counter
              inputRef= {this.inputElement}
              onChange={this.onChange}
              onClickMinus={this.onClickMinus}
              onClickPlus={this.onClickPlus}
              value={this.props.vidas}/>
            <p>pessoa(s)</p>
            {this.state.error&&<span className="errorLabel">{this.state.errorMessage}</span>}
          </div>
          <style jsx="true">{`
            // .top-plan input{
            //   background: none;
            //   border-bottom: 1px solid #BBB;
            //   color: #444;
            //   outline: none;
            //   width: 100%;
            //   height: 30px;
            //   font-weight: 300;
            //   font-size: 16px;
            //   margin-top: 7vh;
            //   text-align: center
            // }
            .top-plan{
              display:  flex;
              flex-direction: column;
              align-items: center;
              justify-content: center !important;
            }
            .top-plan p{
              font-weight: 300;
              text-align: center;
              font-size: 20px;
              margin-top: 20px;
            }
            .errorLabel {
              font-size: 15px;
              font-family: 'Roboto', sans-serif;
              color: #E74C3C;
              padding-top:5px;
              position: relative;
              font-size: 14px;
              float: left;
              margin-top: 10px
            }
            // .top-plan input{
            //   text-align: center;
            //   width: 250px;
            // }
            ::placeholder{
              color: #DDD;
            }
          `}</style>
          </React.Fragment>
      </SignupLayout>
      )
  }
}
const mapStateToProps = (state, ownProps) => ({
  idadePF: state.idadePFReducer.idadePF,
  deleteCounter: state.idadePFReducer.deleteCounterPF,
  vidas: state.vidasReducer.vidas
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...IdadePFAction, ...VidasAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Lives)
