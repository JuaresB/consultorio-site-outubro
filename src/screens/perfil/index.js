import React from 'react'

export default class Perfil extends React.Component{
  render() {
    return(
      <div className="container landingImage">
        <div className="container landing">
        <div className="perfil-header">
          <h2 className="logo full">consultorio.com</h2>
          <i className="material-icons">close</i>
        </div>
        <p className ="perfil-title">Meu Perfil</p>
          <div className="holder-content">
            <div className='fl-input-container'>
              <label className='fl-input-label' >Nome</label>
              <input className='fl-input' type='text' value='Juarês' disabled/>
              <span className='fl-input-bar'></span>
            </div>
            <div className='fl-input-container'>
              <label className='fl-input-label' >E-mail</label>
              <input className='fl-input' type='text'/>
              <span className='fl-input-bar'></span>
            </div>
            <div className='fl-input-container'>
              <label className='fl-input-label' >Telefone</label>
              <input className='fl-input' type='text'/>
              <span className='fl-input-bar'></span>
            </div>
        </div>
        </div>
        <style jsx>{`

          .perfil-header{
            display: flex;
            flex-direction: row;
            margin-top:5vh;
            justify-content: space-between;
          }
          p{
            color: black !important;
            font-family: Roboto;
            font-weight: normal;
          }
          .material-icons{
            color: black;
            margin-right: 3vh;
            font-size: 25px;
          }
          .logo.full {
            margin-left:3vw;
          }
          .fl-input-container {
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            flex-direction: column;
            padding: 10px 0px;
            position: relative;
            margin-bottom: 15px;
            margin-top: 20px;
          }
          .fl-input-container input {
            -moz-appearance: none;
            -webkit-appearance: none;
            -webkit-tap-highlight-color: transparent;
            border-radius: 0;
            display: -moz-flex;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            font-size: 100%;
            line-height: 25px;
            color: black;
            background: transparent;
          }
          .fl-input-container label{
            -webkit-font-smoothing: antialiased;
            font-family: 'Roboto', sans-serif;
            text-shadow: none;
          }
          .fl-input-label {
            color: black;
            font-weight: normal;
            opacity: 0.75;
            order: 1;
            padding-left: 2px;
            pointer-events: none;
          }
          .fl-input {
            -ms-flex-order: 2;
            -ms-flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            -webkit-order: 2;
            border: 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.15);
            color: #000;
            flex: 1 1 auto;
            order: 2;
            outline: 0;
          }
          .fl-input-bar {
            -ms-flex-order: 3;
            -webkit-order: 3;
            display: block;
            order: 3;
            top: 0;
          }
        `}</style>
      </div>
    )
  }
}
