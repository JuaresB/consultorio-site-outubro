import * as ActionType from '../ActionType';

export const setCnpjResponse = cnpj => ({
  type: ActionType.SET_CNPJ,
  cnpj: cnpj
});

export function setCnpjAction(cnpj) {
  return (dispatch) => {
    dispatch(setCnpjResponse(cnpj));
  };
}
