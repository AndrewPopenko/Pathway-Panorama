import { Component, OnInit } from '@angular/core';
import { AutobahnService } from "../autobahn.service";
import { BaseComponent } from "../base/base.component";
import { filter, switchMap, takeUntil } from "rxjs";

@Component({
  selector: 'app-parking-lorry',
  templateUrl: './parking-lorry.component.html',
  styleUrls: ['./parking-lorry.component.scss']
})
export class ParkingLorryComponent extends BaseComponent implements OnInit {
  constructor(public override autobahnService: AutobahnService) {
    super(autobahnService);
  }

  ngOnInit(): void {
    this.autobahnService.selectedAutobahn$.pipe(takeUntil(this.destroyed),
      filter(Boolean),
      switchMap((val: string) => this.autobahnService.getLorryParkingList(val)
      )).subscribe();
  }
}
