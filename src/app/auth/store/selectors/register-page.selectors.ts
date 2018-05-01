import { createSelector } from '@ngrx/store';
import * as fromRegisterPage from '../reducers/register-page.reducers';
import { AuthState, getAuthState } from '../reducers';


export const selectRegisterPageState = createSelector(
  getAuthState,
  (state: AuthState) => state.registerPage
);

export const getRegisterPageError = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getError
);

export const getRegisterPagePending = createSelector(
  selectRegisterPageState,
  fromRegisterPage.getPending
);
