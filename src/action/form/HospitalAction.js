import * as ActionType from '../ActionType';

export const setHospitalsResponse = (hospitals) => ({
  type: ActionType.SET_HOSPITALS,
  hospitals: hospitals
});

export function setHospitals(hospitals) {
  return (dispatch) => {
    dispatch(setHospitalsResponse(hospitals));
  };
}
