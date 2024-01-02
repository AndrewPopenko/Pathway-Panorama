import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from "@angular/forms";
import { filter, Observable, Subject, takeUntil, tap } from "rxjs";
import { AutobahnService } from "../autobahn.service";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  form = new FormBuilder().group({
    autobahnList: new FormControl(),
    isBlocked: new FormControl()
  })

  private showBlockedEventsSubject: Subject<boolean> = new Subject<boolean>();
  private readonly destroyed = new Subject<any>();

  showBlockedEvents$: Observable<boolean> = this.showBlockedEventsSubject.asObservable();

  constructor(private router: Router, protected autobahnService: AutobahnService) {
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroyed),
        filter(Boolean),
        tap((val: { [key: string]: string }) => {
          this.autobahnService.setAutobahn(val['autobahnList']);
          this.autobahnService.shouldShowOnlyBlockedEvents(!!val['isBlocked']);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
    this.destroyed.complete();
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }
}
