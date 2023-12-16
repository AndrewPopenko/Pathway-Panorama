import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosureRoadsComponent } from './closure-roads.component';

describe('ClosureRoadsComponent', () => {
  let component: ClosureRoadsComponent;
  let fixture: ComponentFixture<ClosureRoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosureRoadsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClosureRoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
