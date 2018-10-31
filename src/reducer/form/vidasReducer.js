import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const vidasReducer = (state = initialState.vidasReducer, action) => {
  switch(action.type) {
    case ActionType.SET_VIDAS: {
      return {
        ...state,
        vidas: action.vidas
      };
    }
    default: { return state; }
  }
};

export default vidasReducer;
