import * as ActionType from './ActionType';
import HuggyApi from '../api/HuggyApi';

 export const addHuggyWidgetResponse = () => ({
  type: ActionType.ADD_HUGGY_WIDGET_RESPONSE
});
 export function addHuggyWidgetAction() {
  return (dispatch) => {
    //HuggyApi.addWidget()
    dispatch(addHuggyWidgetResponse());
  };
}
