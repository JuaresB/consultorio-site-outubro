import * as ActionType from '../ActionType';

export const setHospitalResponse = (hospital) => ({
  type: ActionType.SET_HOSPITAL,
  hospital: hospital
});

export function setHospitalAction(hospital) {
  return (dispatch) => {
    dispatch(setHospitalResponse(hospital));
  };
}

export const setHospitalTypeResponse = (hospitalType) => ({
  type: ActionType.SET_HOSPITAL_TYPE,
  hospitalType: hospitalType
});

export function setHospitalTypeAction(hospitalType) {
  return (dispatch) => {
    dispatch(setHospitalTypeResponse(hospitalType));
  };
}