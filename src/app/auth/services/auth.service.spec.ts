import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { User, Authenticate, SignUp, AuthResponse } from '../models/user';
import { environment } from '@env/environment';

describe('Auth Service', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService
      ]
    });

    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const user: User = {
    name: 'test_user',
    groups: [{ id: 1, name: 'test_group' }],
    email: 'test_email',
  };
  const authResponse: AuthResponse = { user: user, token: 'test_token' };
  const authenticate: Authenticate = { email: 'test', password: 'password' };
  const signup: SignUp = { name: 'test_name', email: 'test@test.com', password: 'test_password' };

  it('should log user in', () => {
    authService.login(authenticate).subscribe(
      resp => {
        expect(resp.user).toBe(user);
        expect(resp.token).toEqual('test_token');
      }
    );

    const req = httpMock.expectOne(`${environment.serverUrl}/api-token-auth/`);
    expect(req.request.method).toEqual('POST');

    req.flush(authResponse);
  });

  it('should register new user',
    () => {
      authService.register(signup).subscribe(
        response => {
          expect(response).toBeTruthy();
        }
      );

      const req = httpMock.expectOne(`${environment.serverUrl}/auth-customers/`);
      expect(req.request.method).toEqual('POST');

      req.flush(authResponse);
    });


  it('should throw an error message when API returns an error',
    () => {
      authService.register(signup)
        .subscribe(() => { },
        err => {
          expect(Observable.of(err)).toBeTruthy();
          expect(err).toBe('Unexpected error!');
          return Observable.of(err);
        });

      const req = httpMock.expectOne(`${environment.serverUrl}/auth-customers/`);

      req.flush('Unexpected error!', { status: 500, statusText: 'Server Error' });
    });





});
