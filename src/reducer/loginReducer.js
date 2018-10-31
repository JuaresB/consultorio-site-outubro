import * as ActionType from '../action/ActionType';
import initialState from './initialState';


const loginReducer = (state = initialState.loginReducer, action) => {
  switch(action.type) {
    case ActionType.SET_CODE: {
      return {
        ...state,
        code: action.code
      };
    }
    case ActionType.SET_LOGIN_STATE: {
      return {
        ...state,
        state: action.state
      };
    }
    case ActionType.SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken
      };
    }
    case ActionType.SET_CHALLENGE_ANSWER: {
      return {
        ...state,
        challengeAnswer: action.challengeAnswer
      };
    }
    case ActionType.SET_COGNITO_PRE_AUTH_USER: {
      return {
        ...state,
        cognitoPreAuthUser: action.cognitoPreAuthUser
      };
    }
    case ActionType.SET_CHALLENGE_TYPE: {
      return {
        ...state,
        challengeType: action.challengeType
      };
    }
    case ActionType.SET_USER_IS_LOGGED: {
      return {
        ...state,
        userIsLogged: action.userIsLogged
      };
    }
    case ActionType.SET_USER_ID_COGNITO: {
      return {
        ...state,
        idCognito: action.idCognito
      };
    }
    case ActionType.SET_SEND_CODE_ERROR: {
      return {
        ...state,
        sendCodeError: action.sendCodeError
      };
    }
    case ActionType.SET_RETURN_TO_URL: {
      return {
        ...state,
        returnToUrl: action.returnToUrl
      };
    }
    default: { return state; }
  }
};

export default loginReducer;
