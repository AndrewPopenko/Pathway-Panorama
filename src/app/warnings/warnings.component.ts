import { Component, OnInit } from '@angular/core';
import { BaseComponent } from "../base/base.component";
import { AutobahnService } from "../autobahn.service";
import { filter, switchMap, takeUntil } from "rxjs";

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent extends BaseComponent implements OnInit {
  constructor(public override autobahnService: AutobahnService) {
    super(autobahnService);
  }

  ngOnInit(): void {
    this.autobahnService.selectedAutobahn$.pipe(takeUntil(this.destroyed),
      filter(Boolean),
      switchMap((val: string) => this.autobahnService.getWarningList(val)
      )).subscribe();
  }
}
