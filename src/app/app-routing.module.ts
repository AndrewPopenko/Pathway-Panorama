import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MapViewComponent } from "./map-view/map-view.component";
import { ParkingLorryComponent } from "./parking-lorry/parking-lorry.component";
import { RoadWorksComponent } from "./road-works/road-works.component";
import { WarningsComponent } from "./warnings/warnings.component";
import { ClosureRoadsComponent } from "./closure-roads/closure-roads.component";
import { ElectricChargingStationComponent } from "./electric-charging-station/electric-charging-station.component";

const routes: Routes = [
  {path: '', redirectTo: '/road-works', pathMatch: 'full'},
  {path: 'road-works', component: RoadWorksComponent},
  {path: 'warnings', component: WarningsComponent},
  {path: 'closure-roads', component: ClosureRoadsComponent},
  {path: 'parking-lorry', component: ParkingLorryComponent},
  {path: 'electric-charging-station', component: ElectricChargingStationComponent},
  {path: 'map-view', component: MapViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
