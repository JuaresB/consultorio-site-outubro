import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const regionReducer = (state = initialState.regionReducer, action) => {
  switch(action.type) {
    case ActionType.SET_REGIONS: {
      return {
        ...state,
        regions: action.regions
      };
    }
    default: { return state; }
  }
};

export default regionReducer;
