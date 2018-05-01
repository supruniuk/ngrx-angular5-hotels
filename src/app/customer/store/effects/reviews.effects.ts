import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { ReviewService } from '../../../core/services/review.service';
import { Review } from '../../../core/models';
import {
  ReviewActionTypes,
  LikeReview,
  LikeReviewSuccess,
  LikeReviewFail,
  EditReview,
  EditReviewSuccess,
  EditReviewFail,
  CreateReview,
  CreateReviewSuccess,
  CreateReviewFail
} from '../../../core/store-entities/actions';


@Injectable()
export class CustomerReviewEffects {

  constructor(
    private actions$: Actions,
    private reviewService: ReviewService,
  ) { }

  @Effect()
  createReview$ = this.actions$
    .ofType<CreateReview>(ReviewActionTypes.createReview)
    .pipe(
      map(action => action.payload),
      switchMap((review) => {
        return this.reviewService
          .create(review)
          .pipe(
            map((response: any) => new CreateReviewSuccess(response)),
            catchError((error) => of(new CreateReviewFail(error)))
          );
      })
    );

  @Effect()
  editReview$ = this.actions$
    .ofType<EditReview>(ReviewActionTypes.editReview)
    .pipe(
      map(action => action.payload),
      switchMap((review) => {
        return this.reviewService
          .update(review)
          .pipe(
            map((response: any) => {
              return new EditReviewSuccess(response);
            }),
            catchError((error) => {
              return of(new EditReviewFail(error));
            })
          );
      })
    );

  @Effect()
  likeReview$: Observable<Action> = this.actions$
    .ofType<LikeReview>(ReviewActionTypes.likeReview)
    .pipe(
      map(action => action.payload),
      switchMap(review => {
        return this.reviewService
          .likeReview(review.id, !review.is_liked)
          .pipe(
            map((response: Review) => {
              return new LikeReviewSuccess({
                id: response.id,
                is_liked: response.is_liked,
                likes_count: response.likes_count
              });
            }),
            catchError((err) => {
              console.error(err);
              return of(new LikeReviewFail([]));
            })
          );
      })
    );
}
