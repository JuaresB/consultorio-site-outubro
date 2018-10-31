import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import mixpanel from '../../components/mixpanel'
import * as QuemSeraIncluidoAction from '../../action/form/QuemSeraIncluidoAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PeopleIncluded extends React.Component {
  constructor(props){
    super(props)
    this.state={
      visible: false,
      visibleBody: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    if(this.props.socios||this.props.dependentes||this.props.funcionarios){
      this.setState({
        visible:true,
      })
    }
    this.setState({
      visibleBody: true
    })
  }
  handleClick(e) {
    const socios = this.props.socios
    const dependentes = this.props.dependentes
    const funcionarios = this.props.funcionarios

    if(e.target.name === 'socios'){
      this.props.action.setQuemSeraIncluidoAction(!socios,dependentes,funcionarios)
    }
    else if(e.target.name === 'dependentes'){
      this.props.action.setQuemSeraIncluidoAction(socios,!dependentes,funcionarios)
    }
    else {
      this.props.action.setQuemSeraIncluidoAction(socios,dependentes,!funcionarios)
    }
    this.setState({
      visible: true
    })
  }
  onClick(e){
    e.preventDefault()
    this.setState({
      visible: false,
      visibleBody: false
    }, () => {
      setTimeout(() => this.props.action.formNextPageAction(),600)
    })
  }
  render(){
    const socios = this.props.socios
    const dependentes = this.props.dependentes
    const funcionarios = this.props.funcionarios

    const nextPage = (socios === false && dependentes === false && funcionarios === false)?'/signup/people-included':'/signup/range'
    return(
      <SignupLayout
        next = {nextPage}
        title = "Quem será incluído?"
        onClick = {this.onClick}
        visible = {this.state.visible}
        visibleBody = {this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
          <React.Fragment>
            <div className="label">
              <label className={`radio-box  ${(socios === true) ? 'checked' : ''}`}>Sócios
                <input type="radio" name="socios" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <div className="label">
              <label className={`radio-box  ${(dependentes === true) ? 'checked' : ''}`}>Dependentes
                <input type="radio" name="dependentes" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <div className="label">
              <label className={`radio-box  ${(funcionarios === true) ? 'checked' : ''}`}>Funcionários
                <input type="radio" name="funcionarios" onClick={this.handleClick} />
                <i className="checkmark"></i>
              </label>
            </div>
            <style jsx="true">{`
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
  socios: state.quemSeraIncluidoReducer.socios,
  dependentes: state.quemSeraIncluidoReducer.dependentes,
  funcionarios: state.quemSeraIncluidoReducer.funcionarios
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...QuemSeraIncluidoAction, ...FlowAction }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleIncluded);
