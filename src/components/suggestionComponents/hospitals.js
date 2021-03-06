import React from 'react';
import Icons from '../icons';
import { ICONS } from '../../utils/ICONS'

export default class Hospitals extends React.Component {
  constructor(props){
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick(e){
    this.props.onClick(e);
  }

  render(){
    const rows = [];
    for(var i = 0; i < this.props.hospitais.length; i++){
      const rowsElement = [];
      rowsElement.push(<h3 key={i}>{this.props.hospitais[i].regiao}</h3>);
      for(var j = 0; j < this.props.hospitais[i].hospitais.length; j++){
        rowsElement.push(<p key={i.toString() + j.toString()}>{this.props.hospitais[i].hospitais[j].aliasNome}</p>);
      }
      rows.push(rowsElement);
    }

    return(
      <React.Fragment>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", cursor:"pointer"}} onClick={this.onClick}>
          <h2 style={{paddingBottom: 0}}><Icons icon={ICONS.HOSPITAIS} color={"var(--pink)"}/> Hospitais Incluídos</h2>
          {!this.props.showHospitals&&<i className="material-icons">keyboard_arrow_right</i>}
          {this.props.showHospitals&&<i className="material-icons">keyboard_arrow_down</i>}
        </div>
        {this.props.showHospitals&& rows}
      </React.Fragment>
    );
  }
}
