import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { CustomerState } from '../../store/reducers';
import {
  SelectHotel,
  DeselectHotel
} from '../../../core/store-entities/actions';


@Component({
  selector: 'hot-selected-hotel',
  templateUrl: './selected-hotel.component.html',
  styleUrls: ['./selected-hotel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedHotelComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(private store: Store<CustomerState>, private route: ActivatedRoute) {

    // this is unnecessary on mobile devices, getIsMobile ...

    this.actionsSubscription = route.params.pipe(
      map(params => new SelectHotel(params.id))
    ).subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
    this.store.dispatch(new DeselectHotel());
  }
}
