import React, { Component } from 'react';
import stringSimilarity from 'string-similarity';
import classNames from 'classnames'

class ComboboxWithSuggestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: this.props.default,
      oldAnswer: this.props.default,
      placeHolder: this.props.placeHolder,
      suggestionList: [],
      openMenu: false,
      boxBorderColor: "#fff",
      suggestionHighlighted: "suggestion-" + this.props.name + "-0",
    }
    this.scrollField = React.createRef();
    this.onMouseDownI = this.onMouseDownI.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseOverSuggestion = this.onMouseOverSuggestion.bind(this);
  }

  componentDidUpdate(prevProps){
    if(this.props.default !== prevProps.default){
      this.setState({
        answer: this.props.default,
        oldAnswer: this.props.default,
      });
    }
  }

  onMouseDownI(e){
    if(!this.state.openMenu){
      this.onFocus();
    }else{
      this.onBlur();
    }
  }

  onKeyDown(event){
    if(event.key === 'Enter' && this.state.openMenu){
      event.preventDefault();
      this.onMouseDown();
    }else if(event.key === 'Tab' && this.state.openMenu){
      event.preventDefault();
      this.onMouseDown();
    }else if(event.key === 'Enter' && !this.state.openMenu){
      this.props.onClick(event);
    }else if((event.key === 'ArrowUp' || event.key === 'ArrowDown') && this.state.openMenu){
      event.preventDefault();
      var position = this.state.suggestionHighlighted.slice(this.state.suggestionHighlighted.lastIndexOf("-") + 1);
      if(event.key === 'ArrowUp'){
        if(position > 0){
          position--;
          this.scrollField.current.scrollTop = this.scrollField.current.scrollTop - 40;
        }else{
          position = this.state.suggestionList.length - 1;
          this.scrollField.current.scrollTop = this.scrollField.current.scrollHeight;
        }
      }else{
        if(position < this.state.suggestionList.length - 1){
          position++;
          this.scrollField.current.scrollTop = this.scrollField.current.scrollTop + 40;
        }else{
          position = 0;
          this.scrollField.current.scrollTop = 0;
        }
      }
      var suggestionHighlighted = "suggestion-" + this.props.name + "-" + position;
      this.setState({
        suggestionHighlighted: suggestionHighlighted,
      })
    }
  }

  onChange(e){
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
      answer: e.target.value,
      suggestionHighlighted: "suggestion-" + this.props.name + "-0",
    });
  }

  async onMouseDown(){
    var position = this.state.suggestionHighlighted.slice(this.state.suggestionHighlighted.lastIndexOf("-") + 1);
    await this.setState({
      answer: this.state.suggestionList[position],
      oldAnswer: this.state.suggestionList[position],
      suggestionList: [],
      openMenu: false,
      boxBorderColor: "#fff",
    });
    this.props.callbackParent(this.state.answer, this.props.name);
  }

  onFocus(){
    this.setState({
      openMenu: true,
      boxBorderColor: "var(--blue)",
      placeHolder: this.state.answer || this.state.placeHolder,
      answer: '',
      suggestionList: this.props.list,
      suggestionHighlighted: "suggestion-" + this.props.name + "-0",
    })
  }

  onBlur(){
    this.setState({
      openMenu: false,
      boxBorderColor: "#fff",
      answer: this.state.oldAnswer,
    })
  }

  onMouseOver(){
    if(!this.state.openMenu)
    this.setState({
      boxBorderColor: "#999"
    })
  }

  onMouseOut(){
    if(this.state.openMenu){
      this.setState({
        boxBorderColor: "var(--blue)"
      })
    }
    else{
      this.setState({
        boxBorderColor: "#fff"
      })
    }
  }

  onMouseOverSuggestion(e){
    this.setState({
      suggestionHighlighted: e.target.id,
    });
  }

  render() {
    const suggestionClassName = classNames('suggestion-' + this.props.name);
    const dropdownClassName = classNames('dropdown-' + this.props.name);
    const headClassName = classNames('head-' + this.props.name);
    const menuClassName = classNames('menu-' + this.props.name);
    var suggestion = [];
    if(this.state.suggestionList.length===0){
      suggestion.push(
        <div key="0" style={{opacity:"0.3"}}>No results found</div>
      )
    }else{
      suggestion = this.state.suggestionList.map((element, index) => {
        return(
          <div
            className={suggestionClassName}
            key={index}
            id={"suggestion-" + this.props.name + "-" + index}
            onMouseDown={this.onMouseDown}
            onMouseOver={this.onMouseOverSuggestion}
          >
            {element}
          </div>
        )
      });
    }
    return (
      <React.Fragment>
        <div
          tabIndex="0"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={dropdownClassName}
        >
          <div className={headClassName}>
            <input
              type="text"
              placeholder={this.state.placeHolder}
              onChange={this.onChange}
              value={this.state.answer}
              onKeyDown={this.onKeyDown}
              spellCheck={false}
              ref={this.props.inputRef}
            />
            <i className="material-icons"
              onMouseDown={this.onMouseDownI}
            >arrow_drop_down</i>
          </div>
            {(this.state.openMenu&&suggestion.length>0)&&(
              <div className={menuClassName} ref={this.scrollField}>
                {suggestion}
              </div>
            )}
        </div>
        <style jsx="true">{`
          .${suggestionClassName}{
            height: 40px;
            display: flex;
            align-items: center;
          }
          .${dropdownClassName}{
            border-style: solid;
            border-width: 1px;
            border-radius: 5px;
            border-color: ${this.state.boxBorderColor};
            background-color: white;
            padding: 5px;
            width: 100%;
            outline:none;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          }
          .${headClassName}{
            display: flex;
            justify-content: space-between;
            border-bottom: ${this.state.openMenu&&"0.5px solid var(--blue)"};
            padding-bottom: 8px;
            padding-top: 8px;
          }
          .${headClassName} input{
            width: 100%;
            outline:none;
            background-color: transparent;
            margin-left:4px;
            font-family:'Roboto', sans-serif;
            font-size: 16px;
          }
          .${headClassName} i{
            vertical-align: center;
            color: var(--pink);
          }
          .${headClassName} i:hover{
            cursor: pointer;
           }
          .${menuClassName}{
            height:100%;
            max-height: 30vh;
            overflow-y: auto;
            padding-top:5px;
          }
          #${this.state.suggestionHighlighted}{
            background: #E5F2F8;
          }
          /* width */
          ::-webkit-scrollbar {
            width: 10px;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius:10px;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: var(--blue);
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default ComboboxWithSuggestion;
