import * as ActionType from '../ActionType';

export const setParaQuemResponse = paraQuem => ({
  type: ActionType.SET_PARA_QUEM,
  paraQuem: paraQuem
});

export function setParaQuemAction(paraQuem) {
  return (dispatch) => {
    dispatch(setParaQuemResponse(paraQuem));
  };
}
