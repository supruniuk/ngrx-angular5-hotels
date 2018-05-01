import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CustomerState } from '../../store/reducers';
import {
  getCustomerBookings,
  getEditBookingId,
  getBookingsLoading
} from '../../../core/store-entities/selectors';
import {
  LoadBookings,
  StartEditBooking,
  CancelEditBooking,
  EditReview,
  CreateReview,
} from '../../../core/store-entities/actions';
import { Booking, Review } from '../../models';
import { User } from '../../../auth/models/user';


@Component({
  selector: 'hot-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingsPageComponent implements OnInit {

  bookings$: Observable<{ booking: Booking, review: Review, user: User }[]>;
  editBookingId$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(private store: Store<CustomerState>) {
    this.bookings$ = store.select(getCustomerBookings);
    this.editBookingId$ = store.select(getEditBookingId);
    this.loading$ = store.select(getBookingsLoading);
  }

ngOnInit() {
  this.store.dispatch(new LoadBookings());
}

  startEditBooking($event: string) {
    return this.store.dispatch(new StartEditBooking($event));
  }

  cancelEditBooking() {
    return this.store.dispatch(new CancelEditBooking());
  }

  editBooking($event: Review) {
    if ($event.id) {
      return this.store.dispatch(new EditReview($event));
    } else {
      return this.store.dispatch(new CreateReview($event));
    }
  }

  // ngOnDestroy() {
  //   this.store.dispatch(new ResetBookingsStore());
  // }

}
