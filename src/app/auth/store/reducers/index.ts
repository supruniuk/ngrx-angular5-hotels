import { localStorageSync } from 'ngrx-store-localstorage';
import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { RootState } from '../../../core/store/reducers';
import * as fromStatus from './auth-status.reducers';
import * as fromLoginPage from './login-page.reducers';
import * as fromRegisterPage from './register-page.reducers';


export interface AuthState {
  status: fromStatus.StatusState;
  loginPage: fromLoginPage.LoginState;
  registerPage: fromRegisterPage.RegisterState;
}

export interface RootAuthState extends RootState {
  auth: AuthState;
}

export const reducers = {
  status: fromStatus.reducer,
  loginPage: fromLoginPage.reducer,
  registerPage: fromRegisterPage.reducer,
};

// Setting up ngrx-store-localstorage reducer
// to keep authentication info in the LocalStorage
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['status'], rehydrate: true })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const getAuthState = createFeatureSelector<AuthState>('auth');
