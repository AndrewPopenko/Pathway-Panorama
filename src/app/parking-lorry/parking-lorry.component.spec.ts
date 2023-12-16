import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLorryComponent } from './parking-lorry.component';

describe('ParkingLorryComponent', () => {
  let component: ParkingLorryComponent;
  let fixture: ComponentFixture<ParkingLorryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingLorryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParkingLorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
