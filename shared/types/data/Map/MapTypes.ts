export interface MapPolygon {
  constituency: string;
  constituencyFrench: string;
  constituencyId: string;
  provinceId: string;
  geometry: Array<Array<[number, number]>>;
  mpData: MPData;
}

export interface MPData {
  title: string;
  firstName: string;
  lastName: string;
  constituency: string;
  province: string;
  party: string;
}

export interface MPDataMap {
  [constituency: string]: MPData;
}
