import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';
import { BookingService } from '../../services/booking.service';
import { Booking, Review } from '../../models';
import { User } from '@app/core/models/user';

import {
  BookingActionTypes,
  LoadBookings,
  LoadBookingsSuccess,
  LoadBookingsFail,
} from '../actions';


@Injectable()
export class BookingBaseEffects {

  constructor(
    private actions$: Actions,
    private bookingService: BookingService,
  ) { }

  // @Effect()
  // book$: Observable<Action> = this.actions$
  //   .ofType<BookHotel>(BookingActionTypes.bookHotel)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(booking => {
  //       return this.bookingService
  //         .create(booking)
  //         .pipe(
  //           map((response: any) => new BookHotelSuccess(response)),
  //           catchError((err) => {
  //             console.error('Error happened during booking');
  //             return of(new BookHotelFail(err));
  //           })
  //         );
  //     })
  //   );

  // @Effect()
  // bookSuccess$ = this.actions$
  //   .ofType<BookHotel>(BookingActionTypes.bookHotelSuccess)
  //   .pipe(
  //     map(action => action.payload),
  //     switchMap(booking => {
  //       return of(new fromRouter.Go({
  //         path: ['customer/hotels', booking.hotel],
  //         extras: { queryParamsHandling: 'preserve' }
  //       }));
  //     })
  //   );

  @Effect()
  loadBookings$ = this.actions$
    .ofType<LoadBookings>(BookingActionTypes.loadBookings)
    .pipe(
      switchMap(() => {
        return this.bookingService
          .get().pipe(
            map((response: { bookings: Booking[], reviews: Review[], users: User[] }) => {
              return new LoadBookingsSuccess(response);
            }),
            catchError((error) => {
              console.error('Error happened loading Customer bookings');
              return of(new LoadBookingsFail(error));
            })
          );
      })
    );
}
