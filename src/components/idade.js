import React from 'react'

export default class Idade extends React.Component{
  constructor(props){
    super(props)
    this.idadeInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);

  }
  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.idadeInput.current.focus();
  }

  render(){
    return(
      <React.Fragment>
        <div className="label">
          <div className="years-old">
            <span>{this.props.name}</span>
            <div className="inputPosition">
              <div className="input" onClick={this.focusTextInput}>
                <input
                type="number"
                ref={this.idadeInput}
                id={this.props.id}
                name={this.props.name}
                placeholder="-"
                value={this.props.value}
                onChange={(e)=>{this.props.onChange(e)}}
                onFocus={this.props.onFocus} />
                anos
                {this.props.id!==1&&<i onClick={e=>this.props.onDeleteAge(e.target.id)} className="fa fa-times-circle" id={this.props.id}></i>}
              </div>
            </div>
          </div>
          <span className="errorLabel">{this.props.errorMessage}</span>
        </div>
        <style jsx="true">{`
          .input {
            cursor: pointer;
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
          .label {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 20px 0;
          }
          .label span {
            font-size: 14px;
            font-weight: 400;
            margin-right: 10px;
            align-self: center;
          }
          .input input[type="number"] {
            width: 40px;
          }
          .input {
            width: 100%; !important
            padding-left: 30px !important;
          }
          .label {
            width: 100%;
            margin: 30px 0;
          }
          .inputPosition{
            width: 100%;
            outline: none;
            display: inline-block;
            position: relative;
            width: 65%;
          }
          .input input {
            width: 100%;
            height: 40px;
            font-size: 16px;
            font-family: 'Roboto', sans-serif;
            outline: none;
            font-weight: 300;
          }
          .input i{
            position: absolute;
            top: -4px;
            right: -4px;
            color: var(--pink);
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            font-size: 20px;
          }
          .label span {
            font-size: 14px;
            font-weight: 400;
            margin-right: 10px;
          }
          .years-old {
            display: flex;
            align-items: center;
            position: relative;
            justify-content: space-between;
          }
          .errorLabel {
            font-size: 15px;
            font-family: 'Roboto', sans-serif;
            color: #E74C3C;
            padding-top:5px;
            position: relative;
            font-size: 12px;
            float: left;
          }
          `}</style>
      </React.Fragment>
    )
  }
}
