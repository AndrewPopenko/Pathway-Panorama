import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoadingSubject.asObservable();

  showSpinner(): void {
    this._isLoadingSubject.next(true);
  }

  hideSpinner(): void {
    this._isLoadingSubject.next(false);
  }
}
