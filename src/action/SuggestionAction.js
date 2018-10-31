import * as ActionType from './ActionType';
import SuggestionApi from '../api/SuggestionApi';
import LogApi from '../api/LogApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const setSuggestionShowRegionalResponse = showRegional => ({
  type: ActionType.SET_SUGGESTION_SHOW_REGIONAL,
  showRegional: showRegional
});

export function setSuggestionShowRegionalAction(showRegional) {
  return (dispatch) => {
    dispatch(setSuggestionShowRegionalResponse(showRegional));
  };
}

export const setSuggestionShowNacionalResponse = showNacional => ({
  type: ActionType.SET_SUGGESTION_SHOW_NACIONAL,
  showNacional: showNacional
});

export function setSuggestionShowNacionalAction(showNacional) {
  return (dispatch) => {
    dispatch(setSuggestionShowNacionalResponse(showNacional));
  };
}

export const setSuggestionShowEnfermariaResponse = showEnfermaria => ({
  type: ActionType.SET_SUGGESTION_SHOW_ENFERMARIA,
  showEnfermaria: showEnfermaria
});

export function setSuggestionShowEnfermariaAction(showEnfermaria) {
  return (dispatch) => {
    dispatch(setSuggestionShowEnfermariaResponse(showEnfermaria));
  };
}

export const setSuggestionShowApartamentoResponse = showApartamento => ({
  type: ActionType.SET_SUGGESTION_SHOW_APARTAMENTO,
  showApartamento: showApartamento
});

export function setSuggestionShowApartamentoAction(showApartamento) {
  return (dispatch) => {
    dispatch(setSuggestionShowApartamentoResponse(showApartamento));
  };
}

export const setShowHospitalarResponse = showHospitalar=> ({
  type: ActionType.SET_SHOW_HOSPITALAR,
  showHospitalar: showHospitalar
});

export function setShowHospitalarAction(showHospitalar) {
  return (dispatch) => {
    dispatch(setShowHospitalarResponse(showHospitalar));
  };
}

export const setShowAmbulatorialResponse = showAmbulatorial=> ({
  type: ActionType.SET_SHOW_AMBULATORIAL,
  showAmbulatorial: showAmbulatorial
});

export function setShowAmbulatorialAction(showAmbulatorial) {
  return (dispatch) => {
    dispatch(setShowAmbulatorialResponse(showAmbulatorial));
  };
}

export const setShowCoparticipacaoResponse = showCoparticipacao=> ({
  type: ActionType.SET_SHOW_COPARTICIPACAO,
  showCoparticipacao: showCoparticipacao
});

export function setShowCoparticipacaoAction(showCoparticipacao) {
  return (dispatch) => {
    dispatch(setShowCoparticipacaoResponse(showCoparticipacao));
  };
}

export const setShowWithoutHospitalResponse = showWithoutHospital=> ({
  type: ActionType.SET_SHOW_WITHOUT_HOSPITAL,
  showWithoutHospital: showWithoutHospital
});

export function setShowWithoutHospitalAction(showWithoutHospital) {
  return (dispatch) => {
    dispatch(setShowWithoutHospitalResponse(showWithoutHospital));
  };
}

export const setShowOutsideRegionResponse = showOutsideRegion => ({
  type: ActionType.SET_SHOW_OUTSIDE_REGION,
  showOutsideRegion: showOutsideRegion
});

export function setShowOutsideRegionAction(showOutsideRegion) {
  return (dispatch) => {
    dispatch(setShowOutsideRegionResponse(showOutsideRegion));
  };
}

export const setSuggestionsResponse = suggestions => ({
  type: ActionType.SET_SUGGESTIONS,
  suggestions: suggestions
});

export function setSuggestionsAction(suggestions) {
  return (dispatch) => {
    dispatch(setSuggestionsResponse(suggestions));
  };
}

export const setAgesArrayResponse = agesArray => ({
  type: ActionType.SET_AGES_ARRAY,
  agesArray: agesArray
});

export function setAgesArrayAction(agesArray) {
  return (dispatch) => {
    dispatch(setAgesArrayResponse(agesArray));
  };
}

export const getSuggestionsResponse = () => ({
  type: ActionType.GET_SUGGESTIONS_RESPONSE
});

export function getSuggestionsAction() {
  return function (dispatch, getState) {
    const {regionReducer, hospitalReducer,cnpjReducer, idadePFReducer, idadePJReducer, locationReducer, ocupacaoReducer, prefHospitalReducer, suggestionReducer, acomodacaoReducer, abrangenciaReducer} = getState();
    const request = {
      showHospitalar: suggestionReducer.showHospitalar,
      showAmbulatorial: suggestionReducer.showAmbulatorial,
      showCoparticipacao: suggestionReducer.showCoparticipacao,
      showRegional: suggestionReducer.showRegional,
      showNacional: suggestionReducer.showNacional,
      showEnfermaria: suggestionReducer.showEnfermaria,
      showApartamento: suggestionReducer.showApartamento,
      queryType: prefHospitalReducer.hospitalType,
      queryInput: prefHospitalReducer.hospital,
      profissao: ocupacaoReducer.ocupacao,
      cidade: locationReducer.city,
      estado: locationReducer.state,
      isCapital: locationReducer.isCapital,

      regioes: regionReducer.regions,
      hospitais: hospitalReducer.hospitals,
      showWithoutHospital: suggestionReducer.showWithoutHospital,
      showOutsideRegions: suggestionReducer.showOutsideRegion,
    }
    if(suggestionReducer.agesArray === ""){
      request.showRegional = abrangenciaReducer.showRegional
      request.showNacional = abrangenciaReducer.showNacional
      request.showEnfermaria = acomodacaoReducer.showEnfermaria
      request.showApartamento = acomodacaoReducer.showApartamento
    }
    if(cnpjReducer.cnpj === 'noCnpj'){
      request.queryPerson = 'PF';
      request.idades = idadePFReducer.idadePF;
    }else{
      request.queryPerson = 'PME';
      request.idades = idadePJReducer.idadePJ;
    }
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      SuggestionApi.getSuggestions(request)
        .then((response) => {
          dispatch(setSuggestionsResponse(response.plansGroupedByOperadora));
          dispatch(setAgesArrayResponse(response.agesArray));
          dispatch(getSuggestionsResponse());
          resolve()
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          reject(error)
        });
    })
  };
}

export const addSuggestionPickAction = () => ({
  type: ActionType.ADD_SUGGESTION_PICK_RESPONSE
});

export function saveSuggestionPickAction() {
  return function (dispatch, getState) {
    const {suggestionDetailsReducer, suggestionReducer, answerReducer} = getState();
    const filterConfig = {
      agesArray: JSON.stringify(suggestionReducer.agesArray),
      showRegional: suggestionReducer.showRegional,
      showNacional: suggestionReducer.showNacional,
      showEnfermaria: suggestionReducer.showEnfermaria,
      showApartamento: suggestionReducer.showApartamento,
      showHospitalar: suggestionReducer.showHospitalar,
      showAmbulatorial: suggestionReducer.showAmbulatorial,
      showCoparticipacao: suggestionReducer.showCoparticipacao,
      showWithoutHospital: suggestionReducer.showWithoutHospital
    };
    var suggestionPick = {
      planId: suggestionDetailsReducer.planoId,
      filterConfig: filterConfig,
      answerId: answerReducer.answerId
    }
    if(suggestionReducer.suggestions.length){
      suggestionPick.suggestionsList = suggestionReducer.suggestions.map(suggestion => suggestion.plans.map(plan => plan.planoId))
    }

    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      SuggestionApi.postSuggestionPick(suggestionPick)
        .then(() => {
          dispatch(addSuggestionPickAction());
          resolve()
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          LogApi.sendLog(error)
          reject(error);
        });
    })
  };
}
