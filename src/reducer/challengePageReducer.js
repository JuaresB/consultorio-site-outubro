import * as ActionType from '../action/ActionType';
import initialState from './initialState';


const challengeReducer = (state = initialState.challengeReducer, action) => {
  switch(action.type) {
    case ActionType.SET_CHALLENGE_CODE_ERROR: {
      return {
        ...state,
        challengeErrorValue: action.challengeErrorValue
      };
    }
    case ActionType.SET_CHALLENGE_LOADING: {
      return {
        ...state,
        challengeLoadingValue: action.challengeLoadingValue
      };
    }
    default: { return state; }
  }
};

export default challengeReducer;
