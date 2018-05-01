import { Component, ChangeDetectionStrategy, OnDestroy } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { Params, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { CustomerState } from "@app/customer/store/reducers";
import { SearchHotels, StartHotelsNewSearch } from "@app/core/store-entities/actions";
import { getHotelsNotFound, getHotelsLoaded } from "@app/core/store-entities/selectors";

import {
  // getIsMasterActive,
  getShowMaster,
  getShowDetails,
} from "@app/core/store/selectors";
import { SearchParams } from '../../models';


@Component({
  selector: "hot-hotels-page",
  templateUrl: "./hotels-page.component.html",
  styleUrls: ["./hotels-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsPageComponent implements OnDestroy {
  hotelsNotFound$: Observable<boolean>;
  hotelsLoaded$: Observable<boolean>;
  // hotelsMasterActive$: Observable<boolean>;
  showMaster$: Observable<boolean>;
  showDetails$: Observable<boolean>;
  paramsSubscription: Subscription;

  constructor(
    private store: Store<CustomerState>,
    private route: ActivatedRoute
  ) {
    // this.hotelsMasterActive$ = store.select(getIsMasterActive);
    this.showMaster$ = store.select(getShowMaster);
    this.showDetails$ = store.select(getShowDetails);
    this.hotelsNotFound$ = store.select(getHotelsNotFound);
    this.hotelsLoaded$ = store.select(getHotelsLoaded);

    // Router is the source of truth for hotels list
    this.paramsSubscription = route.queryParams.pipe(
      map((params: Params) => new SearchParams(params)),
      // tap(searchParams => this.store.dispatch(new SetSearchParams(searchParams))),
      switchMap((searchParams: SearchParams) => {
        return this.hotelsLoaded$.pipe(
          take(1),
          map(loaded => {
            if(loaded) {
              return new StartHotelsNewSearch(searchParams);
            }
            return new SearchHotels(searchParams);
          })
        )
      })      
    ).subscribe(store);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
