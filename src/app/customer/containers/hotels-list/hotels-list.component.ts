import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { of } from 'rxjs/observable/of';

import { take, filter, switchMap, tap, withLatestFrom, map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Hotel, SearchParams } from "../../models";
import { CustomerState } from "../../store/reducers";
import { SearchHotels } from "../../../core/store-entities/actions";
import { getAllHotels, getHotelsLoading, getTotalHotels } from "../../../core/store-entities/selectors";
import {
  getInfiniteStatus,
  getSearchParams,
  getInfinitePage
} from "../../store/selectors";
import * as fromRouter from "../../../core/store/actions/router.actions";
import { ChangeEvent } from 'angular2-virtual-scroll';

@Component({
  selector: "hot-hotels-list",
  templateUrl: "./hotels-list.component.html",
  styleUrls: ["./hotels-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelsListComponent implements OnInit, OnDestroy {
  hotels$: Observable<Hotel[]>;
  loading$: Observable<boolean>;
  searchParams$: Observable<SearchParams>;
  infiniteStatus$: Observable<boolean>;
  infinitePage$: Observable<number>;
  totalHotelsNumber$: Observable<number>;

  loadMore$: Subject<boolean>;
  loadSubscription: Subscription;
  params$: Observable<any>;

  constructor(private store: Store<CustomerState>) {
    this.hotels$ = store.select(getAllHotels);
    this.loading$ = store.select(getHotelsLoading);
    this.infiniteStatus$ = store.select(getInfiniteStatus);
    this.searchParams$ = store.select(getSearchParams);
    this.infinitePage$ = store.select(getInfinitePage);
    this.totalHotelsNumber$ = store.select(getTotalHotels);

    this.loadMore$ = new Subject();
    
    this.params$ = this.searchParams$.pipe(
      withLatestFrom(this.infinitePage$),
      take(1),
      map(([searchParams, infinitePage]) => {
        return { ...searchParams, page: infinitePage + 1 };
      })
    );

    this.loadSubscription = this.loadMore$.pipe(
      filter(load => load),
      switchMap(() => {
        return this.params$.pipe(
          switchMap(params => of(new SearchHotels(params)))
        );        
      }),
    ).subscribe(store);
  }

  ngOnInit() {

  }

  scrollEvent(event: ChangeEvent) {
    this.totalHotelsNumber$.pipe(
      withLatestFrom(this.infiniteStatus$),
      take(1),
      tap(([totalHotels, canLoad]) => {
        // Virtual scroll is ready to load more hotels 
        // if 'end' index in virtual scroll is equal to total number of loaded hotels
        // and scroll is not in busy state 
        const isReady = event.end === totalHotels && canLoad;
        this.loadMore$.next(isReady);
}      ),
    ).subscribe();
  }  




  // scrollEvent(event: ChangeEvent) {
  //   this.totalHotelsNumber$.pipe(
  //     withLatestFrom(this.infiniteStatus$),
  //     take(1),
  //     tap(([totalHotels, canLoad]) => {
  //       if(event.end === totalHotels && canLoad) {
  //         this.loadMore();
  //       }
  //     }),
  //   ).subscribe();
  // }  

  // loadMore() {
  //   this.searchParams$.pipe(
  //     withLatestFrom(this.infinitePage$),
  //     take(1),
  //     tap(([searchParams, infinitePage]) => {
  //       const params = { ...searchParams, page: infinitePage + 1 };
  //       this.store.dispatch(new SearchHotels(params));
  //     })
  //   ).subscribe();
  // }


  openHotelDetails(id) {
    // Preserving query params in order not to execute customerGuard
    this.store.dispatch(
      new fromRouter.Go({
        path: ["customer/hotels", id],
        extras: { queryParamsHandling: "preserve" }
      })
    );
  }

  trackById(index, item) {
    return item.id;
  }

ngOnDestroy() {
  this.loadSubscription.unsubscribe();
  this.loadMore$.unsubscribe();
}


}
