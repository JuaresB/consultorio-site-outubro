import * as ActionType from '../action/ActionType';
import initialState from './initialState';

const locationReducer = (state = initialState.locationReducer, action) => {
  switch(action.type) {
    case ActionType.SET_LOCATION_STATE: {
      return {
        ...state,
        state: action.state,
      };
    }
    case ActionType.SET_CITY: {
      return{
        ...state,
        city: action.city
      }
    }
    case ActionType.SET_OCCUPATION_LIST: {
      return{
        ...state,
        occupationList: action.occupationList
      }
    }
    case ActionType.SET_HOSPITAL_LIST: {
      return{
        ...state,
        hospitalList: action.hospitalList
      }
    }
    case ActionType.SET_REGION_LIST: {
      return{
        ...state,
        regionList: action.regionList
      }
    }
    case ActionType.SET_IS_CAPITAL: {
      return{
        ...state,
        isCapital: action.isCapital
      }
    }
    default: { return state; }
  }
};

export default locationReducer;
