import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const suggestionReducer = (state = initialState.suggestionReducer, action) => {
  switch(action.type) {
    case ActionType.SET_SUGGESTION_SHOW_REGIONAL: {
      return {
        ...state,
        showRegional: action.showRegional
      };
    }
    case ActionType.SET_SUGGESTION_SHOW_NACIONAL: {
      return {
        ...state,
        showNacional: action.showNacional
      };
    }
    case ActionType.SET_SUGGESTION_SHOW_ENFERMARIA: {
      return {
        ...state,
        showEnfermaria: action.showEnfermaria
      };
    }
    case ActionType.SET_SUGGESTION_SHOW_APARTAMENTO: {
      return {
        ...state,
        showApartamento: action.showApartamento
      };
    }
    case ActionType.SET_SUGGESTIONS: {
      return {
        ...state,
        suggestions: _.assign(action.suggestions)
      };
    }
    case ActionType.SET_AGES_ARRAY: {
      return {
        ...state,
        agesArray: _.assign(action.agesArray)
      };
    }
    case ActionType.SET_SHOW_HOSPITALAR: {
      return {
        ...state,
        showHospitalar: action.showHospitalar
      };
    }
    case ActionType.SET_SHOW_AMBULATORIAL: {
      return {
        ...state,
        showAmbulatorial: action.showAmbulatorial
      };
    }
    case ActionType.SET_SHOW_COPARTICIPACAO: {
      return {
        ...state,
        showCoparticipacao: action.showCoparticipacao
      };
    }
    case ActionType.SET_SHOW_WITHOUT_HOSPITAL: {
      return {
        ...state,
        showWithoutHospital: action.showWithoutHospital
      };
    }
    case ActionType.SET_SHOW_OUTSIDE_REGION: {
      return {
        ...state,
        showOutsideRegion: action.showOutsideRegion
      };
    }
    default: { return state; }
  }
};

export default suggestionReducer;
