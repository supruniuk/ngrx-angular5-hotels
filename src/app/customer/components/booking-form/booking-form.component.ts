import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BookingForm } from '../../models';


@Component({
  selector: 'hot-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {

  minDate = new Date();

  bookingForm = new FormGroup({
    bedrooms: new FormControl(),
    endDate: new FormControl(),
    startDate: new FormControl(),
  });

  constructor() { }

  @Output() onSubmit: EventEmitter<BookingForm> = new EventEmitter<BookingForm>();

  @Output() onCancel = new EventEmitter();

  submit() {
    if (this.bookingForm.valid) {
      this.onSubmit.emit(this.bookingForm.value);
    }
  }

}

