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
        const photoSrc: string = getPhotoSrc(lastName, firstName, party);
        mpDataMap[constituency] = {
          title: title,
          firstName: firstName,
          lastName: lastName,
          constituency: constituency,
          province: province,
          party: party,
          photoSrc: photoSrc,
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
      const geometry: Array<Array<[number, number]>> = getGeometryFromGeometry(feature.geometry.coordinates, feature.geometry.type);
      if (mpData) {
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
        console.log(`Unable to find MP for constituency: ${constituency}.`);
        const mapPolygon: MapPolygon = {
          constituency: constituency,
          constituencyFrench: constituencyFrench,
          constituencyId: constituencyId,
          provinceId: provinceId,
          geometry: geometry,
          mpData: {
            title: "",
            firstName: "",
            lastName: "",
            constituency: constituency,
            province: getProvinceFromProvinceId(provinceId),
            party: "Vacant",
            photoSrc: "",
          },
        };
        return mapPolygon;
      }
    }).filter((mapPolygon: any) => !!mapPolygon);
    data = mapPolygons;
    return true;
  };

  const getProvinceFromProvinceId = (provinceId: string): string => {
    switch (provinceId) {
      case "59": {
        return "British Columbia";
      }
      case "48": {
        return "Alberta";
      }
      case "47": {
        return "Saskatchewan";
      }
      case "46": {
        return "Manitoba";
      }
      case "35": {
        return "Ontario";
      }
      case "24": {
        return "Quebec";
      }
      case "13": {
        return "New Brunswick";
      }
      case "11": {
        return "Prince Edward Island";
      }
      case "12": {
        return "Nova Scotia";
      }
      case "10": {
        return "Newfoundland and Labrador";
      }
      case "60": {
        return "Yukon";
      }
      case "61": {
        return "Northwest Territories";
      }
      case "62": {
        return "Nunavut";
      }
      default: {
        return "";
      }
    }
  };

  const getPhotoSrc = (lastName: string, firstName: string, party: string): string => {
    const parliamentSession: string = "43";
    const partyAbbreviation: string = getPartyAbbreviation(party);
    const processedFirstName: string = encodeURIComponent(firstName.replace(/-/g, "").replace("'", "").replace(/ /g, ""));
    const processedLastName: string = encodeURIComponent(lastName.replace(/-/g, "").replace("'", "").replace(/ /g, ""));
    const photoSrc: string = `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/${parliamentSession}/${processedLastName}${processedFirstName}_${partyAbbreviation}.jpg`;
    const nameString: string = `${firstName}${lastName}`;
    switch (nameString) {
      case "LouisPlamondon": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/PlamondonLouis_PQ.jpg`;
      }
      case "SorayaMartinez Ferrada": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/MartinezFerradaSoraya_Lib.jpg`;
      }
      case "StéphaneBergeron": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/BergeronStephane_BQ.jpg`;
      }
      case "François-PhilippeChampagne": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/ChampagneFrancoisPhilippe_Lib.jpg`;
      }
      case "JoëlLightbound": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/LightboundJoel_Lib.jpg`;
      }
      case "RameshSangha": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/SanghaRamesh_Lib.jpg`;
      }
      case "DerekSloan": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/SloanDerek_CPC.jpg`;
      }
      case "YasminRatansi": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/RatansiYasmin_Lib.jpg`;
      }
      case "MarwanTabbara": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/TabbaraMarwan_Lib.jpg`;
      }
      case "DavidMcGuinty": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/McGuintyDavidJ_Lib.jpg`;
      }
      case "MichelleRempel Garner": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/RempelMichelle_CPC.jpg`;
      }
      case "Judy A.Sgro": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/SgroJudyA_Lib.jpg`;
      }
      case "AhmedHussen": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/HussenAhmedD_Lib.jpg`;
      }
      case "MelArnold": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/ArnoldMel_CPC%20web.jpg`;
      }
      case "Kerry-LynneFindlay": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/FindlayKerryLynneD_CPC.jpg`;
      }
      case "DaneLloyd": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/LloydDane._CPC.jpg`;
      }
      case "Harjit S.Sajjan": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/SajjanHarjitS_Lib.jpg`;
      }
      case "MichaelMcLeod": {
        return `https://www.ourcommons.ca/Content/Parliamentarians/Images/OfficialMPPhotos/43/McLeodMichaelV_Lib.jpg`;
      }
      default: {
        return photoSrc;
      }
    }
  };

  const getPartyAbbreviation = (party: string): string => {
    switch (party) {
      case "Liberal": {
        return "LIB";
      }
      case "Conservative": {
        return "CPC";
      }
      case "NDP": {
        return "NDP";
      }
      case "Bloc Québécois": {
        return "BQ";
      }
      case "Green Party": {
        return "GP";
      }
      case "Independent": {
        return "Ind";
      }
      default: {
        console.log(`Unable to find party: ${party}.`);
        return "";
      }
    }
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
