import { TestBed } from '@angular/core/testing';

import { AutobahnService } from './autobahn.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Api } from "./api";
import { SpinnerService } from "./spinner.service";
import { Roadwork, Roadworks } from "@model/roadwork";
import { Coordinate, DisplayType } from "@model/shared";
import { ParkingLorries, ParkingLorry } from "@model/lorry-parking";
import { Closure, Closures } from "@model/closure";
import { Warning, Warnings } from "@model/warning";

describe('AutobahnService', () => {
  let service: AutobahnService;
  let httpTestingController: HttpTestingController;
  let spinnerServiceMock: jasmine.SpyObj<SpinnerService>;

  beforeEach(() => {
    spinnerServiceMock = jasmine.createSpyObj('SpinnerService', ['showSpinner', 'hideSpinner']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AutobahnService,
        {provide: SpinnerService, useValue: spinnerServiceMock}
      ]
    });
    service = TestBed.inject(AutobahnService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('autobahnList$ should return a list of autobahns', () => {
    const mockResponse = {roads: ['A1', 'A2']};

    service.autobahnList$.subscribe(data => {
      expect(data.roads.length).toBe(2);
      expect(data.roads).toEqual(mockResponse.roads);
    });

    const req = httpTestingController.expectOne(Api.autobahnList);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve roadworks data', () => {
    const dummyData: Roadworks = {roadworks: [mockData as Roadwork]};
    service.getRoadWorksList('A1').subscribe(data => {
      expect(data).toEqual(dummyData);
      expect(spinnerServiceMock.showSpinner).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne(Api.roadWorksList('A1'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
    expect(spinnerServiceMock.hideSpinner).toHaveBeenCalled();
  });

  it('should retrieve parking lorry data', () => {
    const dummyData: ParkingLorries = {parking_lorry: [mockData as ParkingLorry]};
    service.getLorryParkingList('A1').subscribe(data => {
      expect(data).toEqual(dummyData);
      expect(spinnerServiceMock.showSpinner).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne(Api.lorryParkingList('A1'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
    expect(spinnerServiceMock.hideSpinner).toHaveBeenCalled();
  });

  it('should retrieve closure data', () => {
    const dummyData: Closures = {closure: [mockData as Closure]};
    service.getClosuresList('A1').subscribe(data => {
      expect(data).toEqual(dummyData);
      expect(spinnerServiceMock.showSpinner).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne(Api.closuresList('A1'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
    expect(spinnerServiceMock.hideSpinner).toHaveBeenCalled();
  });

  it('should retrieve warning data', () => {
    const dummyData: Warnings = {warning: [mockData as Warning]};
    service.getWarningList('A1').subscribe(data => {
      expect(data).toEqual(dummyData);
      expect(spinnerServiceMock.showSpinner).toHaveBeenCalled();
    });

    const req = httpTestingController.expectOne(Api.warningsList('A1'));
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
    expect(spinnerServiceMock.hideSpinner).toHaveBeenCalled();
  });

  const mockData: Roadwork | ParkingLorry | Closure | Warning = {
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
