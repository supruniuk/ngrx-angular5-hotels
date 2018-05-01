import { Action } from '@ngrx/store';
import { Review } from '../../models';


export enum ReviewActionTypes {
  createReview = '[Entities] Create Review',
  createReviewSuccess = '[Entities] Create Review Success',
  createReviewFail = '[Entities] Create Review Fail',
  editReview = '[Entities] Edit Review',
  editReviewSuccess = '[Entities] Edit Review Success',
  editReviewFail = '[Entities] Edit Review Fail',  
  likeReview = '[Entities] Like Review',
  likeReviewSuccess = '[Entities] Like Review Success',
  likeReviewFail = '[Entities] Like Review Fail',
}

export class CreateReview implements Action {
  readonly type = ReviewActionTypes.createReview;

  constructor(public payload: Review) { }
}

export class CreateReviewSuccess implements Action {
  readonly type = ReviewActionTypes.createReviewSuccess;

  constructor(public payload: Review) { }
}

export class CreateReviewFail implements Action {
  readonly type = ReviewActionTypes.createReviewFail;

  constructor(public payload: any) { }
}

export class EditReview implements Action {
  readonly type = ReviewActionTypes.editReview;

  constructor(public payload: Review) { }
}

export class EditReviewSuccess implements Action {
  readonly type = ReviewActionTypes.editReviewSuccess;

  constructor(public payload: Review) { }
}

export class EditReviewFail implements Action {
  readonly type = ReviewActionTypes.editReviewFail;

  constructor(public payload: any) { }
}

export class LikeReview implements Action {
  readonly type = ReviewActionTypes.likeReview;

  constructor(public payload: Review) { }
}

export class LikeReviewSuccess implements Action {
  readonly type = ReviewActionTypes.likeReviewSuccess;

  constructor(public payload: Partial<Review>) { }
}

export class LikeReviewFail implements Action {
  readonly type = ReviewActionTypes.likeReviewFail;

  constructor(public payload: any) { }
}

export type ReviewsActions = 
  | LikeReview
  | LikeReviewSuccess
  | LikeReviewFail
  | EditReview
  | EditReviewSuccess
  | EditReviewFail
  | CreateReview
  | CreateReviewFail
  | CreateReviewSuccess;
