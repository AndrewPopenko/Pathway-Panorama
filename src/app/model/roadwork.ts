import { RoadEvent } from "@model/shared";

export interface Roadwork extends RoadEvent {
}

export interface Roadworks {
  roadworks: Roadwork[];
}
