import * as ActionType from './ActionType';
import LocationApi from '../api/LocationApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const setCityResponse = (city) => ({
  type: ActionType.SET_CITY,
  city: city
});

export function setCityAction(city) {
  return (dispatch) => {
    dispatch(setCityResponse(city));
  };
}

export const setStateResponse = (state) => ({
  type: ActionType.SET_LOCATION_STATE,
  state: state,
});

export function setStateAction(state) {
  return (dispatch) => {
    dispatch(setStateResponse(state));
  };
}

export const setOccupationListResponse = (occupationList) => ({
  type: ActionType.SET_OCCUPATION_LIST,
  occupationList: occupationList
});

export function setOccupationListAction(occupationList) {
  return (dispatch) => {
    dispatch(setOccupationListResponse(occupationList));
  };
}

export const setHospitalListResponse = (hospitalList) => ({
  type: ActionType.SET_HOSPITAL_LIST,
  hospitalList: hospitalList
});

export function setHospitalListAction(hospitalList) {
  return (dispatch) => {
    dispatch(setHospitalListResponse(hospitalList));
  };
}

export const setRegionListResponse = (regionList) => ({
  type: ActionType.SET_REGION_LIST,
  regionList: regionList
});

export function setRegionListAction(regionList) {
  return (dispatch) => {
    dispatch(setRegionListResponse(regionList));
  };
}

export const setIsCapitalResponse = (isCapital) => ({
  type: ActionType.SET_IS_CAPITAL,
  isCapital: isCapital
});

export function setIsCapitalAction(isCapital) {
  return (dispatch) => {
    dispatch(setIsCapitalResponse(isCapital));
  };
}

export const geoLocationBrowserResponse = () => ({
    type: ActionType.GEO_LOCATION_BROWSER_RESPONSE
});

export function geoLocationBrowserAction() {
  return function (dispatch, getState) {
    dispatch(ApiCallBeginAction());
    LocationApi.geoLocationBrowser()
      .then(({state, city}) => {
        dispatch(geoLocationBrowserResponse());
        dispatch(setCityResponse(city));
        dispatch(setStateResponse(state));
      })
      .catch(error => {
        dispatch(ApiCallErrorAction());
        //throw (error);
      });
  };
}

export const geoLocationIpResponse = () => ({
  type: ActionType.GEO_LOCATION_IP_RESPONSE
});

export function geoLocationIpAction() {
  return function (dispatch, getState) {
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      LocationApi.geoLocationIp()
        .then(({state, city}) => {
          dispatch(geoLocationIpResponse());
          dispatch(setCityResponse(city));
          dispatch(setStateResponse(state));
          resolve()
        })
        .catch(error => {
          dispatch(ApiCallErrorAction());
          //throw (error);
          reject()
        });
    })
  };
}

export const regionHospitalOccupationByStateResponse = () => ({
  type: ActionType.REGION_HOSPITAL_OCCUPATION_BY_STATE_RESPONSE
});

export function regionHospitalOccupationByState() {
  return function (dispatch, getState) {
    const {locationReducer} = getState();
    const state = locationReducer.state
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      LocationApi.regionHospitalOccupationByState(state)
        .then(({occupation, hospital, region}) => {
          dispatch(setOccupationListResponse(occupation));
          dispatch(setHospitalListResponse(hospital));
          dispatch(setRegionListResponse(region));
          dispatch(regionHospitalOccupationByStateResponse());
          resolve()
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          reject()
          throw (error);
        });
    })
  };
}
