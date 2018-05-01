import { of } from 'rxjs/observable/of';
import { filter, switchMap, take, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoadBookings } from '../../core/store-entities/actions';
import { getCustomerBookingsLoaded } from '../../core/store-entities/selectors';
import { CustomerState } from '../store/reducers';


@Injectable()
export class BookingsGuard implements CanActivate {
  constructor(
    private store: Store<CustomerState>,
  ) { }

  canActivate(): Observable<boolean> {
    return this.waitForBookingsToLoad().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  waitForBookingsToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(getCustomerBookingsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadBookings());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
