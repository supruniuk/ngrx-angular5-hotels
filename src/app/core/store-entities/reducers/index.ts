import { createFeatureSelector } from '@ngrx/store';
import * as fromHotels from './hotels.reducers';
import * as fromBookings from './bookings.reducers';
import * as fromReviews from './reviews.reducers';
import * as fromUsers from './users.reducers';
import { RootState } from '../../store/reducers';

export interface EntitiesState {
  hotels: fromHotels.HotelsState;
  bookings: fromBookings.BookingsState;
  reviews: fromReviews.ReviewsState;
  users: fromUsers.UsersState;
}

export interface RootEntitiesState extends RootState {
  entities: EntitiesState;
}

export const entitiesReducers = {
  bookings: fromBookings.reducer,
  hotels: fromHotels.hotelsReducer,
  reviews: fromReviews.reducer,
  users: fromUsers.reducer,
};

export const getEntitiesState = createFeatureSelector<EntitiesState>('entities');
