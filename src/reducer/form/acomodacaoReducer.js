import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const acomodacaoReducer = (state = initialState.acomodacaoReducer, action) => {
  switch(action.type) {
    case ActionType.SET_SHOW_ENFERMARIA: {
      return {
        ...state,
        showEnfermaria: action.showEnfermaria
      };
    }
    case ActionType.SET_SHOW_APARTAMENTO: {
      return {
        ...state,
        showApartamento: action.showApartamento
      };
    }
    default: { return state; }
  }
};

export default acomodacaoReducer;
