import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CustomerState } from '../../store/reducers';
import { getSearchParams } from '../../store/selectors';
import { SearchParams } from '@app/core/models/search';
import { getMobileLayout } from '../../../core/store/selectors';
import * as fromRouter from '../../../core/store/actions/router.actions';

@Component({
  selector: 'hot-search-hotels',
  templateUrl: './search-hotels.component.html',
  styleUrls: ['./search-hotels.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchHotelsComponent {

  filter$: Observable<SearchParams>;
  isMobileLayout$: Observable<boolean>;

  constructor(private store: Store<CustomerState>) {
    this.filter$ = store.select(getSearchParams);
    this.isMobileLayout$ = store.select(getMobileLayout);
  }

  search(params: SearchParams) {
     this.store.dispatch(new fromRouter.Go({
      path: ['customer/hotels'],
      extras: { queryParams: params, replaceUrl: true }
    }));
  }

  cancelSearch() {
    this.store.dispatch(new fromRouter.Go({
      path: ['customer/hotels'],
      extras: { queryParamsHandling: 'preserve' }
    }));
  }

  navigateBack() {
    this.store.dispatch(new fromRouter.Back());
  }
}
