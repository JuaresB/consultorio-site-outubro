import * as ActionType from '../ActionType';

export const setTelephoneDDDResponse = telephoneDDD => ({
  type: ActionType.SET_TELEPHONE_DDD,
  telephoneDDD: telephoneDDD
});

export function setTelephoneDDDAction(telephoneDDD) {
  return (dispatch) => {
    dispatch(setTelephoneDDDResponse(telephoneDDD));
  };
}

export const setTelephoneDDIResponse = telephoneDDI => ({
  type: ActionType.SET_TELEPHONE_DDI,
  telephoneDDI: telephoneDDI
});

export function setTelephoneDDIAction(telephoneDDI) {
  return (dispatch) => {
    dispatch(setTelephoneDDIResponse(telephoneDDI));
  };
}