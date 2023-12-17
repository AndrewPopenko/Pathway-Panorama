import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadWorksComponent } from './road-works.component';
import { of } from "rxjs";
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
  selectedAutobahn$ = of('A1');
  getRoadWorksList = jasmine.createSpy().and.returnValue(of({}));
}

describe('RoadWorksComponent', () => {
  let component: RoadWorksComponent;
  let fixture: ComponentFixture<RoadWorksComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadWorksComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoadWorksComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getRoadWorksList when a new autobahn is selected', () => {
    expect(autobahnService.getRoadWorksList).toHaveBeenCalledWith('A1');
  });
});
