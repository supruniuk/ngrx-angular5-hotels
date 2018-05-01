import { createSelector } from '@ngrx/store';
import * as fromStatus from '../reducers/auth-status.reducers';
import { AuthState, getAuthState } from '../reducers';


export const selectAuthStatusState = createSelector(
  getAuthState,
  (state: AuthState) => state.status
);

export const getLoggedIn = createSelector(
  selectAuthStatusState,
  fromStatus.getLoggedIn
);

export const getCurrentUser = createSelector(
  selectAuthStatusState,
  fromStatus.getUser
);

export const getUser = createSelector(
  getLoggedIn,
  getCurrentUser,
  (loggedIn, user) => {
    return loggedIn && user;
  });

export const getToken = createSelector(selectAuthStatusState, fromStatus.getToken);

export const getAuthType = createSelector(selectAuthStatusState, fromStatus.getAuthType);
