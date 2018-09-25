import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SearchParams } from '@app/core/models/search';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'hot-hotels-filter',
  templateUrl: './hotels-filter.component.html',
  styleUrls: ['./hotels-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelsFilterComponent {

  form = new FormGroup({
    name: new FormControl(),
    rating: new FormControl(),
    favorites: new FormControl(),
  });

  @Input() set filter(v: SearchParams) {
    if (JSON.stringify(v) !== JSON.stringify(this.form.value)) {
      this.form.patchValue(v);
    }
  }

  @Output() onSubmit = new EventEmitter<SearchParams>();

  @Output() onCancel = new EventEmitter();

  constructor() { }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  reset() {
    this.form.reset();
  }

  cancel() {
    this.onCancel.emit();
  }

}
