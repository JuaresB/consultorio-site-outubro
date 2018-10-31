import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const nameReducer = (state = initialState.nameReducer, action) => {
  switch(action.type) {
    case ActionType.SET_NAME: {
      return {
        ...state,
        name: action.name
      };
    }
    default: { return state; }
  }
};

export default nameReducer;
