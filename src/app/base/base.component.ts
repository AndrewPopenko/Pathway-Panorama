import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AutobahnService } from "../autobahn.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnDestroy {

  protected readonly destroyed = new Subject<any>();

  constructor(public autobahnService: AutobahnService) {
  }

  ngOnDestroy() {
    this.destroyed.next(null);
    this.destroyed.complete();
  }
}
