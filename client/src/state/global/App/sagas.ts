import {call, put, select, takeEvery, delay} from "redux-saga/effects";
import {
  AppActionTypes,
  AppState,
} from "./types";
import {Store} from "../../store";
import {AppInitAction} from "./actions";
import {MapPolygon} from "../../../../../shared/types/data/Map/MapTypes";
import {MapApi} from "../../../api/MapApi/MapApi";

export const appSagas = {
  initSaga: takeEvery(AppActionTypes.INIT, initSaga),
};

function * initSaga(action: AppInitAction): any {
  const mapPolygons: Array<MapPolygon> = yield call(MapApi.getMapPolygons);

  yield put({
    type: AppActionTypes.SET_MAP_POLYGONS,
    mapPolygons: mapPolygons,
  });

  yield put({
    type: AppActionTypes.SET_IS_INIT_COMPLETE,
    isInitComplete: true,
  });
}

function getAppStateSelector(store: Store): AppState {
  return store.app;
}

export default appSagas;
