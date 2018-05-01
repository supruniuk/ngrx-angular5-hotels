import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { 
  ReviewActionTypes,
  ReviewsActions,
  HotelsActions,
  HotelActionTypes,
  BookingsActions,
  BookingActionTypes
} from '../actions';
import { Review } from '../../models';


export interface ReviewsState extends EntityState<Review> {
  loading: boolean;
}

export function sortByDate(a: Review, b: Review): number {
  return a.created_on < b.created_on ? 1 : -1;
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>({
  selectId: (review: Review) => review.id,
  sortComparer: sortByDate,
});

export const initialState: ReviewsState = adapter.getInitialState({
  loading: false,
});

export function reducer(
  state = initialState,
  action: ReviewsActions | HotelsActions | BookingsActions
): ReviewsState {
  switch (action.type) {

    case HotelActionTypes.searchHotelsSuccess: {
      return {
        ...adapter.addMany(action.payload.reviews, state)
      };
    }

    case ReviewActionTypes.likeReviewSuccess: {
      const updatedReview = { id: action.payload.id, changes: action.payload };
      return {
        ...adapter.updateOne(updatedReview, state)
      };
    }

    case BookingActionTypes.loadBookingsSuccess:
    case HotelActionTypes.preloadHotel: {
      return {
        ...adapter.addMany(action.payload.reviews, state),
      };
    }

    case ReviewActionTypes.editReview: {
      return {
        ...state,
        loading: true,
      };
    }

    case ReviewActionTypes.editReviewSuccess: {
      const updatedReview = { id: action.payload.id, changes: action.payload };

      return {
        ...adapter.updateOne(updatedReview, state),
        loading: false,
      };
    }

    case ReviewActionTypes.editReviewFail: {
      return {
        ...state,
        loading: false,
      };
    }

    case ReviewActionTypes.createReviewSuccess: {
      return {
        ...adapter.addOne(action.payload, state),
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
}
