import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
// import 'rxjs/add/operator/catch';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '@app/core/models/user';

import {
  Authenticate,
  SignUp,
  AuthResponse,
  Auth,
  CUSTOMER_TYPE,
  HOTEL_TYPE
} from '../models/auth';
import { environment } from '@env/environment';


@Injectable()
export class AuthService {

  constructor(public http: HttpClient) { }

  login(authenticate: Authenticate) {
    const url = `${environment.serverUrl}/api-token-auth/`;
    return this.http.post<AuthResponse>(url, authenticate)
    .pipe(
      map(response => {
        return { user: response.user, auth: this.getAuth(response) };
      })
    );
  }

  register(signup: SignUp): Observable<{ user: User, auth: Auth }> {
    const url = `${environment.serverUrl}/auth/`;
    return this.http.post<AuthResponse>(url, signup)
    .pipe(
      map(response => {
        let responseAuth = this.getAuth(response);
        return { user: response.user, auth: responseAuth };
      })
    );
  }

  logout() {
    return of(true);
  }

  private getAuth(payload): Auth | null {
    for (const group of payload.user.groups) {
      switch (group.name) {
        case CUSTOMER_TYPE: {
          return new Auth(payload.token, CUSTOMER_TYPE);
        }
        case HOTEL_TYPE: {
          return new Auth(payload.token, HOTEL_TYPE);
        }
      }
    }
    return null;
  }

}
