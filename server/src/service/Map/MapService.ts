import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import {MapUtils} from "./MapUtils";

export namespace MapService {
  export const getMapPolygons = (): Array<MapPolygon> => {
    return MapUtils.data;
  }
}
