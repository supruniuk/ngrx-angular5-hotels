import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';

import { RootState } from '../../store/reducers';
import {
  ActivateDesktopLayout,
  ActivateMobileLayout,
  CloseSidenav, 
  OpenSidenav,
  ShowLogoutConfirmBox
} from '../../store/actions/layout.actions';
import {
  getShowToolbar,
  getPageTitle,
  getShowSidenav,
  getCurrentUrl,
  getQueryParams
} from '../../store/selectors';
import { getUser } from '../../../auth/store/selectors';
import { User } from '@app/core/models/user';

@Component({
  selector: 'hot-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnDestroy {

  onLayoutChanged: Subscription;
  onRouteChanged: Subscription;
  showSidenav$: Observable<boolean>;
  showToolbar$: Observable<boolean>;
  userData$: Observable<User>;
  pageTitle$: Observable<string>;
  currentUrl$: Observable<string>;
  queryParams$: Observable<any>;

  constructor(
    private store: Store<RootState>,
    private breakpointObserver: BreakpointObserver, 
  ) {
    this.showSidenav$ = this.store.select(getShowSidenav);
    this.showToolbar$ = this.store.select(getShowToolbar);
    this.pageTitle$ = this.store.select(getPageTitle);
    this.userData$ = this.store.select(getUser);
    this.currentUrl$ = this.store.select(getCurrentUrl);
    this.queryParams$ = this.store.select(getQueryParams);

    this.onLayoutChanged = this.breakpointObserver
    .observe(['(max-width: 959px)'])
    .subscribe(result => {
      if (result.matches) {
        this.store.dispatch(new ActivateMobileLayout());
      } else {
        this.store.dispatch(new ActivateDesktopLayout());
      }
    });

    this.onRouteChanged = combineLatest(
      this.currentUrl$,
      this.queryParams$
    )
    .subscribe(([url, queryParams]) => {
      if (url.includes('/customer/hotels')) {
        if (queryParams['favorites'] === 'true') {
          console.log('Page Title: Favorite Hotels')
        }
        else { console.log('Page Title: Hotels') }
      }
      else if (url.includes('/customer/bookings')) {
        console.log('Page Title: Bookings')
      }

      if (url === '/customer/hotels' || url === '/customer/bookings') {
        console.log('Master Route is Active')
      }
      else { console.log('Master Route is NOT Active') }
    });

   }

  closeSidenav() {
    this.store.dispatch(new CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new ShowLogoutConfirmBox());
  }

  ngOnDestroy() {
    this.onLayoutChanged.unsubscribe();
    this.onRouteChanged.unsubscribe();
  }
}
