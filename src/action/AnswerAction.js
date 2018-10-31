import * as ActionType from './ActionType';
import AnswerApi from '../api/AnswerApi';
import LogApi from '../api/LogApi';
import { checkForSignedUserAction } from './LoginAction'
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';
import { setSuggestionShowRegionalResponse, setSuggestionShowNacionalResponse, setSuggestionShowEnfermariaResponse, setSuggestionShowApartamentoResponse } from './SuggestionAction';

export const setNeedToSendAnswer = (needToSendAnswer) => ({
  type: ActionType.SET_NEED_TO_SEND_ANSWER,
  needToSendAnswer: needToSendAnswer
});

export const setAnswerIdResponse = (answerId) => ({
  type: ActionType.SET_ANSWER_ID,
  answerId: answerId
});

export function setAnswerIdAction(answerId) {
  return (dispatch) => {
    dispatch(setAnswerIdResponse(answerId));
  };
}

export const addNewAnswerResponse = () => ({
    type: ActionType.ADD_NEW_ANSWER_RESPONSE
});

export function saveAnswerAction() {
  return async (dispatch, getState) => {
    const {hospitalReducer, regionReducer, cnpjReducer, idadePFReducer, idadePJReducer, abrangenciaReducer, acomodacaoReducer, locationReducer, ocupacaoReducer, prefHospitalReducer, quemSeraIncluidoReducer} = getState();

    var ocupacao = ocupacaoReducer.ocupacao;
    if(ocupacao === "Não encontrei minha profissão"){
      ocupacao = ocupacao + ': ' + ocupacaoReducer.occupationNotFound
    }
    var abrangencia
    if(abrangenciaReducer.showRegional && abrangenciaReducer.showNacional){
      abrangencia = 'Ambos'
    }else if(abrangenciaReducer.showRegional){
      abrangencia = 'Regional'
    }else if(abrangenciaReducer.showNacional){
      abrangencia = 'Nacional'
    }else{
      abrangencia = 'Ambos'
    }
    var acomodacao
    if(acomodacaoReducer.showEnfermaria && acomodacaoReducer.showApartamento){
      acomodacao = 'Ambos'
    }else if(acomodacaoReducer.showEnfermaria){
      acomodacao = 'Enfermaria'
    }else if(acomodacaoReducer.showApartamento){
      acomodacao = 'Apartamento'
    }else{
      acomodacao = 'Ambos'
    }
    const answer = {
      cnpj: cnpjReducer.cnpj,
      idadePF: idadePFReducer.idadePF,
      idadePJ: idadePJReducer.idadePJ,
      abrangencia: abrangencia,
      acomodacao: acomodacao,
      cidade: locationReducer.city,
      estado: locationReducer.state,
      ocupacao: JSON.stringify(ocupacao),
      prefHospital: JSON.stringify(prefHospitalReducer),
      quemSeraIncluido: quemSeraIncluidoReducer,
      hospitais: JSON.stringify(hospitalReducer.hospitals),
      regioes: JSON.stringify(regionReducer.regions)
    }
    dispatch(ApiCallBeginAction());
    dispatch(setSuggestionShowRegionalResponse(abrangenciaReducer.showRegional))
    dispatch(setSuggestionShowNacionalResponse(abrangenciaReducer.showNacional))
    dispatch(setSuggestionShowEnfermariaResponse(acomodacaoReducer.showEnfermaria))
    dispatch(setSuggestionShowApartamentoResponse(acomodacaoReducer.showApartamento))
    await checkForSignedUserAction()(dispatch, getState)
    await AnswerApi.saveAnswer(answer)
      .then((resp) => {
        dispatch(addNewAnswerResponse());
        dispatch(setAnswerIdResponse(resp.answer.id));
        dispatch(setNeedToSendAnswer(false));
        LogApi.sendLog('answer saved successfully')
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        LogApi.sendLog(error)
      });
  };
}
