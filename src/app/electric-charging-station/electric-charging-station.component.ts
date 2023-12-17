import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { AutobahnService } from "../autobahn.service";
import { filter, switchMap, takeUntil } from "rxjs";

@Component({
  selector: 'app-electric-charging-station',
  templateUrl: './electric-charging-station.component.html',
  styleUrls: ['./electric-charging-station.component.scss']
})
export class ElectricChargingStationComponent extends BaseComponent implements OnInit {
  constructor(public override autobahnService: AutobahnService) {
    super(autobahnService);
  }

  ngOnInit(): void {
    this.autobahnService.selectedAutobahn$.pipe(takeUntil(this.destroyed),
      filter(Boolean),
      switchMap((val: string) => this.autobahnService.getElectricChargingStation(val)
      )).subscribe();
  }
}
