import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';


const reasonReducer = (state = initialState.reasonReducer, action) => {
  switch(action.type) {
    case ActionType.SET_REASON: {
      return {
        ...state,
        reason: action.reason
      };
    }
    default: { return state; }
  }
};

export default reasonReducer;
