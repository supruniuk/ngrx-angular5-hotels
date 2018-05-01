import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hot-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() rating: number;

  @Input() small: boolean;

  @Input() editMode = false;

  @Output() updateRating: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

}
