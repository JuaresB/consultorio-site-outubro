import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';


const planoAnteriorReducer = (state = initialState.planoAnteriorReducer, action) => {
  switch(action.type) {
    case ActionType.SET_PLANO_ANTERIOR: {
      return {
        ...state,
        planoAnterior: action.planoAnterior
      };
    }
    default: { return state; }
  }
};

export default planoAnteriorReducer;
