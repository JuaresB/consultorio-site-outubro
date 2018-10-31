import * as ActionType from '../ActionType';

export const setNameResponse = name => ({
  type: ActionType.SET_NAME,
  name: name
});

export function setNameAction(name) {
  return (dispatch) => {
    dispatch(setNameResponse(name));
  };
}