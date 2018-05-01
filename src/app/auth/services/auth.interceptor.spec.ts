import { User } from '../models/user';
import { AuthResponse } from '../models/auth';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { cold } from 'jasmine-marbles';
import { AuthInterceptor } from './auth-interceptor.service';
import * as Auth from '../actions/auth';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../reducers';


describe('Auth Interceptor', () => {
  let store: Store<any>;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  const tokenType = 'JWT';
  const tokenValue = 'testTokenValue';
  const user: User = {
    name: 'test_user',
    groups: [{ id: 1, name: 'customer' }],
    email: 'test_email',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromAuth.reducers),
        }),
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }],
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should attach Authorization header to the request', () => {

    const resp: AuthResponse = { user: user, token: tokenValue };
    const login = new Auth.LoginSuccess(resp);
    store.dispatch(login);

    http.get('/data').subscribe();

    const req = httpMock.expectOne(request => {
      return request.headers.has('Authorization') && request.headers.get('Authorization') === `${tokenType} ${tokenValue}`;
    });

    req.flush({ status: 200 });
  });


  it('shouldn\'t attach Authorization header to the request if auth token is absent', () => {
    http.get('/data').subscribe();

    const req = httpMock.expectOne(request => {
      return !request.headers.has('Authorization');
    });

    req.flush({ status: 200 });
  });


  it('should dispatch LOGIN_REDIRECT action on response error 401', () => {

    http.get('/data').subscribe(null, () => { });

    const req = httpMock.expectOne('/data');
    req.flush('Authentication error!', { status: 401, statusText: 'Access denied!' });

    const redirect = new Auth.LoginRedirect();
    expect(store.dispatch).toHaveBeenCalledWith(redirect);
  });


  it('shouldn\'t dispatch LOGIN_REDIRECT action if response error isn\'t 401', () => {

    http.get('/data').subscribe(null, () => { });

    const req = httpMock.expectOne('/data');
    req.flush('Resource is not found!', { status: 404, statusText: 'Not found!' });

    const redirect = new Auth.LoginRedirect();
    expect(store.dispatch).not.toHaveBeenCalledWith(redirect);
  });

});
