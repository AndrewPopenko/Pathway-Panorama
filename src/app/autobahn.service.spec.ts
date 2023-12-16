import { TestBed } from '@angular/core/testing';

import { AutobahnService } from './autobahn.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Api } from "./api";

describe('AutobahnService', () => {
  let service: AutobahnService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutobahnService]
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
});
