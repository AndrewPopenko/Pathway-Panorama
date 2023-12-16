import { Component, OnInit } from '@angular/core';
import { AutobahnService } from "../autobahn.service";
import { filter, switchMap, takeUntil } from "rxjs";
import { BaseComponent } from "../base/base.component";

@Component({
  selector: 'app-closure-roads',
  templateUrl: './closure-roads.component.html',
  styleUrls: ['./closure-roads.component.scss']
})
export class ClosureRoadsComponent extends BaseComponent implements OnInit {
  constructor(public override autobahnService: AutobahnService) {
    super(autobahnService);
  }

  ngOnInit(): void {
    this.autobahnService.selectedAutobahn$.pipe(takeUntil(this.destroyed),
      filter(Boolean),
      switchMap((val: string) => this.autobahnService.getClosuresList(val)
      )).subscribe();
  }
}
