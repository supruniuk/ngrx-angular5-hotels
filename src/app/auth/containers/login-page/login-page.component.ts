import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Authenticate } from '../../models/auth';
import { AuthState } from '../../store/reducers';
import { getLoginPagePending, getLoginPageError } from '../../store/selectors';
import { Login, RegisterRedirect } from '../../store/actions/auth';

@Component({
  selector: 'hot-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.select(getLoginPagePending);
  error$ = this.store.select(getLoginPageError);

  constructor(private store: Store<AuthState>) { }

  ngOnInit() { }

  onSubmit($event: Authenticate) {
    this.store.dispatch(new Login($event));
  }

  onRegister(user_type: string) {
    this.store.dispatch(new RegisterRedirect(user_type));
  }
}
