import React, { Component } from 'react';
import stringSimilarity from 'string-similarity';
import Input from '../../components/input'

class EmailSuggestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: '',
      suggestionList: [],
      list: ["gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "live.com", "msn.com", "facebook.com", "outlook.com", "icloud.com", "aol.com"] ,
      beforeAt: '',
      afterAt: '',
      openMenu: false,
      suggestionHighlighted: "suggestion0",
    }
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onChange(e){
    if(e.target.value.includes("@")){
      var beforeAt = e.target.value.slice(0, e.target.value.indexOf("@"));
      var afterAt = e.target.value.slice(e.target.value.indexOf("@") + 1);
      var matches = stringSimilarity.findBestMatch(afterAt, this.state.list);
      matches.ratings = matches.ratings.sort(function(obj1, obj2){
        return obj2.rating - obj1.rating;
      }).map(element => {
        return beforeAt + "@" + element.target;
      });
      this.setState({
        answer: e.target.value,
        suggestionList: matches.ratings.slice(0,2),
        beforeAt: beforeAt,
        afterAt: afterAt,
        openMenu: true,
        suggestionHighlighted: "suggestion0",
      });
    }else{
      this.setState({
        answer: e.target.value,
        beforeAt: '',
        afterAt: '',
        suggestionList: [],
        openMenu: false,
      });
    }
    this.props.onChange(e);
  }

  onKeyDown(event) {
    if(event.key === 'Enter' && this.state.openMenu){
      event.preventDefault();
      this.onMouseDown();
    }else if(event.key === 'Enter' && !this.state.openMenu){
      this.props.onClick(event);
    }else if(event.key === 'Tab' && this.state.openMenu){
      event.preventDefault();
      this.onMouseDown();
    }else if((event.key === 'ArrowUp' || event.key === 'ArrowDown') && this.state.openMenu){
      event.preventDefault();
      var suggestionHighlighted;
      if(this.state.suggestionHighlighted === "suggestion0"){
        suggestionHighlighted = "suggestion1";
      }else{
        suggestionHighlighted = "suggestion0";
      }
      this.setState({
        suggestionHighlighted: suggestionHighlighted,
      });
    }
  }

  async onMouseDown(){
    var position = this.state.suggestionHighlighted.slice(10);
    await this.setState({
      answer: this.state.suggestionList[position],
      suggestionList: [],
      openMenu: false,
    });
    var e = {};
    e.target = {};
    e.target.value = this.state.answer;
    this.props.onChange(e);
  }

  onBlur(){
    this.setState({
      suggestionList: [],
      openMenu: false,
    })
  }

  onMouseOver(e){
    this.setState({
      suggestionHighlighted: e.target.id,
    });
  }

  render() {
    let suggestion = this.state.suggestionList.map((element, index) => {
      return(
        <div
          className="suggestionEmail"
          key={index}
          id={"suggestion"+index}
          onMouseDown={this.onMouseDown}
          onMouseOver={this.onMouseOver}
        >
          {element}
        </div>
      )
    });
    return (
      <React.Fragment>
        <Input
          value={this.state.answer}
          type='emailSuggestion'
          placeholder='Email'
          errorMessage='Esse campo deve ser preenchido'
          onKeyDown={(e) =>this.onKeyDown(e)}
          onChange={(e) => this.onChange(e)}
          color={this.props.color}
          onBlur={this.onBlur}
        />
        {(this.state.openMenu&&suggestion.length>0)&&(
          <div className="menuEmailSuggestion">
            {suggestion}
          </div>
        )}
        <style jsx="true">{`
          .menuEmailSuggestion{
            border-style: solid;
            border-width: 2px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            border-color: #0DA6CA;
            border-top: none;
            background-color: ${this.props.backgroundColor};
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          }

          .suggestionEmail{
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
            text-shadow: none;
            color: ${this.props.color};
          }

          #${this.state.suggestionHighlighted}{
            background: #CCC;
            color: #000;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default EmailSuggestion;
