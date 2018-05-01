import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Authenticate } from '../../models/auth';

@Component({
  selector: 'hot-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() onSubmit = new EventEmitter<Authenticate>();

  @Output() onRegister = new EventEmitter();


  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }

  register() {
    this.onRegister.emit();
  }
}
