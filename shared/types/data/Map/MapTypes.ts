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
  photoSrc: string;
  contact: MPContact | null;
}

export interface MPContact {
  constituency: string;
  preferredLanguage: string;
  email: string;
  website: string;
  mainOffice: MPOffice;
  mainOfficeFrench: MPOffice;
  alternateOffice: MPOffice;
  alternateOfficeFrench: MPOffice;
}

export interface MPOffice {
  name: string | null;
  address: Array<string> | null;
  telephone: string | null;
  fax: string | null;
}

export interface MPDataMap {
  [constituency: string]: MPData;
}

export interface MPContactMap {
  [constituency: string]: MPContact;
}
