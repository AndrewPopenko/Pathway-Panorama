import { Component, OnInit } from '@angular/core';
import { filter, switchMap, takeUntil } from "rxjs";
import { BaseComponent } from "../base/base.component";
import { AutobahnService } from "../autobahn.service";

@Component({
  selector: 'app-road-works',
  templateUrl: './road-works.component.html',
  styleUrls: ['./road-works.component.scss']
})
export class RoadWorksComponent extends BaseComponent implements OnInit {
  constructor(public override autobahnService: AutobahnService) {
    super(autobahnService);
  }

  ngOnInit(): void {
    this.autobahnService.selectedAutobahn$.pipe(takeUntil(this.destroyed),
      filter(Boolean),
      switchMap((val: string) => this.autobahnService.getRoadWorksList(val)
      )).subscribe();
  }
}
