import { RoadEvent } from "@model/shared";

export interface Warning extends RoadEvent {
}

export interface Warnings {
  warning: Warning[];
}
