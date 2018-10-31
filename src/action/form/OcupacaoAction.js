import * as ActionType from '../ActionType';

export const setOcupacaoResponse = ocupacao => ({
  type: ActionType.SET_OCUPACAO,
  ocupacao: ocupacao
});

export function setOcupacaoAction(ocupacao) {
  return (dispatch) => {
    dispatch(setOcupacaoResponse(ocupacao));
  };
}

export const setOccupationNotFoundResponse = occupationNotFound => ({
  type: ActionType.SET_OCCUPATION_NOT_FOUND,
  occupationNotFound: occupationNotFound
});

export function setOccupationNotFoundAction(occupationNotFound){
  return (dispatch) => {
    dispatch(setOccupationNotFoundResponse(occupationNotFound));
  };
}