import { Injectable } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { filter, map, tap, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { DialogService, NotificationService } from "../../services";
import { Logout } from "../../../auth/store";
import {
  LayoutActionTypes,
  ShowNotificationError,
  ShowNotificationInfo,
  CloseLogoutAlert,
  RouteResolveSuccess,
  NoAction
} from "../actions";

export enum CustomerRouteNames {
  hotelsMaster = 'HOTELS MASTER',
  hotelDetails = 'HOTEL DETAILS',
  searchHotels = 'SEARCH HOTELS',
  bookHotel = 'BOOK HOTEL',
  customerBookings = 'CUSTOMER BOOKINGS',
}

@Injectable()
export class LayoutEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: DialogService,
    private notification: NotificationService
  ) {}

  @Effect()
  showLogoutAlert$ = this.actions$.pipe(
    ofType(LayoutActionTypes.showLogoutAlert),
    switchMap(res => {
      return this.dialog
        .logoutAlert()
        .afterClosed()
        .pipe(map(() => new Logout()));
    })
  );

  @Effect()
  showLogoutConfirm$ = this.actions$.pipe(
    ofType(LayoutActionTypes.showLogoutConfirmBox),
    switchMap(res => {
      return this.dialog
        .logoutConfirmBox()
        .afterClosed()
        .pipe(
          map(confirm => {
            if (confirm) {
              return new Logout();
            }
            return new NoAction();
          })
        );
    })
  );

  @Effect({ dispatch: false })
  showNotificationInfo$ = this.actions$
    .pipe(
      ofType<ShowNotificationInfo>(LayoutActionTypes.showNotificationInfo),
      tap(action => this.notification.info(action.payload)),
    );

  @Effect({ dispatch: false })
  showNotificationError$ = this.actions$
    .pipe(
      ofType<ShowNotificationError>(LayoutActionTypes.showNotificationError),
      tap(action => this.notification.error(action.payload)),
    );


  // REFACTOR SOMEHOW, IT'S UGLY
  // Move to the guard for customer module
  // and trigger layout action "SetPageTitle"

  // HARDCODE IN METAREDUCER
  @Effect()
  navigationEnd$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.activatedRoute),
    map(route => {
      while (route.firstChild) { route = route.firstChild; }
      return route.snapshot;
    }),
    switchMap(routeSnapshot => {
      return of(new RouteResolveSuccess({
        pageTitle: this.getPageTitle(routeSnapshot),
        isMasterRouteActive: this.getIsMasterRoute(routeSnapshot) || false
      }));
    })
  );

  private getPageTitle(routeSnapshot): string {
    const queryParams = routeSnapshot.queryParams;
    switch (routeSnapshot.data.routeName) {
      case CustomerRouteNames.hotelsMaster:
      case CustomerRouteNames.hotelDetails:
      case CustomerRouteNames.searchHotels:
      case CustomerRouteNames.bookHotel: {
        return queryParams.favorites === 'true' ? 'Favorite Hotels' : 'Hotels';
      }

      case CustomerRouteNames.customerBookings: {
        return 'My Bookings';
      }

      default: {
        return '';
      }
    }
  }

  private getIsMasterRoute(routeSnapshot): boolean {
    return routeSnapshot.data.isMaster;
  }

}
