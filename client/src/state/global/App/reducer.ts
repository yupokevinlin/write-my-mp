import {AppActionTypes, AppState} from "./types";
import {AppAction} from "./actions";

export const initialState: AppState = {
  isInitComplete: false,
  mapPolygons: [],
};

export const reducer = (state: AppState = initialState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.SET_IS_INIT_COMPLETE: {
      return {
        ...state,
        isInitComplete: action.isInitComplete,
      }
    }
    case AppActionTypes.SET_MAP_POLYGONS: {
      return {
        ...state,
        mapPolygons: action.mapPolygons,
      }
    }
    default:
      return state;
  }
};
