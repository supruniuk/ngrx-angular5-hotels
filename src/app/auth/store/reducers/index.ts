import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
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

export const reducers: ActionReducerMap<AuthState> = {
  status: fromStatus.reducer,
  loginPage: fromLoginPage.reducer,
  registerPage: fromRegisterPage.reducer,
};

// Setting up ngrx-store-localstorage reducer
// to keep authentication info in the LocalStorage

// export function localStorageAuthReducer(reducer: ActionReducer<AuthState>): ActionReducer<AuthState> {
//   return localStorageSync({ keys: ['status'], rehydrate: true })(reducer);
// }

export function sessionStorage(reducer: ActionReducer<AuthState>): ActionReducer<AuthState> {

  const config: LocalStorageConfig = {
    keys: [
      'status'
    ],
    // keys: [
    //   { status: ['loggedIn', 'auth', 'user'] }
    // ],
    // set to false because of https://github.com/btroncone/ngrx-store-localstorage/issues/93
    rehydrate: true,
  };

  return localStorageSync(config)(reducer);
}

// export const metaReducers: MetaReducer<AuthState>[] = [localStorageAuthReducer];

export const getAuthState = createFeatureSelector<AuthState>('auth');
