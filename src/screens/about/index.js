import React from "react";
import SimpleSlider from "./slider"

class About extends React.Component{
  render(){
  return(
    <div>
      <div>
          <div className="header">
            <img src='/assets/images/logo-full1.png' alt="" />
          </div>
          <div className="body">
            <div className="infoField">
              <h2>Quem Somos?</h2>
              <p>Acreditamos que saúde de qualidade é um direito de todos.</p>
              <p>Por isso estamos reinventando o mercado de benefícios de saúde, com pessoas incríveis e tecnologia de ponta.</p>
              <p>Para tanto, oferecemos um site que traça o perfil de cada pessoa a partir de perguntas simples. A partir dos dados, o Algoritmo de Otimização apresenta os planos de saúde mais adequados para o perfil indicado. A contratação pode ser feita no mesmo dia. </p>
              <p>Tudo pelo celular: prático e simples.</p>
              <p>Operamos sob o Número SUSEP: 10.2042869.3, em respeito às leis e normas da ANS (Agência Nacional de Saúde Suplementar). Atuamos de acordo com a <a href="http://www.ans.gov.br/component/legislacao/?view=legislacao&task=TextoLei&format=raw&id=MzMyNw==" target="_blank" rel="noopener noreferrer">Resolução Normativa RN nº 413</a>, a qual dispõe sobre os procedimentos para a contratação eletrônica de planos privados de assistência à saúde.</p>
            </div>
            <div className="infoField carousel">
              <h2>Nossos Parceiros</h2>
              <SimpleSlider/>
              <p>texto sem conteúdo!</p>
            </div>
            <div className="infoField">
              <h2>Onde atuamos</h2>
              <p>São Paulo, Rio de Janeiro, Minas Gerais,Espírito Santo, Ceará, Pernambuco, Rio Grande do Norte, Bahia, Distrito Federal, Goiás, Rio Grande do Sul, Santa Catarina, Paraná, Manaus, Amapá, Roraima.</p>
            </div>
            <div className="infoField">
              <h2>Contato</h2>
              <p>Fale conosco por email: contato@consultorio.com</p>
              <p>Se preferir, nos ligue: (21) 98153-8777</p>
              <p>Ou <a href="https://api.whatsapp.com/send?1=pt_BR&phone=5521968840096" target="_blank" rel="noopener noreferrer">clique aqui</a> para falar pelo whatsapp.</p>
            </div>
            <div className="infoField">
              <h2>Blog</h2>
              <p>Para saber mais sobre saúde, acesse também nosso blog!</p>
              <p><a href="https://consultorio.com/blog">consultorio.com/blog</a></p>
            </div>
            <div className="infoField">
              <h2>Perguntas Frequentes</h2>
              <p><a href="/faq" target="_blank">Clique aqui</a> para sanar todas suas dúvidas sobre planos de saúde.</p>
            </div>
            <div className="infoField">
              <h2>Termos de Uso</h2>
              <p><a href="http://consultorio-site.s3-website-us-east-1.amazonaws.com/assets/Termos_de_Uso.pdf" target="_blank" rel="noopener noreferrer">Clique aqui</a> para verificar nossos termos de uso.</p>
            </div>

          </div>
        </div>
        <style jsx='true'>{`
          @font-face {
            font-family: 'Gotham';
            src: url('/assets/fonts/GothamRoundedMedium_21022.ttf')
          }
          h2 {
            font-family:'Gotham';
          }
          h3 {
            font-family:'Gotham';
            color: #555
          }
          p {
            font-family: 'Roboto';
            margin: 5px 0px 0px 0px;
          }
          .header{
            display: flex;
            justify-content: center;
            padding: 2vh;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header img{
            height: 11vw;
          }
          .body{
          }
          .infoField{
            background-color: #fff;
            padding: 15px 15px 15px 15px;
            box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.1);
            margin: 15px 15px 15px 15px;
            border-radius: 5px;
          }
          .carousel p{
            margin-top: 10px;
            opacity:0;
          }
          .slick-slider{
            margin-top: 10px;
          }
          @media(min-width:769px){
            .header{
              //background-color: #fff;
              //position: fixed;
              //top: 0px;
              //min-width: 100vw;
              justify-content: flex-start;
            }
            .header img{
              height: 45px;
              padding-left: 15px;
            }
            .infoField{
              box-shadow: none;
              margin-bottom: 0px;
              margin-top: 0px;
              background-color: transparent;
            }
            .body{
              //margin-top:75px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default About;
