import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SignUp } from '../../models/auth';

@Component({
  selector: 'hot-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() onSubmit = new EventEmitter<SignUp>();

  @Output() onCancel = new EventEmitter();

  form: FormGroup = new FormGroup({
    authType: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() {}

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
