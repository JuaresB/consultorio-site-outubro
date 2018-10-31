import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const abrangenciaReducer = (state = initialState.abrangenciaReducer, action) => {
  switch(action.type) {
    case ActionType.SET_SHOW_REGIONAL: {
      return {
        ...state,
        showRegional: action.showRegional
      };
    }
    case ActionType.SET_SHOW_NACIONAL: {
      return {
        ...state,
        showNacional: action.showNacional
      };
    }
    default: { return state; }
  }
};

export default abrangenciaReducer;
