import {MapPolygon, MPData, MPDataMap} from "../../../../shared/types/data/Map/MapTypes";

const electoralDistrictsData: any = require("../../../../data/map/2016-canada-electoral-districts.json");
const csv = require("csv-string");
const axios = require("axios").default;

export namespace MapUtils {
  export let data: Array<MapPolygon> = [];

  export const fetchData = async (): Promise<boolean> => {

    const mpDataArray: Array<Array<string>> = await getCsvArray("https://www.ourcommons.ca/members/en/search/csv");
    const mpDataMap: MPDataMap = {};

    mpDataArray.forEach((mpData, index) => {
      if (index > 0) {
        const title: string = mpData[0];
        const firstName: string = mpData[1];
        const lastName: string = mpData[2];
        const constituency: string = mpData[3];
        const province: string = mpData[4];
        const party: string = mpData[5];
        mpDataMap[constituency] = {
          title: title,
          firstName: firstName,
          lastName: lastName,
          constituency: constituency,
          province: province,
          party: party,
        };
      }
    });

    const mapPolygons: Array<MapPolygon> = electoralDistrictsData.features.map((feature: any) => {
      const rawConstituencyName: string = feature.properties.FEDENAME;
      const rawConstituencyNameFrench: string = feature.properties.FEDFNAME;
      const constituency: string = rawConstituencyName.replace(/--/g, "—").replace(/’/g, "'");
      const constituencyFrench: string = rawConstituencyNameFrench.replace(/--/g, "—").replace(/’/g, "'");
      const constituencyId: string = feature.properties.FEDUID;
      const provinceId: string = feature.properties.PRUID;
      const mpData: MPData | undefined = mpDataMap[constituency];

      if (mpData) {
        const geometry: Array<Array<[number, number]>> = getGeometryFromGeometry(feature.geometry.coordinates, feature.geometry.type);
        const mapPolygon: MapPolygon = {
          constituency: constituency,
          constituencyFrench: constituencyFrench,
          constituencyId: constituencyId,
          provinceId: provinceId,
          geometry: geometry,
          mpData: mpData,
        };
        return mapPolygon;
      } else {
        console.log(`Unable to find MP for constituency: ${constituency}`);
        return null;
      }
    }).filter((mapPolygon: any) => !!mapPolygon);
    data = mapPolygons;
    return true;
  };

  const getCsvArray = async (url: string): Promise<Array<Array<string>>> => {
    const result: any = await axios.get(url);
    const resultString: string = result.data;
    const resultArray: Array<Array<string>> = csv.parse(resultString);
    return resultArray;
  };

  export const getGeometryFromGeometry = (geometry: any, type: string): Array<Array<[number, number]>> => {
    return type === "MultiPolygon" ?
      geometry.map((e: Array<Array<Array<[number, number]>>>) => (e[0].map((e: Array<[number, number]>) => e.map((e: [number, number]) => e)))) :
      geometry;
  };
}
