import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs/Observable";
import { tap, take, map, switchMap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
// import { getIsLogoutAlertOpened } from "../store/selectors";
import { ShowLogoutAlert } from "../store/actions";
import { RootState } from "../store/reducers";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private store: Store<RootState>) {}

  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   return this.isLogoutAlertOpened().pipe(
  //     switchMap(dialogOpened => {
  //       return next.handle(req).pipe(
  //         tap(
  //           (event: HttpEvent<any>) => {},
  //           (err: HttpErrorResponse) => {
  //             if (err.error instanceof Error) {
  //               // A client-side or network error occurred. Handle it accordingly.
  //               alert(`INTERCEPTOR: An error occurred: ${err.error.message}`);
  //             } else {
  //               // The backend returned an unsuccessful response code.
  //               // In case response error is 401
  //               if (err.status === 401 && !dialogOpened) {
  //                 this.store.dispatch(new ShowLogoutAlert());
  //                 // throw err;
  //               } else {
  //                 alert(
  //                   `INTERCEPTOR: Backend returned code ${err.status},
  //                   body was: ${err.error}`
  //                 );
  //               }
  //             }
  //           }
  //         )
  //       );
  //     })
  //   );
  // }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            alert(`INTERCEPTOR: An error occurred: ${err.error.message}`);
          } else {
            // The backend returned an unsuccessful response code.
            // In case response error is 401
            if (err.status === 401) {
              this.store.dispatch(new ShowLogoutAlert());
              // throw err;
            } else {
              alert(
                `INTERCEPTOR: Backend returned code ${err.status}, 
                    body was: ${err.error}`
              );
            }
          }
        }
      )
    );
  }

  // isLogoutAlertOpened(): Observable<boolean> {
  //   return this.store.pipe(
  //     select(getIsLogoutAlertOpened),
  //     map(opened => opened),
  //     take(1)
  //   );
  // }
}
