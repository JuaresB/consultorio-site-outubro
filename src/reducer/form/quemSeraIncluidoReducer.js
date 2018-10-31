import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const quemSeraIncluidoReducer = (state = initialState.quemSeraIncluidoReducer, action) => {
  switch(action.type) {
    case ActionType.SET_QUEMSERAINCLUIDO: {
      return {
        ...state,
        socios: action.socios,
        dependentes: action.dependentes,
        funcionarios: action.funcionarios
      };
    }
    default: { return state; }
  }
};

export default quemSeraIncluidoReducer;
