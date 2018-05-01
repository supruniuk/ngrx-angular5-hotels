import { createSelector } from '@ngrx/store';
import * as fromLoginPage from '../reducers/login-page.reducers';
import { AuthState, getAuthState } from '../reducers';


export const selectLoginPageState = createSelector(
  getAuthState,
  (state: AuthState) => state.loginPage
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
