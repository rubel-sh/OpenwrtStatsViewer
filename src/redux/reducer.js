import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const totalUsageReducer = (
  totalUsageState = { isLoading: true, state: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.USAGE_LOADING:
      return {
        ...totalUsageState,
        isLoading: true,
        state: [],
      };
    case actionTypes.LOAD_USAGE:
      return {
        ...totalUsageState,
        isLoading: false,
        state: action.payload,
      };

    default:
      return totalUsageState;
  }
};

const sliderSelectorReducer = (
  sliderSelectorState = {
    isLoading: true,
    state: ["default slider state"],
    routerUsageState: ["default slider state"],
    dateSelected: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SLIDER_SELECTOR_LOADING:
      return {
        ...sliderSelectorState,
        isLoading: true,
        state: [],
        dateSelected: null,
      };
    case actionTypes.SLIDER_SELECTOR_LOADED:
      return {
        ...sliderSelectorState,
        isLoading: false,
        // All playloads are here
        state: action.userUsagePayload,
        dateSelected: action.datePayload,
        routerUsageState: action.routerUsagePayload,
      };

    default:
      return sliderSelectorState;
  }
};
export const Reducer = combineReducers({
  totalUsageState: totalUsageReducer,
  sliderSelectorState: sliderSelectorReducer,
});
