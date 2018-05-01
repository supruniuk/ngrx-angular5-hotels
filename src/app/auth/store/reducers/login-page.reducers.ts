import {
  AuthActionTypes,
  AuthActions,
} from '../actions/auth';

export interface LoginState {
  error: string | null;
  pending: boolean;
}

export const initialState: LoginState = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): LoginState {
  switch (action.type) {
    case AuthActionTypes.login: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActionTypes.loginSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActionTypes.loginFail: {
      return {
        ...state,
        error: action.payload,
        pending: false,
      };
    }

    default: {
      return state;
    }
  }
}

export const getError = (state: LoginState) => state.error;
export const getPending = (state: LoginState) => state.pending;
