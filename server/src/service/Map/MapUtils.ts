import {MapPolygon, MPContact, MPContactMap, MPData, MPDataMap} from "../../../../shared/types/data/Map/MapTypes";
import {CheerioAPI} from "cheerio/lib/cheerio";

const electoralDistrictsData: any = require("../../../../data/map/2016-canada-electoral-districts.json");
const csv = require("csv-string");
const axios = require("axios").default;
const cheerio = require("cheerio");
import * as fs from "fs";

export namespace MapUtils {
  export const data: Array<MapPolygon> = require("../../../../data/map/data.json");

  export const fetchData = async (): Promise<boolean> => {
    const currentMembersLinks: Array<string> = [];
    const currentMembersTileHtml = await axios("https://www.ourcommons.ca/members/en/search?caucusId=all&province=all&gender=all&view=tile").then((rsp: any) => rsp.data).catch(console.error);
    const loadedCurrentMembersTileHtml = cheerio.load(currentMembersTileHtml);
    const rows = loadedCurrentMembersTileHtml("#mip-tile-view > div > div");
    rows.children("div").each((index: number, element: any) => {
      if (index > 0) {
        const linkElement = loadedCurrentMembersTileHtml(element).find("div > a");
        const href = loadedCurrentMembersTileHtml(linkElement).attr("href");
        currentMembersLinks.push(href);
      }
    });

    const mpContacts: MPContactMap = {};

    for (let i = 0; i < currentMembersLinks.length; i++) {
      const currentMemberLink: string = currentMembersLinks[i];
      const url: string = `https://www.ourcommons.ca${currentMemberLink}#contact`;
      const html = await axios(url).then((rsp: any) => rsp.data).catch(console.error);
      const $: CheerioAPI = cheerio.load(html);

      const constituency: string | null = getText($, "div > div > div.col.ce-mip-overview > dl > dd:nth-child(4) > a");
      const email: string | null = getText($, "#contact > div > p:nth-child(2)");
      const website: string | null = getText($, "#contact > div > p:nth-child(4) > a");
      const hillTelephoneFax: string | null = getText($, "#contact > div > div > div.col-md-3 > p:nth-child(3)");
      let hillTelephone: string | null = null;
      let hillFax: string | null = null;
      if (hillTelephoneFax) {
        const hillTelephoneFaxArray: Array<string> = hillTelephoneFax.split("\n");
        hillTelephone = hillTelephoneFaxArray[0] ? hillTelephoneFaxArray[0].replace("Telephone:", "").trim() : null;
        hillFax = hillTelephoneFaxArray[1] ? hillTelephoneFaxArray[1].replace("Fax:", "").trim() : null;
      }

      let constituencyName: string | null = null;
      const constituencyTelephoneFax: string | null = getText($, "#contact > div > div > div.col-md-9 > div > div > p:nth-child(2)");
      let constituencyTelephone: string | null = null;
      let constituencyFax: string | null = null;
      if (constituencyTelephoneFax) {
        const constituencyTelephoneFaxArray: Array<string> = constituencyTelephoneFax.split("\n");
        constituencyTelephone = constituencyTelephoneFaxArray[0] ? constituencyTelephoneFaxArray[0].replace("Telephone:", "").trim() : null;
        constituencyFax = constituencyTelephoneFaxArray[1] ? constituencyTelephoneFaxArray[1].replace("Fax:", "").trim() : null;
      }
      const constituencyAddressString: string | null = getText($, "#contact > div > div > div.col-md-9 > div > div > p:nth-child(1)");
      let constituencyAddress: string | null = null;
      if (constituencyAddressString) {
        const constituencyAddressArray: Array<string> = constituencyAddressString.split("\n").map(s => s.trim());
        constituencyName = constituencyAddressArray[0].replace("Main office -", "").trim();
        constituencyAddress = constituencyAddressArray.filter((e, index) => index !== 0).join(" ").trim();
      }

      let constituencyAlternateName: string | null = null;
      const constituencyAlternateTelephoneFax: string | null = getText($, "#contact > div > div > div.col-md-9 > div > div:nth-child(2) > p:nth-child(2)");
      let constituencyAlternateTelephone: string | null = null;
      let constituencyAlternateFax: string | null = null;
      if (constituencyAlternateTelephoneFax) {
        const constituencyAlternateTelephoneFaxArray: Array<string> = constituencyAlternateTelephoneFax.split("\n");
        constituencyAlternateTelephone = constituencyAlternateTelephoneFaxArray[0] ? constituencyAlternateTelephoneFaxArray[0].replace("Telephone:", "").trim() : null;
        constituencyAlternateFax = constituencyAlternateTelephoneFaxArray[1] ? constituencyAlternateTelephoneFaxArray[1].replace("Fax:", "").trim() : null;
      }
      const constituencyAlternateAddressString: string | null = getText($, "#contact > div > div > div.col-md-9 > div > div:nth-child(2) > p:nth-child(1)");
      let constituencyAlternateAddress: string | null = null;
      if (constituencyAlternateAddressString) {
        const constituencyAlternateAddressArray: Array<string> = constituencyAlternateAddressString.split("\n").map(s => s.trim());
        constituencyAlternateName = constituencyAlternateAddressArray[0].trim();
        constituencyAlternateAddress = constituencyAlternateAddressArray.filter((e, index) => index !== 0).join(" ").trim();
      }

      const preferredLanguage: string | null = getText($, "div > div.col.ce-mip-overview > dl > dd:nth-child(8)");
      console.log(preferredLanguage);

      if (constituency === null || email === null || hillTelephone === null || hillFax === null || constituencyTelephone === null || constituencyAddress === null) {
        console.log(`Unable to find contact information for url: ${url}`);
      } else {
        mpContacts[constituency] = {
          constituency: constituency as string,
          preferredLanguage: preferredLanguage as string,
          email: email as string,
          website: website as string,
          hillOffice: {
            name: "House of Commons",
            address: "Ottawa, Ontario, Canada K1A 0A6",
            telephone: hillTelephone,
            fax: hillFax,
          },
          mainOffice: {
            name: constituencyName,
            address: constituencyAddress,
            telephone: constituencyTelephone,
            fax: constituencyFax,
          },
          alternateOffice: {
            name: constituencyAlternateName,
            address: constituencyAlternateAddress,
            telephone: constituencyAlternateTelephone,
            fax: constituencyAlternateFax,
          },
        };
      }
    }

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
        const matchingContact: MPContact | undefined = mpContacts[constituency];
        if (!matchingContact) {
          console.log(`Unable to find contact for constituency: ${constituency}.`);
        }
        mpDataMap[constituency] = {
          title: title,
          firstName: firstName,
          lastName: lastName,
          constituency: constituency,
          province: province,
          party: party,
          photoSrc: photoSrc,
          contact: !!matchingContact ? matchingContact : null,
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
            contact: null,
          },
        };
        return mapPolygon;
      }
    }).filter((mapPolygon: any) => !!mapPolygon);

    fs.writeFile("C:\\Repository\\Private\\write-my-mp\\data\\map\\data.json", JSON.stringify(mapPolygons), () => {});
    return true;
  };

  const getText = (loadedElement: CheerioAPI, selector: string,): string | null => {
    const element = loadedElement(selector).eq(0);
    if (!!element) {
      const text: string = element.text().trim();
      return text === "" ? null : text;
    } else {
      return null;
    }
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
