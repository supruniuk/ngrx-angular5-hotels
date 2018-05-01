import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { take, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState} from '../store/reducers';
import { getToken } from '../store/selectors';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) { }

  readonly tokenType = 'JWT';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(getToken).pipe(
      take(1),
      switchMap(token => {
        // Clone the request to add authorization header only if auth token exists.
        const authenticatedRequest = token ?
          req.clone({ setHeaders: { Authorization: `${this.tokenType} ${token}` } }) : req;

        // Pass on the cloned request instead of the original request.
        return next.handle(authenticatedRequest);
      })
    );
  }
}



// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private store: Store<AuthState>) { }

//   readonly tokenType = 'JWT';

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // const started = Date.now();

//     return this.store.select(getToken)
//     .pipe(
//       take(1),
//       switchMap(token => {
//         // Clone the request to add authorization header only if auth token exists.
//         const authenticatedRequest = token ?
//           req.clone({ setHeaders: { Authorization: `${this.tokenType} ${token}` } }) : req;

//         // Pass on the cloned request instead of the original request.
//         return next.handle(authenticatedRequest).pipe(
//           tap(
//             // (event: HttpEvent<any>) => event instanceof HttpResponse ? 'succeeded' : '',
//             (event: HttpEvent<any>) => { },
//             (err: HttpErrorResponse) => {
//               if (err.error instanceof Error) {
//                 // A client-side or network error occurred. Handle it accordingly.
//                 alert(`INTERCEPTOR: An error occurred: ${err.error.message}`);
//               } else {
//                 // The backend returned an unsuccessful response code.
//                 alert(`INTERCEPTOR: Backend returned code ${err.status}, body was: ${err.error}`);
//                 // In case response error is 401
//                 if (err.status === 401) {
//                   // Redirecting to login page
//                   this.store.dispatch(new ShowLogoutAlert());
//                   // throw err;
//                 }
//               }
//             }
//           ),
//           // finalize(() => {
//           //   const elapsed = Date.now() - started;
//           //   console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
//           // })
//         );
//       })
//     );
//   }
// }
