import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { take, tap, map, debounceTime } from "rxjs/operators";
import { CustomerState } from "../../store/reducers";
import { getMobileLayout } from "@app/core/store";
import {
  getSelectedHotel,
  getSelectedHotelReviews,
  getSelectedHotelId,
  getSelectedHotelLocation
} from "@app/core/store-entities/selectors";
import {
  LikeReview,
  FavoriteHotel,
  GeocodeSelectedLocation
} from "@app/core/store-entities/actions";
import * as fromRouter from "@app/core/store/actions/router.actions";
import { Hotel, Review } from "../../models";
import { User } from "@app/auth/models/user";


import {HotelLocationComponent} from '../../components/hotel-location/hotel-location.component';

@Component({
  selector: "hot-hotel-page",
  templateUrl: "./hotel-page.component.html",
  styleUrls: ["./hotel-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelPageComponent implements OnDestroy {

  @ViewChild(HotelLocationComponent) locationComponent: HotelLocationComponent;

  hotel$: Observable<Hotel>;
  reviews$: Observable<{ review: Review; user: User }[]>;
  isMobileLayout$: Observable<boolean>;
  onSelectedHotelChanged: Subscription;
  currentTabIndex: number;
  selectedHotelLocation$: Observable<{lat: number, lng: number}>;

  constructor(private store: Store<CustomerState>) {
    this.hotel$ = store.select(getSelectedHotel);
    this.reviews$ = store.select(getSelectedHotelReviews);
    this.isMobileLayout$ = store.select(getMobileLayout);
    this.selectedHotelLocation$ = store.select(getSelectedHotelLocation);

    this.onSelectedHotelChanged = this.hotel$.pipe(
      tap(() => this.currentTabIndex = 0),
      debounceTime(600),
      map(hotel => hotel.name),
      tap(address => this.store.dispatch(new GeocodeSelectedLocation(address)))
    ).subscribe();
  }

  bookHotel() {
    this.hotel$.pipe(
      take(1),
      map(hotel => hotel.id),
      tap(id => this.store.dispatch(
        new fromRouter.Go({
          path: ["customer/hotels/", id, "book"],
          extras: { queryParamsHandling: "preserve" }
        })
      ))
    ).subscribe();
  }

  favoriteHotel() {
    this.hotel$.pipe(
      take(1),
      tap(hotel => this.store.dispatch(new FavoriteHotel(hotel)))
    ).subscribe();
  }

  likeReview($event: Review) {
    this.store.dispatch(new LikeReview($event));
  }

  contactHotel() {}

  navigateBack() {
    this.store.dispatch(new fromRouter.Go({
      path: ['customer/hotels'],
      extras: { queryParamsHandling: 'preserve' }
    }));
  }

  onTabOpened() {
    if(this.currentTabIndex === 2) {
      this.locationComponent.map.triggerResize();
    }    
  }

  ngOnDestroy() {
    this.onSelectedHotelChanged.unsubscribe();
  }
}
