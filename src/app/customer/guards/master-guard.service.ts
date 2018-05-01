import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { StartHotelsNewSearch } from '../../core/store-entities/actions';
import { CustomerState } from '../store/reducers';
import { getHotelsLoaded } from '../../core/store-entities/selectors';
import { SearchParams } from '../models';
import { filter, switchMap, map, take, tap, catchError } from 'rxjs/operators';

@Injectable()
export class MasterGuard implements CanActivate {
  constructor(
    private store: Store<CustomerState>,
  ) { }

  // canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
  //   return this.waitForHotelsToLoad(route).pipe(
  //     switchMap(() => of(true)),
  //     catchError(() => of(false))
  //   );
  // }

  // waitForHotelsToLoad(route: ActivatedRouteSnapshot): Observable<boolean> {
  //   return this.store.select(getHotelsLoaded).pipe(
  //     // WORKAROUND REFACTOR
  //     take(1),
  //     tap(loaded => {
  //       // This is commented on purpose, otherwise search stops working
  //       // if (!loaded) {
  //         this.store.dispatch(new NewSearch(this.queryParamsToFilter(route.queryParams)));
  //       // }
  //     }),
  //     // filter(loaded => loaded),
  //     // take(1)
  //   );
  // }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const searchParams = new SearchParams(route.queryParams);
    this.store.dispatch(new StartHotelsNewSearch(searchParams));
    return of(true);
  }
}
