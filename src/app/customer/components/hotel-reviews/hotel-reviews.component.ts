import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Review } from '@app/core/models/booking';
import { User } from '@app/core/models/user';


@Component({
  selector: 'hot-hotel-reviews',
  templateUrl: './hotel-reviews.component.html',
  styleUrls: ['./hotel-reviews.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelReviewsComponent {

  @Input() reviews: { review: Review, user: User }[];

  @Output() onLikeReview: EventEmitter<Review> = new EventEmitter<Review>();

  constructor() { }

}
