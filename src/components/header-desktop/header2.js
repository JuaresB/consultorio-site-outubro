import React from 'react'

export default class Header2 extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div className="containerHeader">
          {/* <h2 className="logoHeader">Consultorio.com</h2>
          <h2 className="headerTitle">Planos</h2> */}
          <img className="logo-full" src="/assets/images/logo-full1.png"  alt=""/>
        </div>
        <style jsx="true">{`
        .logo-full{
          position: absolute;
          left: 50%;
          margin-left: -112.5px;
          height: 33.7px;
          width: 225px;
        }
        .fa-user-circle{
          color: #fff;
          font-size: 3vh;
        }
        .headerTitle{
          position: absolute;
          left: 50%;
          margin-left: -40px;
        }
        .logoHeader {
          background: url('/assets/images/icon-logo1.png') no-repeat;
          width: 45px;
          height: 45px;
          display: block;
          text-indent: -99999px;
          background-size: 45px;
        }
        .containerHeader{
          min-height: 60px;
          position: relative;
          background: transparent;
          width: 100%; /* Full width */
          text-weight: bold;
          color: var(--pink);
          justify-content: space-between;
          display: flex;
          flex-direction: row;
          padding: 6vh 5vw;
          align-items: center;
          font-family: 'Gotham', 'Varela Round', sans-serif !important;
          //box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05), 0px 0px 4px rgba(0, 0, 0, 0.1);
          //border-bottom: 2px solid #fff;
        }
        @media(min-width: 769px){
          .logoHeader {
            background: url('/assets/images/icon-logo1.png') no-repeat;
            width: 60px;
            height: 60px;
            display: block;
            text-indent: -99999px;
            background-size: 60px;
          }
          .containerHeader{
            margin-bottom: 2vh;
            border-bottom: 2px solid #fff;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05), 0px 0px 4px rgba(0, 0, 0, 0.1);
          }
        }
        `}</style>
      </React.Fragment>
    )
  }
}
