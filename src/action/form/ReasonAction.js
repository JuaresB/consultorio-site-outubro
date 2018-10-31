import * as ActionType from '../ActionType';

export const setReasonResponse = reason => ({
  type: ActionType.SET_REASON,
  reason: reason
});

export function setReasonAction(reason) {
  return (dispatch) => {
    dispatch(setReasonResponse(reason));
  };
}
