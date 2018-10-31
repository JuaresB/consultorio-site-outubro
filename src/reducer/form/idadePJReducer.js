import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';


const idadePJReducer = (state = initialState.idadePJReducer, action) => {
  switch(action.type) {
    case ActionType.SET_IDADEPJ: {
      return {
        ...state,
        idadePJ: _.assign(action.idadePJ)
      };
    }
    case ActionType.SET_DELETE_COUNTER_PJ: {
      return {
        ...state,
        deleteCounterPJ: state.deleteCounterPJ + 100
      }
    }
    default: { return state; }
  }
};

export default idadePJReducer;
