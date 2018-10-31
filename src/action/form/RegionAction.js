import * as ActionType from '../ActionType';

export const setRegionsResponse = (regions) => ({
  type: ActionType.SET_REGIONS,
  regions: regions
});

export function setRegions(regions) {
  return (dispatch) => {
    dispatch(setRegionsResponse(regions));
  };
}
