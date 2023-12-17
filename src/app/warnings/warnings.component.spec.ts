import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningsComponent } from './warnings.component';
import { of } from "rxjs";
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
  selectedAutobahn$ = of('A1');
  getWarningList = jasmine.createSpy().and.returnValue(of({}));
}

describe('WarningsComponent', () => {
  let component: WarningsComponent;
  let fixture: ComponentFixture<WarningsComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningsComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WarningsComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWarningList when a new autobahn is selected', () => {
    expect(autobahnService.getWarningList).toHaveBeenCalledWith('A1');
  });
});
