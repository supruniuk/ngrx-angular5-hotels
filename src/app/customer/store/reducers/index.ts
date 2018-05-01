import { createFeatureSelector } from '@ngrx/store';
import * as fromInfinite from './infinite.reducers';
import { SearchState, searchReducer } from './search.reducers';
import { RootState } from '../../../core/store/reducers';

export interface CustomerState {
  infinite: fromInfinite.InfiniteState;
  search: SearchState;
}

export interface RootCustomerState extends RootState {
  customer: CustomerState;
}

export const customerReducers = {
  infinite: fromInfinite.reducer,
  search: searchReducer,
};

export const getCustomerState = createFeatureSelector<CustomerState>('customer');
