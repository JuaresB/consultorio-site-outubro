import * as ActionType from '../ActionType';

export const setShowEnfermariaResponse = showEnfermaria => ({
  type: ActionType.SET_SHOW_ENFERMARIA,
  showEnfermaria: showEnfermaria
});

export function setShowEnfermariaAction(showEnfermaria) {
  return (dispatch) => {
    dispatch(setShowEnfermariaResponse(showEnfermaria));
  };
}

export const setShowApartamentoResponse = showApartamento => ({
  type: ActionType.SET_SHOW_APARTAMENTO,
  showApartamento: showApartamento
});

export function setShowApartamentoAction(showApartamento) {
  return (dispatch) => {
    dispatch(setShowApartamentoResponse(showApartamento));
  };
}