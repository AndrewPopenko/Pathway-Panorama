import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadWorksComponent } from './road-works.component';

describe('RoadWorksComponent', () => {
  let component: RoadWorksComponent;
  let fixture: ComponentFixture<RoadWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoadWorksComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RoadWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
