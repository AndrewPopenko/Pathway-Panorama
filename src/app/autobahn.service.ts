import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, combineLatest, finalize, map, Observable, of, tap, throwError } from "rxjs";
import { Autobahn } from '@model/autobahn';
import { Api } from "./api";
import { Roadwork, Roadworks } from "@model/roadwork";
import { ParkingLorries } from "@model/lorry-parking";
import { Warnings } from "@model/warning";
import { SpinnerService } from "./spinner.service";
import { Closures } from "@model/closure";
import { ElectricChargingStations } from "@model/electric-charging-station";

@Injectable({
  providedIn: 'root'
})
export class AutobahnService {
  constructor(private http: HttpClient, private spinnerService: SpinnerService) {
  }

  private _selectedAutobahnSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private _roadworkListSubject: BehaviorSubject<Roadworks | null> = new BehaviorSubject<Roadworks | null>(null);
  private _lorryParkingListSubject: BehaviorSubject<ParkingLorries | null> = new BehaviorSubject<ParkingLorries | null>(null);
  private _warningListSubject: BehaviorSubject<Warnings | null> = new BehaviorSubject<Warnings | null>(null);
  private _closureListSubject: BehaviorSubject<Closures | null> = new BehaviorSubject<Closures | null>(null);
  private _electricChargingStationListSubject: BehaviorSubject<ElectricChargingStations | null> = new BehaviorSubject<ElectricChargingStations | null>(null);
  private _showOnlyBlockedEventsSubject: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(false)

  autobahnList$: Observable<Autobahn> = this.http.get<Autobahn>(Api.autobahnList)
    .pipe(
      tap(() => this.spinnerService.showSpinner()),
      catchError(this.handleError<Autobahn>('getAutobahns', {roads: []} as Autobahn)),
      finalize(() => this.spinnerService.hideSpinner()));

  showOnlyBlockedEvents$: Observable<boolean | null> = this._showOnlyBlockedEventsSubject.asObservable();

  selectedAutobahn$: Observable<string | null> = this._selectedAutobahnSubject.asObservable();
  // roadworksList$: Observable<Roadworks | null> = this._roadworkListSubject.asObservable();

  roadworksList$: Observable<Roadwork[] | null> = combineLatest([
    this._roadworkListSubject,
    this.showOnlyBlockedEvents$
  ]).pipe(
    map(([roadworks, showOnlyLockedEvents]) => {
      return roadworks?.roadworks?.filter(
        (roadwork: Roadwork) => showOnlyLockedEvents ? roadwork?.isBlocked === showOnlyLockedEvents : true
      ) || null
    })
  );

  lorryParkingList$: Observable<ParkingLorries | null> = this._lorryParkingListSubject.asObservable();
  warningList$: Observable<Warnings | null> = this._warningListSubject.asObservable();
  closureList$: Observable<Closures | null> = this._closureListSubject.asObservable();
  electricChargingStationList$: Observable<ElectricChargingStations | null> = this._electricChargingStationListSubject.asObservable();

  setAutobahn(roadId: string): void {
    this._selectedAutobahnSubject.next(roadId);
  }

  getRoadWorksList(roadId: string): Observable<Roadworks> {
    return this.http.get<Roadworks>(Api.roadWorksList(roadId)).pipe(
      tap(() => this.spinnerService.showSpinner()),
      tap((roadworks: Roadworks) => this._roadworkListSubject.next(roadworks)),
      catchError(this.handleError<Roadworks>('getRoadWorksList', {} as Roadworks)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }

  getLorryParkingList(roadId: string): Observable<ParkingLorries> {
    return this.handleRequest(this.http.get<ParkingLorries>(Api.lorryParkingList(roadId)),
      (parking: ParkingLorries) => this._lorryParkingListSubject.next(parking),
      'getLorryParkingList')
  }

  getWarningList(roadId: string): Observable<Warnings> {
    return this.handleRequest(this.http.get<Warnings>(Api.warningsList(roadId)),
      (warnings: Warnings) => this._warningListSubject.next(warnings), 'getWarningList')
  }

  getClosuresList(roadId: string): Observable<Closures> {
    return this.handleRequest(this.http.get<Closures>(Api.closuresList(roadId)),
      (closures: Closures) => this._closureListSubject.next(closures), 'getClosuresList')
  }

  getElectricChargingStation(roadId: string): Observable<ElectricChargingStations> {
    return this.handleRequest(this.http.get<ElectricChargingStations>(Api.electricChargingStationList(roadId)),
      (electric: ElectricChargingStations) => this._electricChargingStationListSubject.next(electric), 'getElectricChargingStation')
  }

  shouldShowOnlyBlockedEvents(flag: boolean) {
    this._showOnlyBlockedEventsSubject.next(flag)
  }

  private handleRequest<T>(obs$: Observable<T>, callback: (data: T) => void, operation = 'operation'): Observable<T> {
    return obs$.pipe(
      tap(() => this.spinnerService.showSpinner()),
      tap((data: T) => callback(data)),
      catchError(this.handleError<T>(operation, {} as T)),
      finalize(() => this.spinnerService.hideSpinner())
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: `, error);

      if (error.status === 404) {
        console.error(`Not found: ${error.message}`);
        return of(result as T);
      } else {
        // will be handled by component
        return throwError(() => new Error(`${operation} failed: ${error.message}`));
      }
    };
  }
}
