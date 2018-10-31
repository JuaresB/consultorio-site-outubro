import * as ActionType from '../../action/ActionType';
import initialState from '../initialState';
import _ from 'lodash';


const idadePFReducer = (state = initialState.idadePFReducer, action) => {
  switch(action.type) {
    case ActionType.SET_IDADEPF: {
      return {
        ...state,
        idadePF: _.assign(action.idadePF)
      };
    }
    case ActionType.SET_DELETE_COUNTER_PF: {
      return {
        ...state,
        deleteCounterPF: state.deleteCounterPF + 100
      }
    }
    default: { return state; }
  }
};

export default idadePFReducer;
