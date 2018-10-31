import React, { Component } from 'react'

class Counter extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="counter">
        <button className="minus" onClick={this.props.onClickMinus}>
          <i className="material-icons">remove</i>
        </button>
        <input value={this.props.value} ref={this.props.inputRef} onChange={this.props.onChange} type="number" min="0" max="999"/>
        <button className="plus" onClick={this.props.onClickPlus}>
          <i className="material-icons">add</i>
        </button>
        <style jsx="true">{`
          .counter{
            cursor: pointer;
            user-select: none;
            background: #FFF;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 20px;
            font-family: 'Roboto', sans-serif;
            outline: none;
            font-weight: 400;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            vertical-align: middle;
            border-radius: 5px;
          }
          .counter input{
            width: 50px;
            height: 24px;
            outline: none;
            font-size: 20px;
            text-align: center;
            -webkit-appearance: none;
            margin: 0;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
              -webkit-appearance: none;
          }
          .plus, .minus {
            background-color: white;
            color: #989898;
            outline: none;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .plus, .minus .material-icons{
            font-size: 24px;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  }
}
export default Counter
