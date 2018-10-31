import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';

const prefHospitalReducer = (state = initialState.prefHospitalReducer, action) => {
  switch(action.type) {
    case ActionType.SET_HOSPITAL: {
      return {
        ...state,
        hospital: action.hospital
      };
    }
    case ActionType.SET_HOSPITAL_TYPE: {
      return {
        ...state,
        hospitalType: action.hospitalType
      };
    }
    default: { return state; }
  }
};

export default prefHospitalReducer;
