import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/reviews.reducers';
import { EntitiesState, getEntitiesState } from '../reducers';
import { getUserEntities } from './users.selectors';
import { getSelectedHotel } from './hotels.selectors';


export const getReviewsEntitiesState = createSelector(
  getEntitiesState,
  (state: EntitiesState) => state.reviews
);

export const {
  selectIds: getReviewIds,
  selectEntities: getReviewEntities,
  selectAll: getAllReviews,
  selectTotal: getTotalReviews,
} = adapter.getSelectors(getReviewsEntitiesState);

export const getSelectedHotelReviews = createSelector(
  getReviewEntities,
  getUserEntities,
  getSelectedHotel,
  (reviews, users, selectedHotel) => {
    return selectedHotel && selectedHotel.reviews
      .map(reviewId => reviews[reviewId])
      .map(review => {
        const user = users[review.customer];
        return { review, user };
      });
  }
);
