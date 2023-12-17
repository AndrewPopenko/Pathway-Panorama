import { RoadEvent } from "@model/shared";

export interface ElectricChargingStation extends RoadEvent {
}

export interface ElectricChargingStations {
  electric_charging_station: ElectricChargingStation[];
}
