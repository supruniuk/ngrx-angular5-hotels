import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, tap, take } from 'rxjs/operators';
import {
  LoginRedirect,
  CustomerRedirect,
  HotelRedirect
} from '../store/actions/auth';
import { AuthState } from '../store/reducers';
import { getAuthType } from '../store/selectors';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private store: Store<AuthState>) { }

  canActivate(): Observable<boolean> {
    // When navigate manually in browser https://github.com/angular/angular/issues/16710
    return this.store.pipe(
      select(getAuthType),
      tap(role => {
        if (!role) {
          this.store.dispatch(new LoginRedirect());
        } else {
          if (role === 'customer') {
            this.store.dispatch(new CustomerRedirect());
          } else if (role === 'hotel') {
            this.store.dispatch(new HotelRedirect());
          }
        }
      }),
      map(role => true),
      take(1)
    );
  }
}
