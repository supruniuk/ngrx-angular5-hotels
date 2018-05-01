import { createSelector } from '@ngrx/store';
import * as fromBookings from '../reducers/bookings.reducers';
import { getUserEntities } from './users.selectors';
import { getReviewEntities } from './reviews.selectors';
import {
  EntitiesState,
  getEntitiesState
} from '../reducers';


export const getBookingEntitiesState = createSelector(
  getEntitiesState,
  (state: EntitiesState) => state.bookings
);

export const {
  selectIds: getBookingIds,
  selectEntities: getBookingEntities,
  selectAll: getAllBookings,
  selectTotal: getTotalBookings,
} = fromBookings.adapter.getSelectors(getBookingEntitiesState);


export const getCustomerBookings = createSelector(
  getAllBookings,
  getReviewEntities,
  getUserEntities,
  (bookings, reviews, users) => {
    return bookings && bookings.map(booking => {
      const user = users[booking.hotel];
      const review = reviews[booking.review];
      return { booking, review, user };
    });
  }
);

export const getBookingsLoading = createSelector(
  getBookingEntitiesState,
  fromBookings.getBookingsLoading
);

export const getCustomerBookingsLoaded = createSelector(
  getBookingEntitiesState,
  fromBookings.getCustomerBookingsLoaded
);

export const getEditBookingId = createSelector(
  getBookingEntitiesState,
  fromBookings.getEditBookingId
);
