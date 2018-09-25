import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { HotelsService, NotificationService, GeocodingService } from '../../services';
import { Hotel, Review} from '../../models';
import { User } from '@app/core/models/user';
import {
  HotelActionTypes,
  StartHotelsNewSearch,
  SearchHotels,
  SearchHotelsSuccess,
  SearchHotelsFail,
  GeocodeSelectedLocation,
  GeocodeSelectedLocationSuccess
} from '../actions';


@Injectable()
export class HotelsBaseEffects {

  constructor(
    private actions$: Actions,
    private hotelsService: HotelsService,
    private geocode: GeocodingService,
  ) { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .pipe(
      ofType<SearchHotels>(HotelActionTypes.searchHotels),
      map(action => action.payload),
      switchMap(searchParams => {
        return this.hotelsService
          .get(searchParams)
          .pipe(
            map((response: {
              hotels: Hotel[],
              reviews: Review[],
              users: User[],
              infiniteParams: any
            }) => {
              return new SearchHotelsSuccess({...response, filter});
            }),
            catchError((err) => {
              return of(new SearchHotelsFail({}));
            })
          );
      })
    );

  @Effect()
  newSearch$: Observable<Action> = this.actions$
    .pipe(
      ofType<StartHotelsNewSearch>(HotelActionTypes.startHotelsNewSearch),
      map(action => action.payload),
      switchMap((filter) => of(new SearchHotels(filter)))
    );


  @Effect()
  geocodeSelectedLocation$: Observable<Action> = this.actions$
    .pipe(
      ofType<StartHotelsNewSearch>(HotelActionTypes.geocodeSelectedLocation),
      map(action => action.payload),
      switchMap((address) => {
        return this.geocode.geocodeAddress(address)
          .pipe(
            map((response: { lat: number, lng: number }) => {
              return new GeocodeSelectedLocationSuccess(response);
            }),
            catchError((err) => {
              // WRONG ACTION !!!
              return of(new SearchHotelsFail({}));
            })            
          )
      })
    );

}
