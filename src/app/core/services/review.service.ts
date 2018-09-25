import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, filter, last } from 'rxjs/operators';
import { environment } from '@env/environment';
import { SearchParams } from '@app/core/models/search';
import { Booking, Review } from '@app/core/models/booking';
import { Hotel } from '@app/core/models/hotel';



@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) { }

  // private handleError = (error: any) => { throw (error.errorMessage || error.error || error.message || error._body); };

  create(review: Review) {
    return this.http
      .post(`${environment.serverUrl}/review/`, review)
      .pipe(
        map(response => response)
      );
      // .catch(this.handleError);
  }

  update(review: Review) {
    return this.http
      .patch(`${environment.serverUrl}/review/${review.id}/`, review)
      .pipe(
        map(response => response)
      );
      // .catch(this.handleError);
  }

  likeReview(id: string, is_liked: boolean): Observable<Review> {
    const method = is_liked ? 'POST' : 'DELETE';
    const url = `${environment.serverUrl}/review/${id}/like/`;
    const req = new HttpRequest(method, url, null);

    return this.http.request(req).pipe(
      last(),
      map((response: HttpResponse<any>) => response.body)
    );
      // .catch(this.handleError);
  }
}
