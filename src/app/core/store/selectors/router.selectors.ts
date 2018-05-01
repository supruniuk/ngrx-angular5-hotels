import {
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { RouterStateUrl } from '@app/shared/utils';
import * as fromRouter from '@ngrx/router-store';


export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const getCurrentUrl = createSelector(
  getRouterState,
  (router: fromRouter.RouterReducerState<RouterStateUrl>) => router.state && router.state.url
);

export const getQueryParams = createSelector(
  getRouterState,
  (router: fromRouter.RouterReducerState<RouterStateUrl>) => router.state && router.state.queryParams
);


