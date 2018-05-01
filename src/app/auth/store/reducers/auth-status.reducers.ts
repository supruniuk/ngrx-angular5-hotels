import { AuthActionTypes, AuthActions } from '../actions/auth';
import { User } from '../../models/user';
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
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user,
        auth: action.payload.auth,
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
