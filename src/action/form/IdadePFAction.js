import * as ActionType from '../ActionType';

export const setIdadePFResponse = idadePF => ({
  type: ActionType.SET_IDADEPF,
  idadePF: idadePF
});

export const setDeleteCounterPFResponse = () => ({
  type: ActionType.SET_DELETE_COUNTER_PF,
})

export function setIdadePFAction(idadePF) {
  return (dispatch) => {
    dispatch(setIdadePFResponse(idadePF));
  };
}

export function setDeleteCounterPF() {
  return (dispatch) => {
    dispatch(setDeleteCounterPFResponse())
  }
}
