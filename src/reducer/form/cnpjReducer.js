import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';


const cnpjReducer = (state = initialState.cnpjReducer, action) => {
  switch(action.type) {
    case ActionType.SET_CNPJ: {
      return {
        ...state,
        cnpj: action.cnpj
      };
    }
    default: { return state; }
  }
};

export default cnpjReducer;
