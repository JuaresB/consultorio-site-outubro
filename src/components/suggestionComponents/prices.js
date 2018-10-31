import React from 'react'
import { connect } from 'react-redux';
import Icons from '../icons';
import { ICONS } from '../../utils/ICONS';

class Prices extends React.Component {
  render(){
    const agesArray = this.props.agesArray;
    var pricePerLifeRange = [];
    var totalPrice = 0;
    var totalLifes = 0;
    for(var i = 0; i < 10; i++){
      if(agesArray[i] > 0){
        if(i === 0){
          totalPrice += this.props["preco0"] * agesArray[i];
          pricePerLifeRange.push(<p key={i}>{agesArray[i]}x vida{(agesArray[i] > 1) ? 's' : ''} de 0 a 18 anos: {parseFloat(this.props["preco0"])}</p>)
        }else if(i < 9){
          let aux = i - 1;
          aux = aux * 5;
          aux = aux + 19;
          let title = "preco" + aux;
          totalPrice += this.props[title] * agesArray[i];
          pricePerLifeRange.push(<p key={i}>{agesArray[i]}x vida{(agesArray[i] > 1) ? 's' : ''} de {aux} a {aux + 5} anos: {parseFloat(this.props[title])}</p>)
        }else{
          totalPrice += this.props["preco59"] * agesArray[i];
          pricePerLifeRange.push(<p key={i}>{agesArray[i]}x vida{(agesArray[i] > 1) ? 's' : ''} de 59 anos ou mais: {parseFloat(this.props["preco59"])}</p>)
        }
        totalLifes += agesArray[i];
      }
    }
    return(
      <React.Fragment>
        <h2><Icons icon={ICONS.PRECO_MEDIO} color={"var(--pink)"}/> Preço</h2>
        {pricePerLifeRange}
        <h4>Média por vida: R${(totalPrice/totalLifes).toFixed(2)}</h4>
        <h4>Total: R${totalPrice.toFixed(2)}</h4>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  agesArray: state.suggestionReducer.agesArray
});

export default connect(mapStateToProps)(Prices);
