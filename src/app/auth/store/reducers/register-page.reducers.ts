import { AuthActionTypes, AuthActions } from '../actions/auth';

export interface RegisterState {
  error: string | null;
  pending: boolean;
}

export const initialState: RegisterState = {
  error: null,
  pending: false,
};

export function reducer(state = initialState, action: AuthActions): RegisterState {
  switch (action.type) {
    case AuthActionTypes.register: {
      return {
        ...state,
        error: null,
        pending: true,
      };
    }

    case AuthActionTypes.registerSuccess: {
      return {
        ...state,
        error: null,
        pending: false,
      };
    }

    case AuthActionTypes.registerFail: {
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

export const getError = (state: RegisterState) => state.error;
export const getPending = (state: RegisterState) => state.pending;
