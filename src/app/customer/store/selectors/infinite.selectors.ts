import { createSelector } from '@ngrx/store';
import { getIsBusy, getIsCompleted, getCurrentPage } from '../reducers/infinite.reducers';
import { CustomerState, getCustomerState } from '../reducers';


export const getInfiniteState = createSelector(
  getCustomerState,
  (state: CustomerState) => state.infinite
);

export const getInfinitePage = createSelector(
  getInfiniteState,
  getCurrentPage,
);

const getIsInfiniteBusy = createSelector(
  getInfiniteState,
  getIsBusy,
);

const getIsInfiniteCompleted = createSelector(
  getInfiniteState,
  getIsCompleted,
);

export const getInfiniteStatus = createSelector(
  getIsInfiniteCompleted,
  getIsInfiniteBusy,
  (completed, busy) => !(busy || completed)
);
