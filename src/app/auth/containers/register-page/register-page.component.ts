import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignUp } from '../../models/auth';
import { AuthState } from '../../store/reducers';
import { getRegisterPagePending, getRegisterPageError } from '../../store/selectors';
import { Register, LoginRedirect } from '../../store/actions/auth';


@Component({
  selector: 'hot-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  pending$ = this.store.select(getRegisterPagePending);
  error$ = this.store.select(getRegisterPageError);

  constructor(private store: Store<AuthState>) { }

  ngOnInit() { }

  onSubmit($event: SignUp) {
    this.store.dispatch(new Register($event));
  }

  onCancel() {
    this.store.dispatch(new LoginRedirect());
  }
}
