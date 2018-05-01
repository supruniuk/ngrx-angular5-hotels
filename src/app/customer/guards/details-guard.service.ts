import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { filter, switchMap, map, take, tap, catchError } from 'rxjs/operators';
import { CanActivate, CanActivateChild, CanLoad, Params, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { HotelsService } from '../../core/services/hotels.service';
import { PreloadHotel, PreloadHotelFail } from '../../core/store-entities/actions';
import { CustomerState } from '../store/reducers';
import { getHotelEntities, getHotelsLoaded } from '../../core/store-entities/selectors';
import { SearchParams } from '../models';


@Injectable()
export class DetailsGuard implements CanActivate {
  constructor(
    private store: Store<CustomerState>,
    private hotelsService: HotelsService,
  ) { }


  waitForHotelsToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(getHotelsLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }

  hasHotelInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(getHotelEntities),
      map(entities => {
        return !!entities[id];
      }),
      take(1)
    );
  }

  hasHotelInApi(id: string): Observable<boolean> {
    return this.hotelsService.retrieve(id).pipe(
      map((hotel: any) => new PreloadHotel(hotel)),
      tap((action: PreloadHotel) => this.store.dispatch(action)),
      map(hotel => !!hotel),
      catchError((error) => {
        this.store.dispatch(new PreloadHotelFail(error));
        return of(false);
      })
    );
  }

  hasHotel(id: string): Observable<boolean> {
    return this.hasHotelInStore(id).pipe(
      switchMap(inStore => inStore ? of(inStore) : this.hasHotelInApi(id))
    );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // return this.waitForHotelsToLoad().pipe(
    //   switchMap(() => this.hasHotel(route.params['id']))
    // );
    return this.hasHotel(route.firstChild.params['id']);
    // if(route.firstChild && route.firstChild.params['id']) {
    //   return this.hasHotelInApi(route.firstChild.params['id']);
    // }
    // return of(true);
  }
}
