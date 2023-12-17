import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { AutobahnService } from "../autobahn.service";

class MockAutobahnService {
}

describe('HomeComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let autobahnService: AutobahnService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent],
      providers: [
        {provide: AutobahnService, useClass: MockAutobahnService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    autobahnService = TestBed.inject(AutobahnService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next and complete on destroyed subject when component is destroyed', () => {
    const spy = spyOn(component['destroyed'], 'next');
    const completeSpy = spyOn(component['destroyed'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(null);
    expect(completeSpy).toHaveBeenCalled();
  });
});
