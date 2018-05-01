import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '@env/environment';
import { RouterStateUrl } from '../../../shared/utils';
import * as fromRouter from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { LayoutState, layoutReducer } from './layout.reducers';


export interface RootState {
  layout: LayoutState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<RootState> = {
  layout: layoutReducer,
  router: fromRouter.routerReducer,
};

export function logger(reducer: ActionReducer<RootState>): ActionReducer<RootState> {
  return function (state: RootState, action: any): RootState {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];


