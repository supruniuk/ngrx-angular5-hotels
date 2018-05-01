import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { HotelsService } from '@app/core/services';
import { ShowNotificationInfo, ShowNotificationError } from '@app/core/store';
import { SearchParams, Hotel, Review} from '../../models';
import { User } from '@app/auth/models/user';
import {
  HotelActionTypes,
  FavoriteHotel,
  FavoriteHotelSuccess,
  FavoriteHotelFail
} from '@app/core/store-entities/actions';


@Injectable()
export class CustomerHotelEffects {

  constructor(
    private actions$: Actions,
    private hotelsService: HotelsService,
  ) { }

  @Effect()
  favoriteHotel$: Observable<Action> = this.actions$
    .pipe(
      ofType<FavoriteHotel>(HotelActionTypes.favoriteHotel),
      map(action => action.payload),
      switchMap(hotel => {
          return this.hotelsService
          .favoriteHotel(hotel.id, !hotel.is_favorite)
          .pipe(
            map((response) => {
              return new FavoriteHotelSuccess({
                id: hotel.id,
                is_favorite: !hotel.is_favorite,
                name: hotel.name
              });
            }),
            catchError((err) => {
              console.error(err);
              return of(new FavoriteHotelFail({
                name: hotel.name,
                is_favorite: hotel.is_favorite
              }));
            })
          );
      })
    );

  @Effect()
  favoriteHotelSuccess$: Observable<Action> = this.actions$
    .pipe(
      ofType<FavoriteHotelSuccess>(HotelActionTypes.favoriteHotelSuccess),
      map(action => action.payload),
      map(hotel => {
        const msg = hotel.is_favorite ?
          `Hotel ${hotel.name} was added to favorites` :
          `Hotel ${hotel.name} was removed from favorites`;
        return new ShowNotificationInfo(msg);
      }),
    );

  @Effect()
  favoriteHotelFail$: Observable<Action> = this.actions$
    .pipe(
      ofType<FavoriteHotelFail>(HotelActionTypes.favoriteHotelFail),
      map(action => action.payload),
      map(hotel => {
        const msg = hotel.is_favorite ?
        `Error removing ${hotel.name} from favorites` :
        `Error adding ${hotel.name} to favorites`;
        return new ShowNotificationError(msg);
      }),
    );
}
