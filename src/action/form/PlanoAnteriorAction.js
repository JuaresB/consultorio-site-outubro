import * as ActionType from '../ActionType';

export const setPlanoAnteriorResponse = planoAnterior => ({
  type: ActionType.SET_PLANO_ANTERIOR,
  planoAnterior: planoAnterior
});

export function setPlanoAnteriorAction(planoAnterior) {
  return (dispatch) => {
    dispatch(setPlanoAnteriorResponse(planoAnterior));
  };
}
