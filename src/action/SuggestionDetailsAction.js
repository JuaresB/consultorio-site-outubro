import * as ActionType from './ActionType';
import SuggestionApi from '../api/SuggestionApi';
import { ApiCallBeginAction, ApiCallErrorAction } from './ApiAction';

export const setPlanoIdResponse = planoId => ({
  type: ActionType.SET_PLANO_ID,
  planoId: planoId
});

export function setPlanoIdAction(planoId) {
  return (dispatch) => {
    dispatch(setPlanoIdResponse(planoId));
  };
}

export const setPlanDetailsResponse = planDetails => ({
  type: ActionType.SET_PLAN_DETAILS,
  planDetails: planDetails
});

export function setPlanDetailsAction(planDetails) {
  return (dispatch) => {
    dispatch(setPlanDetailsResponse(planDetails));
  };
}

export const getSuggestionDetailsResponse = () => ({
  type: ActionType.GET_SUGGESTION_DETAILS_RESPONSE
});

export function getSuggestionDetails() {
  return function (dispatch, getState) {
    const {suggestionDetailsReducer} = getState();
    const  planoId = suggestionDetailsReducer.planoId
    dispatch(ApiCallBeginAction());
    return new Promise( (resolve, reject) => {
      SuggestionApi.getPlanDetails(planoId)
        .then((response) => {
          dispatch(setPlanDetailsResponse(response));
          resolve()
        }).catch(error => {
          dispatch(ApiCallErrorAction());
          reject()
          throw (error);
        });
    })
  };
}