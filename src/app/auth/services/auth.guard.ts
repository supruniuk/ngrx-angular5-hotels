import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { LoginRedirect } from '../store/actions/auth';
import { AuthState } from '../store/reducers';
import { getLoggedIn } from '../store/selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AuthState>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(getLoggedIn),
      take(1),
      map(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect());
        }
        return authed;
      })
    );
  }
}
