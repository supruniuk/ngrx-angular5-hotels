import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'hot-star-rating-form',
  templateUrl: './star-rating-form.component.html',
  styleUrls: ['./star-rating-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingFormComponent),
      multi: true
    }
  ]
})
export class StarRatingFormComponent implements ControlValueAccessor {

  stars: number;

  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  // @HostBinding('style.opacity')
  // get opacity() {
  //   return this.disabled ? 0.25 : 1;
  // }

  // Function to call when the rating changes.
  onChange = (rating: number) => { };

  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => { };

  get value(): number {
    return this.stars;
  }

  rate(rating: number) {
    if (!this.disabled) {
      this.writeValue(rating);
    }
  }

  // Allows Angular to update the model (rating).
  // Update the model and changes needed for the view here.
  writeValue(rating: number): void {
    this.stars = rating;
    this.onChange(this.value);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor() { }

}
