import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';


const tipoCoberturaReducer = (state = initialState.tipoCoberturaReducer, action) => {
  switch(action.type) {
    case ActionType.SET_TIPOCOBERTURA: {
      return {
        ...state,
        tipoCobertura: _.assign(action.tipoCobertura)
      };
    }
    default: { return state; }
  }
};

export default tipoCoberturaReducer;
