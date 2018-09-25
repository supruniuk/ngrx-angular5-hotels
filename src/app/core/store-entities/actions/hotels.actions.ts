import { Action } from '@ngrx/store';
import { Hotel, Review } from '../../models';
import { User } from '@app/core/models/user';


export enum HotelActionTypes {
  startHotelsNewSearch = '[Entities] Start New Search Hotels',
  searchHotels = '[Entities] Search Hotels',
  searchHotelsSuccess = '[Entities] Search Hotels Success',
  searchHotelsFail = '[Entities] Search Hotels Fail',
  preloadHotel = '[Entities] Preload Hotel',
  preloadHotelFail = '[Entities] Preload Hotel Fail',
  selectHotel = '[Entities] Select Hotel',
  deselectHotel = '[Entities] Deselect Hotel',
  favoriteHotel = '[Entities] Favorite Hotel',
  favoriteHotelSuccess = '[Entities] Favorite Hotel Success',
  favoriteHotelFail = '[Entities] Favorite Hotel Fail',
  geocodeSelectedLocation = '[Entities] Geocode Selected Hotel Location',
  geocodeSelectedLocationSuccess = '[Entities] Geocode Selected Hotel Location Success',
}

export class PreloadHotel implements Action {
  readonly type = HotelActionTypes.preloadHotel;

  constructor(public payload: {
    hotels: Hotel[],
    reviews: Review[],
    users: User[],
  }) { }
}

export class StartHotelsNewSearch implements Action {
  readonly type = HotelActionTypes.startHotelsNewSearch;

  constructor(public payload: any) { }
}

export class SearchHotels implements Action {
  readonly type = HotelActionTypes.searchHotels;

  constructor(public payload: any) { }
}

export class SearchHotelsSuccess implements Action {
  readonly type = HotelActionTypes.searchHotelsSuccess;

  constructor(public payload: {
    hotels: Hotel[],
    reviews: Review[],
    users: User[],
    infiniteParams: any,
    filter: any
  }) { }
}

export class SearchHotelsFail implements Action {
  readonly type = HotelActionTypes.searchHotelsFail;

  constructor(public payload: any) { }
}

export class PreloadHotelFail implements Action {
  readonly type = HotelActionTypes.preloadHotelFail;

  constructor(public payload: any) { }
}

export class SelectHotel implements Action {
  readonly type = HotelActionTypes.selectHotel;

  constructor(public payload: string) { }
}

export class DeselectHotel implements Action {
  readonly type = HotelActionTypes.deselectHotel;
}

export class FavoriteHotel implements Action {
  readonly type = HotelActionTypes.favoriteHotel;

  constructor(public payload: Hotel) { }
}

export class FavoriteHotelSuccess implements Action {
  readonly type = HotelActionTypes.favoriteHotelSuccess;

  constructor(public payload: Partial<Hotel>) { }
}

export class FavoriteHotelFail implements Action {
  readonly type = HotelActionTypes.favoriteHotelFail;

  constructor(public payload: any) { }
}

export class GeocodeSelectedLocation implements Action {
  readonly type = HotelActionTypes.geocodeSelectedLocation;

  constructor(public payload: string) { }
}

export class GeocodeSelectedLocationSuccess implements Action {
  readonly type = HotelActionTypes.geocodeSelectedLocationSuccess;

  constructor(public payload: {lat: number, lng: number}) { }
}

export type HotelsActions = StartHotelsNewSearch
  | SearchHotels
  | SearchHotelsSuccess
  | SearchHotelsFail
  | PreloadHotel
  | PreloadHotelFail
  | SelectHotel
  | DeselectHotel
  | FavoriteHotel
  | FavoriteHotelSuccess
  | FavoriteHotelFail
  | GeocodeSelectedLocation
  | GeocodeSelectedLocationSuccess;
