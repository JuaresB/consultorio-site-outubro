import * as ActionType from '../action/ActionType';
import initialState from './initialState';
import _ from 'lodash';


const suggestionDetailsReducer = (state = initialState.suggestionDetailsReducer, action) => {
  switch(action.type) {
    case ActionType.SET_PLANO_ID: {
      return {
        ...state,
        planoId: action.planoId
      };
    }
    case ActionType.SET_PLAN_DETAILS: {
      return {
        ...state,
        planDetails: _.assign(action.planDetails)
      };
    }
    default: { return state; }
  }
};

export default suggestionDetailsReducer;