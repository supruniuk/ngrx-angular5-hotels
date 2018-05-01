import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  BookingActionTypes,
  BookingsActions,
  ReviewActionTypes,
  ReviewsActions
} from '../actions';
import { Booking } from '../../models';


export interface BookingsState extends EntityState<Booking> {
  editBookingId: string;
  loading: boolean;
  loaded: boolean;
}

export function sortByDate(a: Booking, b: Booking): number {
  return a.start_date < b.start_date ? 1 : -1;
}

export const adapter: EntityAdapter<Booking> = createEntityAdapter<Booking>({
  selectId: (booking: Booking) => booking.id,
  sortComparer: sortByDate,
});

export const initialState: BookingsState = adapter.getInitialState({
  editBookingId: null,
  loading: false,
  loaded: false,
});

export function reducer(
  state = initialState,
  action: BookingsActions | ReviewsActions
): BookingsState {
  switch (action.type) {
    case BookingActionTypes.loadBookings: {
      return {
        ...adapter.removeAll(state),
        loading: true,
      };
    }

    case BookingActionTypes.loadBookingsSuccess: {
      return {
        ...adapter.addMany(action.payload.bookings, state),
        editBookingId: state.editBookingId,
        loading: false,
        loaded: true,
      };
    }

    case BookingActionTypes.loadBookingsFail: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    case BookingActionTypes.startEditBooking: {
      return {
        ...state,
        editBookingId: action.payload,
      };
    }

    case BookingActionTypes.cancelEditBooking: {
      return {
        ...state,
        editBookingId: null,
      };
    }

    case ReviewActionTypes.editReviewSuccess: {
      return {
        ...state,
        editBookingId: null,
        loading: false,
      };
    }

    case ReviewActionTypes.createReviewSuccess: {
      const updatedBooking = { id: state.editBookingId, changes: { review: action.payload.id} };
      return {
        ...adapter.updateOne(updatedBooking, state),
        editBookingId: null,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getEditBookingId = (state: BookingsState) => state.editBookingId;

export const getBookingsLoading = (state: BookingsState) => state.loading;

export const getCustomerBookingsLoaded = (state: BookingsState) => state.loaded;
