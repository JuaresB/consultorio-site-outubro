import React from 'react'

export default class Header3 extends React.Component{
  render(){
    return(
      <React.Fragment>
        <div class="containerHeader intern">
          <a href="/planos/" class="back-header">
            <i class="fa fa-angle-left"></i> Voltar
          </a>
          <div></div>
          <div>
            <img src="/assets/images/profile-header.png" alt=""/>
          </div>
        </div>
        <style jsx>{`
        .containerHeader{
          justify-content: space-between;
          display: flex;
          height: 10vh;
        }
        `}</style>
      </React.Fragment>
    )
  }
}
