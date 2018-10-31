import * as ActionType from '../ActionType';

export const setShowRegionalResponse = showRegional => ({
  type: ActionType.SET_SHOW_REGIONAL,
  showRegional: showRegional
});

export function setShowRegionalAction(showRegional) {
  return (dispatch) => {
    dispatch(setShowRegionalResponse(showRegional));
  };
}

export const setShowNacionalResponse = showNacional => ({
  type: ActionType.SET_SHOW_NACIONAL,
  showNacional: showNacional
});

export function setShowNacionalAction(showNacional) {
  return (dispatch) => {
    dispatch(setShowNacionalResponse(showNacional));
  };
}