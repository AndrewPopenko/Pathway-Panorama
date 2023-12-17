import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureRoadsComponent } from './closure-roads.component';
import { of } from "rxjs";
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
  selectedAutobahn$ = of('A1');
  getClosuresList = jasmine.createSpy().and.returnValue(of({}));
}

describe('ClosureRoadsComponent', () => {
  let component: ClosureRoadsComponent;
  let fixture: ComponentFixture<ClosureRoadsComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosureRoadsComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClosureRoadsComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getClosuresList on init', () => {
    expect(autobahnService.getClosuresList).toHaveBeenCalledWith('A1');
  });
});
