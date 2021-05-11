import {MapPolygon} from "../../../../shared/types/data/Map/MapTypes";
import {Api} from "../Api";
import axios from "axios";

export namespace MapApi {
  export const getMapPolygons = (): Promise<Array<MapPolygon>> => {
    const url: string = `${Api.serverLocation}/api/map/polygons`;
    return axios({
      method: "GET",
      url: url,
    }).then((rsp) => {
      return rsp.data;
    });
  };
}
