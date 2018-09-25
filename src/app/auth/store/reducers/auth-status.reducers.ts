import { AuthActionTypes, AuthActions } from '../actions/auth';
// import { LocalStorageConfig, localStorageSync } from 'ngrx-store-localstorage';
// import {
//   Action,
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
//   MetaReducer
// } from '@ngrx/store';
import { User } from '@app/core/models/user';
import { Auth } from '../../models/auth';


export interface StatusState {
  loggedIn: boolean;
  auth: Auth | null;
  user: User | null;
}

export const initialState: StatusState = {
  loggedIn: false,
  auth: null,
  user: null,
};

export function reducer(state = initialState, action: AuthActions): StatusState {
  switch (action.type) {
    case AuthActionTypes.loginSuccess:
    case AuthActionTypes.registerSuccess: {

      let payload_auth = action.payload.auth;
      let payload_user = action.payload.user;
      return {
        ...state,
        loggedIn: true,
        auth: payload_auth,
        user: payload_user,
      };
    }

    case AuthActionTypes.logout: {
    // case AuthActionTypes.loginRedirect: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: StatusState) => state.loggedIn;
export const getUser = (state: StatusState) => state.user;
export const getToken = (state: StatusState) => state.auth ? state.auth.token : null;
export const getAuthType = (state: StatusState) => state.auth ? state.auth.type : null;


// export function sessionStorage(reducer: ActionReducer<StatusState>): ActionReducer<StatusState> {

//   const config: LocalStorageConfig = {
//     keys: [
//       'status'
//     ],
//     // set to false because of https://github.com/btroncone/ngrx-store-localstorage/issues/93
//     rehydrate: true,
//   };

//   return localStorageSync(config)(reducer);
// }