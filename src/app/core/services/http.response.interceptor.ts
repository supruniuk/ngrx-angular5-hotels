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
            alert(
              `RESPONSE INTERCEPTOR: Client error occurred: ${
                err.error.message
              }. Need to show here some modal window with explanation, stack trace ? and feedback.`
            );
          } else {
            // The backend returned an unsuccessful response code.
            // In case response error is 401
            if (err.status === 401) {
              this.store.dispatch(new ShowLogoutAlert());
              // throw err;
            } else {
              // Some of the errors coming from the backend should be displayed as an error messages inside the forms
              // and the others as a dialog popups with 'probably' some user logic, buttons, store etc.
              // commented example below catches all Backend errors, types error code status and error object property
              // but having errors as a pyaload of particular '...FailAction' allows
              // to customize error handling behavior on that particular page. For Example:
              // 'LoginAction' fails due to incorrect credentials, handling error should happen in corresponded effect.
              // Extracting and modifying an error object (for example: it's never known
              // where the meaningful error message is in: error.error or error.message,
              // response from server can be malformed and require parsing or total replasing of error text message
              // shown to the user. This place is good and it's centralized, but it's very hard to maintain it.
              // 
              // alert(
              //   `SERVER ERROR ${err.status}:` + JSON.stringify(err.error)
              // );
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
