import * as ActionType from '../ActionType';

export const setVidasResponse = vidas => ({
  type: ActionType.SET_VIDAS,
  vidas: vidas
});

export function setVidasAction(vidas) {
  return (dispatch) => {
    dispatch(setVidasResponse(vidas));
  };
}
