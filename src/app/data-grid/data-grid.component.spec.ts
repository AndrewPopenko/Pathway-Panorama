import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Roadwork } from "@model/roadwork";
import { Coordinate, DisplayType } from "@model/shared";

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data correctly', () => {
    component.ELEMENT_DATA = [mockData];
    fixture.detectChanges();
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThan(1);
  });

  const mockData: Roadwork = {
    "extent": "10.72373,53.91974,10.7477,54.00597",
    "identifier": "Uk9BRFdPUktTX19tZG0udml6X19MTVMvcl9MTVMvNjUzMjE5X0QgIFNIIExNUy1TSC4w",
    "routeRecommendation": [],
    "coordinate": {
      "lat": "54.005970",
      "long": "10.728860"
    } as Coordinate,
    "footer": [],
    "icon": "123",
    "isBlocked": "false",
    "description": [
      "Beginn: 18.09.2023 00:00",
      "Ende: 30.06.2024 23:59",
      "",
      "A1 Fehmarn Richtung Lübeck",
      "zwischen Pansdorf und Sereetz",
      "Fahrbahn auf einen Fahrstreifen verengt, Baustelle, bis 30.06.2024 23:59 Uhr"
    ],
    "title": "A1 | AS Pansdorf (17) - AS Sereetz (19)",
    "point": "10.728860,54.005970",
    "display_type": DisplayType.ROADWORKS,
    "lorryParkingFeatureIcons": [],
    "future": false,
    "subtitle": "Fehmarn Richtung Lübeck",
    "startTimestamp": new Date()
  }
});
