import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { map, filter } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Booking, Review } from '@app/core/models/booking';
import { Hotel } from '@app/core/models/hotel';
import { User } from '@app/core/models/user';


@Injectable()
export class BookingService {
  constructor(private http: HttpClient) { }

  private handleError = (error: any) => { throw (error.errorMessage || error.error || error.message || error._body); };

  get() {
    return this.http
      .get(`${environment.serverUrl}/stay/`)
      .pipe(
        map(response => this.flattenBookings(response))
      );
  }

  create(booking: Booking) {
    return this.http
      .post(`${environment.serverUrl}/stay/`, booking)
      .pipe(
        map(response => response)
      );
      // .catch(this.handleError);
  }

  private flattenBookings(bookingsArray): { bookings: Booking[], reviews: Review[], users: User[] } {
    const reviews: Review[] = [];
    const bookings: Booking[] = [];
    const users: User[] = [];

    bookingsArray.forEach(booking => {
      if (booking['review']) {
        reviews.push(booking.review);
        booking.review = booking.review.id;
      }

      if (!users.find(o => o.id === booking.hotel.id)) {
        users.push(booking.hotel);
      }
      booking.hotel = booking.hotel.id;

      if (!users.find(o => o.id === booking.customer.id)) {
        users.push(booking.customer);
      }
      booking.customer = booking.customer.id;

      bookings.push(booking);
    });

    return { bookings, reviews, users };
  }
}

