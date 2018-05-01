import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootState } from '../store/reducers';
import { take, tap } from 'rxjs/operators';
import { getAuthType } from '../../auth/store/selectors';
import { CUSTOMER_TYPE, HOTEL_TYPE } from '../../auth/models/auth';
import { LoginRedirect } from '../../auth/store/actions/auth';
import * as fromRoot from '../../core/store/actions';


@Component({ template: '' })
export class RootRedirectComponent implements OnInit {

  constructor(private store: Store<RootState>) { }

  ngOnInit() {
    this.store.pipe(
      select(getAuthType),
      take(1),
      tap(type => {
        let path = '/login';
        if (type === CUSTOMER_TYPE) {
          path = '/customer';
        } else if (type === HOTEL_TYPE) {
          path = '/hotel';
        }
        this.store.dispatch(new fromRoot.Go({
          path: [path],
          extras: { replaceUrl: true }
        }));
      })
    ).subscribe();
  }

}
