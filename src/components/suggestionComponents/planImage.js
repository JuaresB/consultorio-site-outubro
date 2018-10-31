import React from 'react'

export default class PlanImage extends React.Component{
  constructor(props){
    super(props)
    this.state={
      showImage: true,
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick(e){
    this.props.onClick(e)
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
    return (
      <React.Fragment>
        {this.state.showImage&&
          <img
            className="planImage"
            onError={() => this.setState({showImage: false})}
            onClick={this.onClick}
            src={"/assets/images/plans/" + this.cleanUpSpecialChars(this.props.operadora) + ".png"}
            height="83px"
            width="83px"
            alt=""
          />}
        {!this.state.showImage&&
          <h2>{this.props.operadora}</h2>
        }
        <style jsx="true">{`
          .planImage{
            border-radius: 5px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            font-family: 'Gotham';
            font-weight: bold;
            font-size: 2em;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
