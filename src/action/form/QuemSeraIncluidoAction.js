import * as ActionType from '../ActionType';

export const setQuemSeraIncluidoResponse = (socios, dependentes, funcionarios) => ({
  type: ActionType.SET_QUEMSERAINCLUIDO,
  socios: socios,
  dependentes: dependentes,
  funcionarios: funcionarios
});

export function setQuemSeraIncluidoAction(socios, dependentes, funcionarios) {
  return (dispatch) => {
    dispatch(setQuemSeraIncluidoResponse(socios, dependentes, funcionarios));
  };
}
