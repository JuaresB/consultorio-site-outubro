import * as ActionType from './ActionType';
import AuthApi from '../api/AuthApi';
import LogApi from '../api/LogApi';
import {setEmailResponse} from './form/EmailAction';
import {setTelephoneDDDResponse, setTelephoneDDIResponse} from './form/TelephoneAction';
import {setNameResponse} from './form/NameAction';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const setAccessTokenResponse = accessToken => ({
  type: ActionType.SET_ACCESS_TOKEN,
  accessToken: accessToken
});

export function setAccessTokenAction(accessToken) {
  return (dispatch) => {
    dispatch(setAccessTokenResponse(accessToken));
  };
}

export const setCodeResponse = code => ({
  type: ActionType.SET_CODE,
  code: code
});

export function setCodeAction(code) {
  return (dispatch) => {
    dispatch(setCodeResponse(code));
  };
}

export const setStateResponse = state => ({
  type: ActionType.SET_LOGIN_STATE,
  state: state
});

export function setStateAction(state) {
  return (dispatch) => {
    dispatch(setStateResponse(state));
  };
}

export const setChallengeAnswerResponse = challengeAnswer => ({
  type: ActionType.SET_CHALLENGE_ANSWER,
  challengeAnswer: challengeAnswer
});

export function setChallengeAnswerAction(challengeAnswer) {
  return (dispatch) => {
    dispatch(setChallengeAnswerResponse(challengeAnswer));
  };
}

export const setCognitoPreAuthUserResponse = cognitoPreAuthUser => ({
  type: ActionType.SET_COGNITO_PRE_AUTH_USER,
  cognitoPreAuthUser: cognitoPreAuthUser
});

export function setCognitoPreAuthUserAction(cognitoPreAuthUser) {
  return (dispatch) => {
    dispatch(setCognitoPreAuthUserResponse(cognitoPreAuthUser));
  };
}

export const setChallengeTypeResponse = challengeType => ({
  type: ActionType.SET_CHALLENGE_TYPE,
  challengeType: challengeType
});

export function setChallengeTypeAction(challengeType) {
  return (dispatch) => {
    dispatch(setChallengeTypeResponse(challengeType));
  };
}

export const setUserIsLoggedResponse = userIsLogged => ({
  type: ActionType.SET_USER_IS_LOGGED,
  userIsLogged: userIsLogged
});

export const setUserIdCognitoResponse = idCognito => ({
  type: ActionType.SET_USER_ID_COGNITO,
  idCognito: idCognito
});

export const setSendCodeErrorResponse = sendCodeError => ({
  type: ActionType.SET_SEND_CODE_ERROR,
  sendCodeError: sendCodeError
});

export const checkForSignedUserResponse = () => ({
  type: ActionType.CHECK_FOR_SIGNED_USER_RESPONSE
});

export function checkForSignedUserAction() {
  return function (dispatch, getState) {
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      AuthApi.checkForSignedUser()
        .then((info) => {
          dispatch(checkForSignedUserResponse());
          if(info){
            dispatch(setUserIsLoggedResponse(true));
            dispatch(setEmailResponse(info.attributes.email));
            dispatch(setNameResponse(info.attributes.name));
            dispatch(setTelephoneDDIResponse(info.attributes.phone_number));
            dispatch(setTelephoneDDDResponse(info.attributes.phone_number.replace('+5521', '')));
          }
          resolve();
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          reject(error)
        });
    })
  };
}

export const signInResponse = () => ({
  type: ActionType.SIGN_IN_RESPONSE
});

export function signInAction() {
  return async (dispatch, getState) => {
    dispatch(ApiCallBeginAction())
    const {telephoneReducer} = getState()
    const telephoneDDI = telephoneReducer.telephoneDDI
    await AuthApi.signInCognito(telephoneDDI)
      .then((cognitoPreAuthUser) => {
        dispatch(setCognitoPreAuthUserResponse(cognitoPreAuthUser))
        dispatch(signInResponse())
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const createCodeResponse = () => ({
  type: ActionType.CREATE_CODE_RESPONSE
});

export function createCodeAction() {
  return async (dispatch, getState) => {
    const {loginReducer} = getState();
    const idCognito = loginReducer.idCognito
    dispatch(ApiCallBeginAction());
    await AuthApi.createCode(idCognito)
      .then(() => {
        dispatch(createCodeResponse())
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const sendChallengeAnswerResponse = () => ({
  type: ActionType.SEND_CHALLENGE_RESPONSE
});

export function sendChallengeAnswerAction() {
  return async (dispatch, getState) => {
    dispatch(ApiCallBeginAction())
    const {loginReducer} = getState()
    var challengeResp = {}
    challengeResp.challengeType = loginReducer.challengeType
    if(loginReducer.challengeType==="SMS"){
      challengeResp.challengeAnswer = loginReducer.challengeAnswer
    } else if(loginReducer.challengeType==="AccountKit"){
      challengeResp.accessToken = loginReducer.accessToken
    }
    const cognitoPreAuthUser = loginReducer.cognitoPreAuthUser
    return AuthApi.sendChallengeAnswer(cognitoPreAuthUser, JSON.stringify(challengeResp))
      .then((resp) => {
        dispatch(sendChallengeAnswerResponse());
        if(resp.signInUserSession){
          dispatch(setUserIsLoggedResponse(true));
        }
      }).catch( () => {
        dispatch(ApiCallErrorAction());
      });
  };
}

export const signInAccountKitResponse = () => ({
  type: ActionType.SIGN_IN_ACCOUNT_KIT_RESPONSE
});

export function signInAccountKitAction() {
  return function (dispatch, getState) {
    const {telephoneReducer} = getState();
    const telephoneDDI = telephoneReducer.telephoneDDD
    dispatch(ApiCallBeginAction());
    return AuthApi.signInAccountKit(telephoneDDI)
      .then(({code, state}) => {
        dispatch(signInAccountKitResponse());
        dispatch(setCodeResponse(code));
        dispatch(setStateResponse(state));
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const sendOwnSmsResponse = () => ({
  type: ActionType.SEND_OWN_SMS_RESPONSE
});

export function sendOwnSmsAction() {
  return function (dispatch, getState) {
    const {loginReducer} = getState();
    const idCognito = loginReducer.idCognito
    dispatch(ApiCallBeginAction());
    return AuthApi.sendOwnSms(idCognito)
      .then(resp => {
        if(resp.err){
          dispatch(setSendCodeErrorResponse(true))
        }
        dispatch(sendOwnSmsResponse());
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const sendSNSSmsResponse = () => ({
  type: ActionType.SEND_SNS_SMS_RESPONSE
});

export function sendSNSSmsAction() {
  return function (dispatch, getState) {
    const {loginReducer} = getState();
    const idCognito = loginReducer.idCognito
    dispatch(ApiCallBeginAction());
    return AuthApi.sendSNSSms(idCognito)
      .then(resp => {
        dispatch(sendSNSSmsResponse());
        dispatch(setSendCodeErrorResponse(false))
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const getAccountKitTokenResponse = () => ({
  type: ActionType.GET_ACCOUNT_KIT_RESPONSE
});

export function getAccountKitTokenAction() {
  return function (dispatch, getState) {
    const {loginReducer} = getState();
    const code = loginReducer.code
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      AuthApi.getAccountKitToken(code)
        .then(({accessToken, telephoneDDI, telephoneDDD}) => {
          dispatch(getAccountKitTokenResponse());
          dispatch(setAccessTokenResponse(accessToken));
          dispatch(setTelephoneDDIResponse(telephoneDDI));
          dispatch(setTelephoneDDDResponse(telephoneDDD));
          resolve()
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          LogApi.sendLog(error)
          reject(error)
        });
    })
  };
}

export const setReturnToUrl = (returnToUrl) => ({
  type: ActionType.SET_RETURN_TO_URL,
  returnToUrl: returnToUrl
});

export function setReturnToUrlAction() {
  return (dispatch, getState) => {
    const {router} = getState()
    dispatch(setReturnToUrl(router.location.pathname))
  };
}

export const signUpCognitoResponse = () => ({
  type: ActionType.SIGN_UP_COGNITO_RESPONSE
});

export function signUpCognitoAction() {
  return function (dispatch, getState) {
    const {telephoneReducer} = getState();
    dispatch(ApiCallBeginAction());
    return AuthApi.signUpCognito(
      telephoneReducer.telephoneDDI,
    )
      .then((response) => {
        dispatch(setUserIdCognitoResponse(response.userSub));
        dispatch(signUpCognitoResponse());
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const signUpAddInfoResponse = () => ({
  type: ActionType.SIGN_UP_ADD_INFO_RESPONSE
});

export function signUpAddInfoAction() {
  return function (dispatch, getState) {
    const {emailReducer, nameReducer} = getState();
    dispatch(ApiCallBeginAction());
    return AuthApi.signUpAddInfo({
      email: emailReducer.email,
      name: nameReducer.name
    })
      .then(() => {
        dispatch(signUpAddInfoResponse());
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        throw (error);
      });
  };
}

export const checkPhoneResponse = () => ({
  type: ActionType.CHECK_PHONE_RESPONSE
});

export function checkPhoneAction() {
  return async (dispatch, getState) => {
    const {telephoneReducer} = getState();
    const telephone = telephoneReducer.telephoneDDI
    dispatch(ApiCallBeginAction());
    await AuthApi.checkPhone(telephone)
      .then((response) => {
        dispatch(checkPhoneResponse());
        if(response.user){
          dispatch(setEmailResponse(response.user.email));
          dispatch(setNameResponse(response.user.nome));
          dispatch(setUserIdCognitoResponse(response.user.idCognito));
        } else {
          dispatch(setEmailResponse(''));
          dispatch(setNameResponse(''));
          dispatch(setUserIdCognitoResponse(''));
        }
      }).catch(error => {
        dispatch(ApiCallErrorAction());
        LogApi.sendLog(error)
      });
  };
}
