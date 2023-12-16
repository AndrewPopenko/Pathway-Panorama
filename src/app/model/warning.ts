import { Coordinate, DisplayType, LorryParkingFeatureIcon, MultiLineText } from "@model/shared";

export interface Warning {
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
  startTimestamp: string;
}

export interface Warnings {
  warning: Warning[];
}