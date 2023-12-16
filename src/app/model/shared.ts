export type MultiLineText = string[];

export enum DisplayType {
  ROADWORKS,
  PARKING,
  MACHINE,
  ELECTRIC_CHARGING_STATION,
}

export interface Icon {
  id: string;
  description: string;
}

export interface LorryParkingFeatureIcon {
  icon: string;
  description: string;
  style: string;
}

export interface Coordinate {
  description: string;
  lat: string;
  long: string;
}

export interface Identifier {
  id: string;
  roadId: string;
}
