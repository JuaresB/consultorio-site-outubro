import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const telephoneReducer = (state = initialState.telephoneReducer, action) => {
  switch(action.type) {
    case ActionType.SET_TELEPHONE_DDD: {
      return {
        ...state,
        telephoneDDD: action.telephoneDDD
      };
    }
    case ActionType.SET_TELEPHONE_DDI: {
      return {
        ...state,
        telephoneDDI: action.telephoneDDI
      };
    }
    default: { return state; }
  }
};

export default telephoneReducer;
