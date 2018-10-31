import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const emailReducer = (state = initialState.emailReducer, action) => {
  switch(action.type) {
    case ActionType.SET_EMAIL: {
      return {
        ...state,
        email: action.email
      };
    }
    default: { return state; }
  }
};

export default emailReducer;
