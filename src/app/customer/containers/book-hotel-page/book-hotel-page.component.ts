import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { take } from 'rxjs/operators';
import { CustomerState } from '../../store/reducers';
import { getUser } from '../../../auth/store/selectors';
import { User } from '@app/core/models/user';
import * as fromRouter from '../../../core/store/actions/router.actions';
import { getMobileLayout } from '../../../core/store/selectors';
import { getSelectedHotel } from '../../../core/store-entities/selectors';
import { BookHotel } from '../../../core/store-entities/actions';
import { Booking, Review, BookingForm } from '@app/core/models/booking';
import { Hotel } from '@app/core/models/hotel';



@Component({
  selector: 'hot-book-page',
  templateUrl: './book-hotel-page.component.html',
  styleUrls: ['./book-hotel-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookHotelComponent {
  hotel$: Observable<Hotel>;
  user$: Observable<User>;
  isMobileLayout$: Observable<boolean>;

  constructor(private store: Store<CustomerState>) {
    this.hotel$ = store.select(getSelectedHotel);
    this.user$ = store.select(getUser);
    this.isMobileLayout$ = store.select(getMobileLayout);
  }

  bookHotel($event: BookingForm) {
    Observable.combineLatest(this.hotel$, this.user$)
      .pipe(
        take(1),
      ).subscribe(([hotel, user]) => {
        const booking: Booking = {
          start_date: $event.startDate.toISOString().split('T')[0],
          end_date: $event.endDate.toISOString().split('T')[0],
          customer: user.id,
          hotel: hotel.id
        };
        return this.store.dispatch(new BookHotel(booking));
      });
  }

  navigateBack() {
    this.store.dispatch(new fromRouter.Back());
  }
}
