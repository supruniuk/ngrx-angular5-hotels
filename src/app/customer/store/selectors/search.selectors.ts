import { createSelector } from '@ngrx/store';
import { getFilter } from '../reducers/search.reducers';
import { CustomerState, getCustomerState } from '../reducers';


export const getFilterState = createSelector(
  getCustomerState,
  (state: CustomerState) => state.search
);

export const getSearchParams = createSelector(
  getFilterState,
  getFilter
);
