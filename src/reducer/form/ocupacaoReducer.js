import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const ocupacaoReducer = (state = initialState.ocupacaoReducer, action) => {
  switch(action.type) {
    case ActionType.SET_OCUPACAO: {
      return {
        ...state,
        ocupacao: action.ocupacao
      };
    }
    case ActionType.SET_OCCUPATION_NOT_FOUND: {
      return {
        ...state,
        occupationNotFound: action.occupationNotFound
      };
    }
    default: { return state; }
  }
};

export default ocupacaoReducer;
