import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Booking, Review } from '../../models';
import { User } from '../../../auth/models/user';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hot-customer-booking',
  templateUrl: './customer-booking.component.html',
  styleUrls: ['./customer-booking.component.scss']
})
export class CustomerBookingComponent {

  @Input() booking: { booking: Booking, review: Review, user: User };

  @Input() editMode: boolean;

  @Input() active: boolean;

  @Output() onStartEdit: EventEmitter<string> = new EventEmitter<string>();

  @Output() onCancelEdit = new EventEmitter();

  @Output() onEdit: EventEmitter<Review> = new EventEmitter<Review>();

  reviewEditForm: FormGroup;

  formControls: {rating: FormControl, text: FormControl};

  constructor() { }

  onEditBegin() {
    this.formControls = this.createFormControls();
    this.reviewEditForm = new FormGroup(this.formControls);
    this.onStartEdit.emit(this.booking.booking.id);
  }

  onEditComplete() {
    // Mark rating control as touched in order to show validation error
    this.formControls.rating.markAsTouched();

    if (this.reviewEditForm.valid) {
      // Update existing review or create the new one
      const review = this.booking.review ?
        this.getUpdatedReview() :
        this.getNewReview();
      this.onEdit.emit(review);
    }
  }

  private getUpdatedReview<Review>() {
    return {
      ...this.reviewEditForm.value,
      id: this.booking.review.id,
    };
  }

  private getNewReview<Review>() {
    return {
      ...this.reviewEditForm.value,
      stay: this.booking.booking.id,
      customer: this.booking.booking.customer,
      hotel: this.booking.user.id
    };
  }

  private createFormControls(): { rating: FormControl, text: FormControl } {
    if (this.booking.review) {
      // If review exists fill the edit form controls
      // initially with the existing values
      return {
        rating: new FormControl(this.booking.review.rating),
        text: new FormControl(this.booking.review.text),
      };
    }

    return {
      rating: new FormControl(''),
      text: new FormControl(''),
    };
  }

  private showRatingValidationError() {
    return this.formControls.rating.hasError('required') && this.formControls.rating.touched;
  }
}

