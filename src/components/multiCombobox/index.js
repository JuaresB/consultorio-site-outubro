import React, { Component } from 'react';
import * as OcupacaoAction from '../../action/form/OcupacaoAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import stringSimilarity from 'string-similarity';

class MultiCombobox extends Component {
  constructor(props){
    super(props)
    const answer = this.props.pathname === "/signup/occupation"? this.props.occupationAnswer: this.props.pathname === "/signup/region"? this.props.regionAnswer: this.props.pathname === "/signup/hospital"? this.props.hospitalAnswer:[];

    this.state = {
      value: "",
      answers: answer.constructor === Array ? [...answer] : [],
      error: false,
      errorMessage: "",
      suggestionList: [],
      boxBorderColor: "transparent",
      openMenu: false
    }
    this.onChangeSearchInput = this.onChangeSearchInput.bind(this)
    this.handleMenuArrow = this.handleMenuArrow.bind(this)
    this.handleSuggestion = this.handleSuggestion.bind(this)
    this.deleteAnswer = this.deleteAnswer.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }
  componentDidUpdate(prevProps){
    if(this.props.error !== prevProps.error || this.props.pathname !== prevProps.pathname){
      const answer = this.props.pathname === "/signup/occupation"? this.props.occupationAnswer: this.props.pathname === "/signup/region"? this.props.regionAnswer: this.props.pathname === "/signup/hospital"? this.props.hospitalAnswer: [];
      this.setState({
        answers: [...answer],
        error: this.props.error,
        errorMessage: this.props.errorMessage
      })
    }
  }
  onChangeSearchInput(e){
    var suggestionList = [];
    var matches = stringSimilarity.findBestMatch(e.target.value, this.props.list);
    matches.ratings = matches.ratings.filter(function(obj){
      return obj.rating > 0;
    }).sort(function(obj1, obj2){
      return obj2.rating - obj1.rating;
    }).map(element => {
      return element.target;
    });
    suggestionList = matches.ratings;
    if(this.props.fixedOption){
      var index = suggestionList.indexOf(this.props.fixedOption);
      if(index > -1){
        suggestionList.splice(index, 1);
      }
      suggestionList.unshift(this.props.fixedOption);
    }
    this.setState({
      suggestionList: suggestionList,
      value: e.target.value,
      //suggestionHighlighted: "suggestion-" + this.props.name + "-0",
    });
  }
  handleMenuArrow(){
    this.setState({
      openMenu: !this.state.openMenu,
      error: false
    })
  }
  handleSuggestion(e){
    var answers = this.state.answers.slice()

    if(e.target.id === "Sem profissão" || e.target.id === "Não encontrei minha profissão" || e.target.id === "Não tenho preferêcia por nenhum hospital"){
      var noProf = []
      noProf.push(e.target.id)
      this.props.callbackParent(noProf)
      this.setState({
        answers: noProf,
        error: false
      })
    }
    else if(this.state.answers.length === 5){
      this.setState({
        openMenu: false,
        error: true,
        errorMessage: "Só é possível selecionar no máximo 5 opções"
      })
    }
    else if((this.state.answers.includes("Sem profissão") || this.state.answers.includes("Não encontrei minha profissão") || this.state.answers.includes("Não tenho preferêcia por nenhum hospital"))&& !this.state.answers.includes(e.target.id)){
      const index = this.state.answers.includes("Sem profissão")? answers.indexOf("Sem profissão"):this.state.answers.includes("Não encontrei minha profissão")?answers.indexOf("Não encontrei minha profissão"):answers.indexOf("Não tenho preferêcia por nenhum hospital")
      answers.splice(index,1)
      answers.push(e.target.id)
      this.props.callbackParent(answers)
      this.setState({
        answers: answers,
        error: false
      })
    }
    else if(!this.state.answers.includes(e.target.id)){
      answers.push(e.target.id)
      this.props.callbackParent(answers);
      this.setState({
        answers: answers,
        error: false
      })
    }
  }
  deleteAnswer(e){
    var answers = this.state.answers.slice()
    const index = answers.indexOf(e.target.id)
    if(index > -1){
      answers.splice(index,1)
    }
    this.props.callbackParent(answers);
    this.setState({
      error: false,
      answers: answers
    })
  }
  onFocus(){
    this.setState({
      openMenu: true,
      suggestionList: this.props.list,
      error: false
    })
  }
  onBlur(){
    this.setState({
      openMenu: false,
    })
  }

  render(){
    var suggestions = []
    var answers = []
    if(this.state.suggestionList.length === 0){
      suggestions.push(
        <div className="suggestion" key="0" style={{opacity:"0.3"}}>Nenhum resultado</div>
      )
    } else {
      this.state.suggestionList.forEach((suggestion)=>{
        if(!this.state.answers.includes(suggestion)){
          suggestions.push(
        <div className="suggestion" onMouseDown={this.handleSuggestion} key={suggestion} id={suggestion}>
          {suggestion}
        </div>)
        }
      })
    }
    this.state.answers.forEach((answer)=>{
      answers.push(
        <div className={`answer ${this.props.length>5?"redBg":""}`} onClick={this.deleteAnswer} key={answer} id={answer}>
          {answer}
          <i className="material-icons" onClick={this.deleteAnswer} id={answer}>close</i>
        </div>)
    })
    return(
      <React.Fragment>
      <div className="canvas">
      <div className={`combobox ${this.state.error?"errorCombobox":""}`} onBlur={this.onBlur} tabIndex="0">
        <div className="head" onFocus={this.onFocus}>
          <div className="answersSet">
            {answers}
            <input value={this.state.value} onChange={this.onChangeSearchInput} onFocus={this.onFocus} ref={this.props.inputRef} placeholder="Selecione"/>
          </div>
          <i className="material-icons" onClick={this.handleMenuArrow}>arrow_drop_down</i>
        </div>
        {(this.state.openMenu&&suggestions.length>0)&&(
          <div className="menu">
            {suggestions}
          </div>
        )}
        <style jsx="true">{`
          .canvas{
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .errorMessage{
            margin-top: 15px;
            text-align: center;
            max-width: 80%;
            color: red;
          }
          .errorCombobox{
            border-color: red !important;
          }
          .menu{
            max-height: 30vh;
            overflow-y: scroll;
          }
          .suggestion{
            min-height: 40px;
            padding: 5px 0px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }
          .combobox{
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;
            border-color: ${this.state.openMenu? "var(--blue)":"transparent"};
            background-color: white;
            width: 100%;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            padding: 5px 10px 5px 10px;
            outline: none;
          }
          .head{
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-height: 30vh;
            overflow-y: scroll;
            border-bottom: ${this.state.openMenu&&"0.5px solid var(--blue)"};
            padding-bottom: 1px;
          }
          .head > i{
            color: var(--pink);
            cursor: pointer;
            align-self: flex-end;
            margin-bottom: 8px;
          }
          .answer{
            min-height: 42px;
            max-width: 100%;
            display: flex;
            align-items: center;
            padding: 10px 10px;
            margin-right: 5px;
            margin-bottom: 5px;
            border-radius: 5px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            color: #fff;
            background-color: var(--blue);
            font-family: 'Gotham';
            font-size: 13px;
            cursor: pointer;
          }
          .redBg{
            background-color: red;
          }
          .answer i{
            font-size: 15px;
            margin-left: 5px;
            cursor: pointer;
          }
          .answersSet{
            width: 80%;
            display: flex;
            flex-wrap: wrap;
          }
          .answersSet input{
            outline: none;
            font-family:'Roboto', sans-serif;
            font-size: 16px;
            height: 42px;
          }
          .head::-webkit-scrollbar {
            ${window.innerWidth > 769 ? "display: none;" : ""}
          }
        `}</style>
      </div>
      {this.state.error &&
        <p className="errorMessage">
          {this.state.errorMessage}
        </p>
      }
      </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = (state) => ({
  pathname: state.router.location.pathname,
  occupationAnswer: state.ocupacaoReducer.ocupacao,
  regionAnswer: state.regionReducer.regions,
  hospitalAnswer: state.hospitalReducer.hospitals,
})

const mapDispatchToProps = dispatch => ({
  action: bindActionCreators({ ...OcupacaoAction }, dispatch)
});

export default connect(mapStateToProps)(MultiCombobox)
