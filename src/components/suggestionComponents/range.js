import React from 'react'
import Icons from '../icons';
import { ICONS } from '../../utils/ICONS'

export default ({abrangencia, numHospitais, numLabs, numHospitaisNaRegiao, preference, satisfazPreferencia}) => {
  var preferenceMessage;
  if(preference.hospitalType === "bairro"){
    if(satisfazPreferencia){
      preferenceMessage = `Inclui também ${numHospitaisNaRegiao} hospita${numHospitaisNaRegiao>1?"is":"l"} na sua região de preferência.`;
    }else{
      preferenceMessage = `Esse plano não inclui hospitais na sua região de preferência.`;
    }
  }else{
    if(satisfazPreferencia){
      preferenceMessage = `Inclui também ${preference.hospital}.`;
    }else{
      preferenceMessage = `Esse plano não inclui ${preference.hospital}.`;
    }
  }
  return(
    <React.Fragment>
      <h2><Icons icon={ICONS.ABRANGENCIA} color={"var(--pink)"}/> Abrangência {abrangencia}</h2>
        {abrangencia==="Nacional"&&
        <p>Abrange Hospitais, Clínicas e Laboratórios credenciados ao Plano em Território Nacional. É indicado para quem costuma viajar.</p>}
        {abrangencia==="Regional"&&
        <p>A cobertura deste plano inclui somente Hospitais, Clínicas e Laboratórios credenciados ao Plano na sua região. É indicado para quem não costuma viajar muito.</p>}
        <p>Esse plano é atendido em {numHospitais} hospitais{numLabs?" e "+numLabs+" laboratórios":""}{abrangencia==="Nacional"?" espalhados por todo o país":""}. {preferenceMessage}</p>
        <p><a href="https://consultorio.com/blog/2018/06/08/entenda-a-abrangencia-do-plano-de-saude-qual-a-diferenca-entre-nacional-e-regional/" target="_blank" rel="noopener noreferrer">Clique Aqui</a> para saber mais sobre abrangência.</p>
    </React.Fragment>
  )
}
