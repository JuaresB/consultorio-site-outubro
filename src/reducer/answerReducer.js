import * as ActionType from '../action/ActionType';
import initialState from './initialState';


const answerReducer = (state = initialState.answerReducer, action) => {
  switch(action.type) {
    case ActionType.SET_ANSWER_ID: {
      return {
        ...state,
        answerId: action.answerId
      };
    }
    case ActionType.SET_NEED_TO_SEND_ANSWER: {
      return {
        ...state,
        needToSendAnswer: action.needToSendAnswer
      };
    }
    default: { return state; }
  }
};

export default answerReducer;
