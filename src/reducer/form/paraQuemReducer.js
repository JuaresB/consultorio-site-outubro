import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const paraQuemReducer = (state = initialState.paraQuemReducer, action) => {
  switch(action.type) {
    case ActionType.SET_PARA_QUEM: {
      return {
        ...state,
        paraQuem: action.paraQuem
      };
    }
    default: { return state; }
  }
};

export default paraQuemReducer;
