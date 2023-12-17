import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from "rxjs";
import { Autobahn } from '@model/autobahn';
import { Api } from "./api";
import { Roadworks } from "@model/roadwork";
import { ParkingLorries } from "@model/lorry-parking";
import { Warnings } from "@model/warning";
import { SpinnerService } from "./spinner.service";
import { Closures } from "@model/closure";

@Injectable({
  providedIn: 'root'
})
export class AutobahnService {
  constructor(private http: HttpClient, private spinnerService: SpinnerService) {
  }

  private _selectedAutobahnSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private _roadworkListSubject: BehaviorSubject<Roadworks | null> = new BehaviorSubject<Roadworks | null>(null);
  private _lorryParkingListSubject: BehaviorSubject<ParkingLorries | null> = new BehaviorSubject<ParkingLorries | null>(null);
  private _warningListSubject$: BehaviorSubject<Warnings | null> = new BehaviorSubject<Warnings | null>(null);
  private _closureListSubject: BehaviorSubject<Closures | null> = new BehaviorSubject<Closures | null>(null);

  autobahnList$: Observable<Autobahn> = this.http.get<Autobahn>(Api.autobahnList)
    .pipe(
      tap(() => this.spinnerService.showSpinner()),
      catchError(this.handleError<Autobahn>('getAutobahns', {roads: []} as Autobahn)),
      finalize(() => this.spinnerService.hideSpinner()));

  selectedAutobahn$: Observable<string | null> = this._selectedAutobahnSubject.asObservable();
  roadworksList$ = this._roadworkListSubject.asObservable();
  lorryParkingList$ = this._lorryParkingListSubject.asObservable();
  warningList$ = this._warningListSubject$.asObservable();
  closureList$ = this._closureListSubject.asObservable();

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
      (warnings: Warnings) => this._warningListSubject$.next(warnings), 'getWarningList')
  }

  getClosuresList(roadId: string): Observable<Closures> {
    return this.handleRequest(this.http.get<Closures>(Api.closuresList(roadId)),
      (closures: Closures) => this._closureListSubject.next(closures), 'getClosuresList')
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
