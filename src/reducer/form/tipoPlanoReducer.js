import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';


const tipoPlanoReducer = (state = initialState.tipoPlanoReducer, action) => {
  switch(action.type) {
    case ActionType.SET_TIPOPLANO: {
      return {
        ...state,
        tipoPlano: _.assign(action.tipoPlano)
      };
    }
    default: { return state; }
  }
};

export default tipoPlanoReducer;
