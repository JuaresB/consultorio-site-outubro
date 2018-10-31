import * as ActionType from './ActionType';

export const setChallengeCodeErrorResponse = challengeErrorValue => ({
  type: ActionType.SET_CHALLENGE_CODE_ERROR,
  challengeErrorValue: challengeErrorValue
});

export const setChallengeLoadingResponse = (challengeLoadingValue) => ({
  type: ActionType.SET_CHALLENGE_LOADING,
  challengeLoadingValue: challengeLoadingValue
})

export function setChallengeCodeErrorAction(challengeErrorValue) {
  return (dispatch) => {
    dispatch(setChallengeCodeErrorResponse(challengeErrorValue));
  };
}

export function setChallengeLoadingAction(challengeLoadingValue) {
  return (dispatch) => {
    dispatch(setChallengeLoadingResponse(challengeLoadingValue))
  }
}
