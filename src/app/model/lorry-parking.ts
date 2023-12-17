import { RoadEvent } from "@model/shared";

export interface ParkingLorry extends RoadEvent {
}

export interface ParkingLorries {
  parking_lorry: ParkingLorry[];
}
