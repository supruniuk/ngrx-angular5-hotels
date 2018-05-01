import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../../services';
import * as fromRoot from '../../../core/store/actions';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFail,
  // LoginRedirect,
  Register,
  RegisterSuccess,
  RegisterFail,
  RegisterRedirect,
  Logout,
  CustomerRedirect,
  HotelRedirect,
} from '../actions/auth';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }

  @Effect()
  login$ = this.actions$
    .pipe(
      ofType(AuthActionTypes.login),
      map((action: Login) => action.payload),
      switchMap(credentials => this.authService
        .login(credentials)
        .pipe(
          map(auth => new LoginSuccess(auth)),
          catchError(error => {
            const msg = this.handleError(error);
            return of(new LoginFail(msg));
          })
        )
      )
    );

  @Effect()
  loginSuccess$ = this.actions$
  .pipe(
    ofType(
      AuthActionTypes.loginSuccess,
      AuthActionTypes.registerSuccess
    ),
    map((action: LoginSuccess | RegisterSuccess) => action.payload.auth.type),
    map((authType) => new fromRoot.Go({ path: ['/'] }))
  );

  @Effect()
  logout$ = this.actions$
    .pipe(
      ofType(
        AuthActionTypes.loginRedirect,
        AuthActionTypes.logout
      ),
      map(authed => new fromRoot.Go({
        path: ['/login'],
        extras: { queryParamsHandling: 'preserve' }
      }))
    );

  @Effect()
  customerRedirect$ = this.actions$
    .pipe(
      ofType(AuthActionTypes.customerRedirect),
      map(authed => new fromRoot.Go({ path: ['/customer'] })),
  );

  @Effect()
  hotelRedirect$ = this.actions$
    .pipe(
      ofType(AuthActionTypes.hotelRedirect),
      map(authed => new fromRoot.Go({ path: ['/hotel'] })),
    );

  @Effect()
  register$ = this.actions$
    .pipe(
      ofType(AuthActionTypes.register),
      map((action: Register) => action.payload),
      switchMap(signup =>
        this.authService.register(signup)
          .pipe(
            map(user => new RegisterSuccess(user)),
            catchError(error => of(new RegisterFail(error)))
          )
      )
    );

  @Effect()
  registerRedirect$ = this.actions$
    .pipe(
      ofType(AuthActionTypes.registerRedirect),
      map(authed => new fromRoot.Go({ path: ['/register'] }))
    );

  private handleError = (error: any) => {
    switch (error.status) {
      case 0: {
        return ('Server isn\'t reachable. Please check internet connection.');
      }
      case 400: {
        return ('Unable to log in with provided credentials.');
      }
      default: {
        return `Server error: ${error.status}, message: ${error.message}`;
      }
    }
  }
}
