import {AppActionTypes} from "./types";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
export type AppAction = AppInitAction
| AppSetIsInitCompleteAction
| AppSetMapPolygonsAction
| AppSetIsEnglishAction;

export interface AppInitAction {
  type: typeof AppActionTypes.INIT;
}
export const init = (): AppInitAction => {
  return {
    type: AppActionTypes.INIT,
  };
};

export interface AppSetIsInitCompleteAction {
  type: typeof AppActionTypes.SET_IS_INIT_COMPLETE;
  isInitComplete: boolean;
}
export const setIsInitComplete = (isInitComplete: boolean): AppSetIsInitCompleteAction => {
  return {
    type: AppActionTypes.SET_IS_INIT_COMPLETE,
    isInitComplete: isInitComplete,
  };
};

export interface AppSetMapPolygonsAction {
  type: typeof AppActionTypes.SET_MAP_POLYGONS;
  mapPolygons: Array<MapPolygon>;
}
export const setMapPolygons = (mapPolygons: Array<MapPolygon>): AppSetMapPolygonsAction => {
  return {
    type: AppActionTypes.SET_MAP_POLYGONS,
    mapPolygons: mapPolygons,
  };
};

export interface AppSetIsEnglishAction {
  type: typeof AppActionTypes.SET_IS_ENGLISH;
  isEnglish: boolean;
}
export const setIsEnglish = (isEnglish: boolean): AppSetIsEnglishAction => {
  return {
    type: AppActionTypes.SET_IS_ENGLISH,
    isEnglish: isEnglish,
  };
};
