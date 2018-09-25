import { Action } from '@ngrx/store';
import { User } from '@app/core/models/user';
import { Authenticate, SignUp, Auth } from '../../models/auth';

export enum AuthActionTypes {
  login = '[Auth] Login',
  logout = '[Auth] Logout',
  loginSuccess = '[Auth] Login Success',
  loginFail = '[Auth] Login Failure',
  loginRedirect = '[Auth] Login Redirect',
  customerRedirect = '[Auth] Customer Redirect',
  hotelRedirect = '[Auth] Hotel Redirect',
  register = '[Auth] Register',
  registerSuccess = '[Auth] Register Success',
  registerFail = '[Auth] Register Failure',
  registerRedirect = '[Auth] Register Redirect',
}

export class Login implements Action {
  readonly type = AuthActionTypes.login;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.loginSuccess;

  constructor(public payload: { user: User, auth: Auth }) {}
}

export class LoginFail implements Action {
  readonly type = AuthActionTypes.loginFail;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.loginRedirect;
}

export class CustomerRedirect implements Action {
  readonly type = AuthActionTypes.customerRedirect;
}

export class HotelRedirect implements Action {
  readonly type = AuthActionTypes.hotelRedirect;
}

export class Register implements Action {
  readonly type = AuthActionTypes.register;

  constructor(public payload: SignUp) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.registerSuccess;

  constructor(public payload: { user: User, auth: Auth }) {}
}

export class RegisterFail implements Action {
  readonly type = AuthActionTypes.registerFail;

  constructor(public payload: any) {}
}

export class RegisterRedirect implements Action {
  readonly type = AuthActionTypes.registerRedirect;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.logout;
}

export type AuthActions = Login
  | LoginSuccess
  | LoginFail
  | LoginRedirect
  | CustomerRedirect
  | HotelRedirect
  | Register
  | RegisterSuccess
  | RegisterFail
  | RegisterRedirect
  | Logout;
