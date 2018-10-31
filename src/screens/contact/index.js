import React, { Fragment } from 'react';

class Contact extends React.Component {
    render () {
        return (
            <Fragment>
                <div className='content'>
                <div className='contentText'>
                <h2>Quer falar com a gente?</h2>
                <h4>Fale conosco por email:</h4>
                <div><p>contato@consultorio.com</p></div>
                <h4>Se preferir, nos ligue:</h4>
                <div><p>(21) 98153-8777</p></div>
                <br/>
                <div><p>CPC CORRETORA DE SEGUROS LTDA - ME</p></div>
                <br/>
                <div><p><b>CNPJ:</b> 28.087.388/0001-29</p></div>
                <br/>
                <div><p><b>Endereço:</b><br/> Avenida Brig Luis Antonio, 2729, conj. 110, Jardim Paulista | São Paulo | SP</p></div>
                <br/>
                <div><p><a href="https://api.whatsapp.com/send?1=pt_BR&phone=5521968840096" ><b>Ou clique aqui para falar pelo whatsapp</b></a></p></div>
                </div>
                </div>
                <style jsx>{`
                .content {
                    display: flex;
                    flex-direction: column;
                    padding: 0 15px;
                    height: 100vh;
                    background: url(/static/images/bg.png) repeat;
                    -webkit-box-pack: center;
                    -webkit-box-align: center;
                    align-items: center;
                    text-align: center;
                }
                .contentText {
                    margin-top:50px;
                }
                h3 {
                    font-size: 24px;
                    font-weight: 200;
                    margin: 20px;
                }
                h2 {
                    font-size: 28px;
                    font-weight: 400;
                    margin: 20px;
                }
                .icon-modal {
                    font-size: 80px;
                    color: #e71b91;
                }
                `}</style>
            </Fragment>
        )
    }
}



export default Contact
