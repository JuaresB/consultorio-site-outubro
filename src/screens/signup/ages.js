import React from 'react'
import SignupLayout from '../../components/layouts/signup'
import NewIdade from '../../components/newIdade'
import * as IdadePFAction from '../../action/form/IdadePFAction';
import * as IdadePJAction from '../../action/form/IdadePJAction';
import * as FlowAction from '../../action/FlowAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Ages extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      error: false,
      visible: false,
      visibleBody: false,
    }
    this.initializeAges()

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }
  componentDidMount(){
    this.props.action.viewPageAction()
    const cnpj = this.props.cnpj
    const idadePF =  this.props.idadePF
    const idadePJ =  this.props.idadePJ
    const idades = cnpj === "cnpj"? idadePJ:idadePF
    this.setState({
      visibleBody: true
    })
    if(idades[0].value){
      this.setState({
        visible: true
      })
    }
  }
  initializeAges(){
    const vidas = this.props.vidas
    const cnpj = this.props.cnpj
    const idadePF =  this.props.idadePF
    const idadePJ =  this.props.idadePJ
    const idades = cnpj === "cnpj"? idadePJ:idadePF
    let aux = []

    if((vidas>1 && idades[0].value === "") || vidas!==idades.length){
      for(var i=0;i<vidas;i++){
        aux.push({
          key: i,
          value: "",
          name: "Pessoa "+(i+1)
        })
      }
      if(cnpj === "cnpj"){
        this.props.action.setIdadePJAction(aux)
      }
      else{
        this.props.action.setIdadePFAction(aux)
      }
    }
  }
  onClick(e){
    e.preventDefault()
    const cnpj = this.props.cnpj
    const idadePF =  this.props.idadePF
    const idadePJ =  this.props.idadePJ
    const idades = cnpj === "cnpj"? idadePJ:idadePF
    var counter = 0
    idades.forEach(element => {
      if(element.value && parseInt(element.value,10)>=0 && parseInt(element.value,10)<150){
        counter++
      }
      else{
        this.setState({error: true})
      }
    });
    if(counter === idades.length){
      this.setState({
        visible: false,
        visibleBody: false,
        },() => {setTimeout(()=>this.props.action.formNextPageAction(),600)
      })
    }
  }
  onChange(e){
    const cnpj = this.props.cnpj
    const idadePF =  this.props.idadePF
    const idadePJ =  this.props.idadePJ
    const idades = cnpj === "cnpj"? idadePJ:idadePF

    var rows = idades.slice()
    rows[rows.findIndex(element => parseInt(element.key,10) === parseInt(e.target.id,10))].value=e.target.value
    if(cnpj === "cnpj"){
      this.props.action.setIdadePJAction(rows)
    }
    else{
      this.props.action.setIdadePFAction(rows)
    }
    this.setState({
      error: false,
      visible: true
    })
  }
  onFocus(){
    this.setState({
      visible: true
    })
  }
  render(){
    const cnpj = this.props.cnpj
    const idadePF =  this.props.idadePF
    const idadePJ =  this.props.idadePJ
    const idades = cnpj === "cnpj"? idadePJ:idadePF
    const rows = idades.map(row =>{
      return(
        <NewIdade
          key={row.key}
          id={row.key}
          name={row.name}
          errorMessage={(!row.value && this.state.error)?'Preencha a idade':(row.value<0||row.value>120)?'Preencha um valor válido':false}
          value={row.value}
          onChange={this.onChange}
          onFocus={this.onFocus}
        />
      )
    })

    return(
      <SignupLayout
        next="/signup/ages"
        title={rows.length>1?'As idades são':this.props.paraQuem === "other"?'A idade dele(a) é':'A minha idade é'}
        onClick={this.onClick}
        visible={this.state.visible}
        visibleBody={this.state.visibleBody}
        formSignupMinHeight = {"auto"}
      >
        {rows}
      </SignupLayout>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  vidas: state.vidasReducer.vidas,
  cnpj: state.cnpjReducer.cnpj,
  idadePF: state.idadePFReducer.idadePF,
  idadePJ: state.idadePJReducer.idadePJ,
  paraQuem: state.paraQuemReducer.paraQuem
});

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...IdadePFAction, ...IdadePJAction, ...FlowAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Ages)
