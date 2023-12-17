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

export interface RoadEvent {
  extent: string;
  identifier: string;
  routeRecommendation: MultiLineText;
  coordinate: Coordinate;
  footer: MultiLineText;
  icon: string;
  isBlocked: boolean;
  description: MultiLineText;
  title: string;
  point: string;
  display_type: DisplayType;
  lorryParkingFeatureIcons: LorryParkingFeatureIcon[];
  future: false;
  subtitle: string;
  startTimestamp?: Date;
}
