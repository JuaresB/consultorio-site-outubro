import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const hospitalReducer = (state = initialState.hospitalReducer, action) => {
  switch(action.type) {
    case ActionType.SET_HOSPITALS: {
      return {
        ...state,
        hospitals: action.hospitals
      };
    }
    default: { return state; }
  }
};

export default hospitalReducer;
