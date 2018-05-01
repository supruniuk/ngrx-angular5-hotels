import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { BookingService } from '@app/core/services';
import { ShowNotificationInfo, ShowNotificationError } from '@app/core/store';
import { Booking, Review } from '../../models';
import { User } from '../../../auth/models/user';
import * as fromRouter from '../../../core/store/actions/router.actions';
import {
  BookingActionTypes,
  BookHotel,
  BookHotelSuccess,
  BookHotelFail,
} from '../../../core/store-entities/actions';


@Injectable()
export class CustomerBookingEffects {

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
  ) { }

  @Effect()
  bookHotel$: Observable<Action> = this.actions$
    .ofType<BookHotel>(BookingActionTypes.bookHotel)
    .pipe(
      map(action => action.payload),
      switchMap(booking => {
        return this.bookingService
          .create(booking)
          .pipe(
            map((response: any) => new BookHotelSuccess(response)),
            catchError((err) => {
              console.error('Error happened during booking');
              return of(new BookHotelFail(err));
            })
          );
      })
    );

  @Effect()
  bookHotelSuccess$ = this.actions$
    .ofType<BookHotelSuccess>(BookingActionTypes.bookHotelSuccess)
    .pipe(
      map(action => action.payload),
      switchMap(booking => [
        new fromRouter.Go({
          path: ['customer/hotels', booking.hotel],
          extras: { queryParamsHandling: 'preserve' }
        }),
        new ShowNotificationInfo('Hotel was booked successfully!')
      ])
    );

  @Effect()
  bookHotelFail$ = this.actions$
    .ofType<BookHotelFail>(BookingActionTypes.bookHotelFail)
    .pipe(
      map(action => action.payload),
      map(errMsg => new ShowNotificationError(errMsg))
    );    
}
