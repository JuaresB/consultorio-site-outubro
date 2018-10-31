import React from 'react';
import Icons from '../icons';
import { ICONS } from '../../utils/ICONS'

export default class Laboratories extends React.Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e){
    this.props.onClick(e);
  }

  render(){
    const rows = [];
    for(var i = 0; i < this.props.laboratorios.length; i++){
      const rowsElement = [];
      rowsElement.push(<h3 key={i}>{this.props.laboratorios[i].regiao}</h3>);
      for(var j = 0; j < this.props.laboratorios[i].laboratorios.length; j++){
        rowsElement.push(<p key={i.toString() + j.toString()}>{this.props.laboratorios[i].laboratorios[j].nome}</p>);
      }
      rows.push(rowsElement);
    }

    return(
      <React.Fragment>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", cursor:"pointer"}} onClick={this.onClick}>
          <h2><Icons icon={ICONS.LABORATORIOS} color={"var(--pink)"}/> Laboratórios Incluídos</h2>
          {!this.props.showLabs&&<i className="material-icons">keyboard_arrow_right</i>}
          {this.props.showLabs&&<i className="material-icons">keyboard_arrow_down</i>}
        </div>
        {this.props.showLabs && rows}
      </React.Fragment>
    );
  }
}
