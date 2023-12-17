import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarComponent } from './navigation-bar.component';
import { AutobahnService } from "../autobahn.service";
import { Router } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  let mockAutobahnService = jasmine.createSpyObj('AutobahnService', ['setAutobahn']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: AutobahnService, useValue: mockAutobahnService}
      ],
      imports: [
        MatToolbarModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the given path', () => {
    const path = 'test-path';
    component.navigate(path);
    expect(mockRouter.navigate).toHaveBeenCalledWith([path]);
  });

  it('should call setAutobahn on form value changes', () => {
    const testValue = {autobahnList: 'A1'};
    component.form.setValue(testValue);
    expect(mockAutobahnService.setAutobahn).toHaveBeenCalledWith(testValue.autobahnList);
  });

  it('should complete the `destroyed` subject on destroy', () => {
    spyOn(component['destroyed'], 'next');
    spyOn(component['destroyed'], 'complete');

    component.ngOnDestroy();

    expect(component['destroyed'].next).toHaveBeenCalledWith(null);
    expect(component['destroyed'].complete).toHaveBeenCalled();
  });
});
