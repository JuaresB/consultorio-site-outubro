import React from 'react'
import Rating from './rating';

export default class PlanDetailsImage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showImage: true,
    }
    this.onClickReturn = this.onClickReturn.bind(this)
    this.onContract = this.onContract.bind(this)
    this.onError = this.onError.bind(this)
  }
  onClickReturn(){
    this.props.onClickReturn()
  }

  onContract(e){
    this.props.onContract(e)
  }

  onError(){
    this.setState({
      showImage: false,
    })
  }

  cleanUpSpecialChars(str){
    str = str.replace(/[ÀÁÂÃÄÅ]/g,"A");
    str = str.replace(/[àáâãäå]/g,"a");
    str = str.replace(/[ÈÉÊË]/g,"E");
    str = str.replace(/[èéê]/g,"e");
    str = str.replace(/[ÌÍÎ]/g,"I");
    str = str.replace(/[ìíî]/g,"i");
    str = str.replace(/[ÒÓÔÕ]/g,"O");
    str = str.replace(/[òóôõ]/g,"o");
    str = str.replace(/[ÙÚÛ]/g,"U");
    str = str.replace(/[ùúû]/g,"u");
    return str.replace(/[^a-z0-9]/gi,'');
  }

  render(){
    const colored = this.props.operadora === "Amil" || this.props.operadora === "Alianz" || this.props.operadora === "Unimed" || this.props.operadora === "Vitallis"
    const color = colored? "#FFC400":"#AB8D41"

    return (
      <React.Fragment>
        {this.state.showImage&&
        <div className="planImage">
          <img className="image" onError={this.onError} src={`/assets/images/plans/${this.cleanUpSpecialChars(this.props.operadora)}.png`} />
          <div className="planImageTop">
            <div className="planImageTopInfo">
              <Rating value={this.props.rating} color={color} size={16}/>
            </div>
            <img src="/assets/images/card-icons/_x_e_circulo_icon.svg" width="26px" height="26px" alt="" onClick={this.onClickReturn} />
          </div>
          <div className="planImageBottom">
            <div className="planImageBottomInfo">
              {/* <h4>R$ 1000,00</h4> */}
              <h3>{this.props.plano}</h3>
            </div>
            <button onClick={this.onContract}>Contratar</button>
          </div>
        </div>
          // <img
          //   className="planImage"
          //   onError={() => this.setState({showImage: false})}
          //   src={"/assets/images/plans/" + this.cleanUpSpecialChars(this.props.operadora) + ".png"}
          //   height="83px"
          //   width="83px"
          //   alt=""
          // />
        }
        <style jsx="true">{`
          .planImage{
            position: relative;
            ${!colored &&"box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);"}
          }
          .planImage .image{
            width: 100%;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
          }
          .planImageTop{
            position: absolute;
            display: flex;
            justify-content: space-between;
            width: 90%;
            top: 20px;
            margin-left: 5%;
          }
          .planImageBottom{
            position: absolute;
            bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90%;
            margin-left: 5%;
          }
          .planImageBottom button{
            width: 113px;
            height: 42px;
            border-radius: 5px;
            background-color: var(--pink);
            color: white;
            font-family: Gotham;
          }
          .planImageBottomInfo{
            max-width: 60%;
          }
          .planImageBottomInfo h4{
            ${colored ? "color: white !important;":"color:#646464 !important;"}
            font-family: Gotham !important;
            font-size: 16px;
          }
          .planImageBottomInfo h3{
            ${colored ? "color: white !important;":"color:#646464 !important;"}
            font-family: Gotham !important;
            font-size: 21px;
          }
          .rating{
            margin: 0px !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
