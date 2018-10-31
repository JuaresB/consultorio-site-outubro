import * as ActionType from '../ActionType';

export const setEmailResponse = email => ({
  type: ActionType.SET_EMAIL,
  email: email
});

export function setEmailAction(email) {
  return (dispatch) => {
    dispatch(setEmailResponse(email));
  };
}