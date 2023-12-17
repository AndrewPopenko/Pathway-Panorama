import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricChargingStationComponent } from './electric-charging-station.component';
import { of } from "rxjs";
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
  selectedAutobahn$ = of('A1');
  getElectricChargingStation = jasmine.createSpy().and.returnValue(of({}));
}

describe('ElectricChargingStationComponent', () => {
  let component: ElectricChargingStationComponent;
  let fixture: ComponentFixture<ElectricChargingStationComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectricChargingStationComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ElectricChargingStationComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getElectricChargingStation when a new autobahn is selected', () => {
    expect(autobahnService.getElectricChargingStation).toHaveBeenCalledWith('A1');
  });
});
