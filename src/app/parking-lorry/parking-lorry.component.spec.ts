import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLorryComponent } from './parking-lorry.component';
import { of } from "rxjs";
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
  selectedAutobahn$ = of('A1');
  getLorryParkingList = jasmine.createSpy().and.returnValue(of({}));
}

describe('ParkingLorryComponent', () => {
  let component: ParkingLorryComponent;
  let fixture: ComponentFixture<ParkingLorryComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingLorryComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParkingLorryComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getLorryParkingList when a new autobahn is selected', () => {
    expect(autobahnService.getLorryParkingList).toHaveBeenCalledWith('A1');
  });
});
