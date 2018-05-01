import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../../auth/models/user';
import {
  HotelActionTypes,
  HotelsActions,
  BookingActionTypes,
  BookingsActions
} from '../actions';


export interface UsersState extends EntityState<User> { }

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: false,
});

export const initialState: UsersState = adapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: HotelsActions | BookingsActions
): UsersState {
  switch (action.type) {

    case HotelActionTypes.searchHotelsSuccess:
    case BookingActionTypes.loadBookingsSuccess:
    case HotelActionTypes.preloadHotel: {
      return {
        ...adapter.addMany(action.payload.users, state)
      };
    }

    default: {
      return state;
    }
  }
}
