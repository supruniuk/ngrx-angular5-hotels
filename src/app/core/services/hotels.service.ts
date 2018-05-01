import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, last } from 'rxjs/operators';
import { environment } from '@env/environment';
import {
  Hotel,
  SearchParams,
  Booking,
  Review
} from '../../customer/models';
import { User } from '../../auth/models/user';


@Injectable()
export class HotelsService {
  constructor(private http: HttpClient) { }

  private toHttpParams(params: SearchParams): HttpParams {
    return Object.getOwnPropertyNames(params)
      .filter(key => params[key])
      .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }

  get(queryParams) {
    return this.http
      .get(`${environment.serverUrl}/hotel/`, {
        params: this.toHttpParams(queryParams)
      }).pipe(
        map((response: any) => {
          const { results, ...infiniteParams } = response;
          const entities = this.flattenHotels(results);
          return { ...entities, infiniteParams };
        })
      );
  }

  retrieve(id: string) {
    return this.http
      .get(`${environment.serverUrl}/hotel/${id}/`)
      .pipe(
        map((response: any) => {
          return this.flattenHotels([response]);
        })
      );
  }

  favoriteHotel(id: string, is_favorite: boolean) {
    const method = is_favorite ? 'POST' : 'DELETE';
    const url = `${environment.serverUrl}/hotel/${id}/favorite/`;
    const req = new HttpRequest(method, url, null);

    return this.http.request(req).pipe(
      last(),
      map(response => response)
    );
  }


  private flattenHotels(hotelsArray): { hotels: Hotel[], reviews: Review[], users: User[] } {
    const reviews: Review[] = [];
    const users: User[] = [];
    const hotels: Hotel[] = [];

    hotelsArray.forEach(hotel => {
      if (hotel['reviews']) {
        hotel.reviews = hotel.reviews.map(review => {
          if (!users.find(o => o.id === review.customer.id)) {
            users.push(review.customer);
          }
          review.customer = review.customer.id;
          reviews.push(review);
          return review.id;
        });
      }
      hotels.push(hotel);
    });

    return { hotels, reviews, users };
  }
}
