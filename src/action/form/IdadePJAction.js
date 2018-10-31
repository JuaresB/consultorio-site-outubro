import * as ActionType from '../ActionType';

export const setIdadePJResponse = idadePJ => ({
  type: ActionType.SET_IDADEPJ,
  idadePJ: idadePJ
});

export const setDeleteCounterPJResponse = () => ({
  type: ActionType.SET_DELETE_COUNTER_PJ,
})

export function setIdadePJAction(idadePJ) {
  return (dispatch) => {
    dispatch(setIdadePJResponse(idadePJ));
  };
}

export function setDeleteCounterPJ() {
  return (dispatch) => {
    dispatch(setDeleteCounterPJResponse())
  }
}
