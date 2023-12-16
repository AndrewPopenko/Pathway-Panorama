import { Coordinate, DisplayType, LorryParkingFeatureIcon, MultiLineText } from "@model/shared";

export interface Roadwork {
  extent: string;
  identifier: string;
  routeRecommendation: MultiLineText,
  coordinate: Coordinate;
  footer: MultiLineText;
  icon: string;
  isBlocked: string;
  description: MultiLineText;
  title: string;
  point: string;
  display_type: DisplayType;
  lorryParkingFeatureIcons: LorryParkingFeatureIcon[];
  future: boolean;
  subtitle: string;
  startTimestamp: Date;
}

export interface Roadworks {
  roadworks: Roadwork[];
}
