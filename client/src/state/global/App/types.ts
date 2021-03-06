import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";

export interface AppState {
  isInitComplete: boolean;
  mapPolygons: Array<MapPolygon>;
}

export enum AppActionTypes {
  INIT = "app.INIT",
  SET_IS_INIT_COMPLETE = "app.SET_IS_INIT_COMPLETE",
  SET_MAP_POLYGONS = "app.SET_MAP_POLYGONS",
}
