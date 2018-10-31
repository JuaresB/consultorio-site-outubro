import * as ActionType from '../action/ActionType';
import initialState from './initialState';


const abReducer = (state = initialState.abReducer, action) => {
  switch(action.type) {
    case ActionType.SET_AB_PREFERENCE: {
      return {
        ...state,
        abPreference: action.abPreference
      }
    }
    default: { return state; }
  }
};

export default abReducer;
